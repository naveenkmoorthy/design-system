import { Router, Request, Response } from "express";
import { prisma } from "../lib/prisma";

const router = Router();

const cartWithProducts = {
  items: { include: { product: true } },
} as const;

// POST /api/cart/merge
// body: { sessionId: string, userId: string }
router.post("/merge", async (req: Request, res: Response) => {
  const { sessionId, userId } = req.body;

  if (!sessionId || !userId) {
    return res.status(400).json({ error: "sessionId and userId are required" });
  }

  const [guestCart, userCart] = await Promise.all([
    prisma.cart.findUnique({ where: { sessionId }, include: { items: true } }),
    prisma.cart.findUnique({ where: { userId } }),
  ]);

  if (!guestCart || guestCart.items.length === 0) {
    if (userCart) {
      const cart = await prisma.cart.findUnique({
        where: { id: userCart.id },
        include: cartWithProducts,
      });
      return res.json(cart);
    }
    const cart = await prisma.cart.create({
      data: { sessionId: `user-${userId}`, userId },
      include: cartWithProducts,
    });
    return res.json(cart);
  }

  const mergedCart = await prisma.$transaction(async (tx) => {
    const targetCart =
      userCart ??
      (await tx.cart.create({
        data: { sessionId: `user-${userId}`, userId },
      }));

    for (const guestItem of guestCart.items) {
      await tx.cartItem.upsert({
        where: {
          cartId_productId: {
            cartId: targetCart.id,
            productId: guestItem.productId,
          },
        },
        create: {
          cartId: targetCart.id,
          productId: guestItem.productId,
          quantity: guestItem.quantity,
        },
        update: {
          quantity: { increment: guestItem.quantity },
        },
      });
    }

    await tx.cart.delete({ where: { id: guestCart.id } });

    return tx.cart.findUnique({
      where: { id: targetCart.id },
      include: cartWithProducts,
    });
  });

  return res.json(mergedCart);
});

export default router;
