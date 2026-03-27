import { Router, Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { stripe } from "../lib/stripe";

const router = Router();

// POST /api/checkout/create-payment-intent
router.post("/create-payment-intent", async (req: Request, res: Response) => {
  const { userId, sessionId } = req.body;

  if (!userId || !sessionId) {
    res.status(400).json({ error: "userId and sessionId are required" });
    return;
  }

  try {
    // Fetch the cart with product details
    const cart = await prisma.cart.findUnique({
      where: { sessionId },
      include: {
        items: {
          include: { product: true },
        },
      },
    });

    if (!cart || cart.items.length === 0) {
      res.status(400).json({ error: "Cart is empty" });
      return;
    }

    // Calculate total in cents for Stripe
    const total = cart.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    );
    const totalCents = Math.round(total * 100);

    // Create Stripe PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalCents,
      currency: "usd",
      metadata: { userId, sessionId },
    });

    // Create a PENDING order in the DB
    const order = await prisma.order.create({
      data: {
        userId,
        stripePaymentId: paymentIntent.id,
        status: "PENDING",
        total,
        items: {
          create: cart.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price,
          })),
        },
      },
    });

    res.json({ clientSecret: paymentIntent.client_secret, orderId: order.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create payment intent" });
  }
});

// POST /api/checkout/confirm
router.post("/confirm", async (req: Request, res: Response) => {
  const { paymentIntentId, sessionId } = req.body;

  if (!paymentIntentId || !sessionId) {
    res
      .status(400)
      .json({ error: "paymentIntentId and sessionId are required" });
    return;
  }

  try {
    // Verify payment status with Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status !== "succeeded") {
      res.status(400).json({ error: "Payment has not succeeded" });
      return;
    }

    // Find the pending order
    const order = await prisma.order.findUnique({
      where: { stripePaymentId: paymentIntentId },
      include: { items: true },
    });

    if (!order) {
      res.status(404).json({ error: "Order not found" });
      return;
    }

    if (order.status === "PAID") {
      // Idempotency — already confirmed, just return the order
      res.json({ orderId: order.id });
      return;
    }

    // Update order status, decrement stock, clear cart in a transaction
    await prisma.$transaction([
      // Mark order as PAID
      prisma.order.update({
        where: { id: order.id },
        data: { status: "PAID" },
      }),
      // Decrement stock for each item
      ...order.items.map((item) =>
        prisma.product.update({
          where: { id: item.productId },
          data: { inStock: true }, // you can add a `stock Int` field later for real decrement
        }),
      ),
      // Clear the cart
      prisma.cartItem.deleteMany({
        where: { cart: { sessionId } },
      }),
    ]);

    res.json({ orderId: order.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to confirm order" });
  }
});

export default router;
