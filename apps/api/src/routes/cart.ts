import { Router, Request, Response } from "express";
import { prisma } from "../lib/prisma";
// req.params values are typed as string | string[] — narrow to string
function param(val: string | string[]): string {
  return Array.isArray(val) ? val[0] : val;
}

const router = Router();

// Shared cart include — always return items with product details
const cartInclude = {
  items: {
    include: { product: true },
    orderBy: { createdAt: "asc" as const },
  },
};

// Helper — get or create cart by sessionId
async function getOrCreateCart(sessionId: string) {
  return prisma.cart.upsert({
    where: { sessionId },
    create: { sessionId },
    update: {},
    include: cartInclude,
  });
}

// GET /api/cart/:sessionId
router.get("/:sessionId", async (req: Request, res: Response) => {
  try {
    const cart = await getOrCreateCart(param(req.params.sessionId));
    res.json(cart);
  } catch {
    res.status(500).json({ error: "Failed to fetch cart" });
  }
});

// POST /api/cart/:sessionId/items  — body: { productId, quantity? }
router.post("/:sessionId/items", async (req: Request, res: Response) => {
  const { productId, quantity = 1 } = req.body;

  if (!productId) {
    res.status(400).json({ error: "productId is required" });
    return;
  }

  try {
    const cart = await getOrCreateCart(param(req.params.sessionId));

    await prisma.cartItem.upsert({
      where: { cartId_productId: { cartId: cart.id, productId } },
      create: { cartId: cart.id, productId, quantity },
      update: { quantity: { increment: quantity } },
    });

    const updated = await prisma.cart.findUnique({
      where: { id: cart.id },
      include: cartInclude,
    });

    res.json(updated);
  } catch {
    res.status(500).json({ error: "Failed to add item" });
  }
});

// PATCH /api/cart/:sessionId/items/:productId  — body: { quantity }
router.patch(
  "/:sessionId/items/:productId",
  async (req: Request, res: Response) => {
    const { quantity } = req.body;

    if (typeof quantity !== "number" || quantity < 1) {
      res.status(400).json({ error: "quantity must be a number >= 1" });
      return;
    }

    try {
      const cart = await prisma.cart.findUnique({
        where: { sessionId: param(req.params.sessionId) },
      });

      if (!cart) {
        res.status(404).json({ error: "Cart not found" });
        return;
      }

      await prisma.cartItem.update({
        where: {
          cartId_productId: {
            cartId: cart.id,
            productId: param(req.params.productId),
          },
        },
        data: { quantity },
      });

      const updated = await prisma.cart.findUnique({
        where: { id: cart.id },
        include: cartInclude,
      });

      res.json(updated);
    } catch {
      res.status(500).json({ error: "Failed to update item" });
    }
  },
);

// DELETE /api/cart/:sessionId/items/:productId
router.delete(
  "/:sessionId/items/:productId",
  async (req: Request, res: Response) => {
    try {
      const cart = await prisma.cart.findUnique({
        where: { sessionId: param(req.params.sessionId) },
      });

      if (!cart) {
        res.status(404).json({ error: "Cart not found" });
        return;
      }

      await prisma.cartItem.delete({
        where: {
          cartId_productId: {
            cartId: cart.id,
            productId: param(req.params.productId),
          },
        },
      });

      const updated = await prisma.cart.findUnique({
        where: { id: cart.id },
        include: cartInclude,
      });

      res.json(updated);
    } catch {
      res.status(500).json({ error: "Failed to remove item" });
    }
  },
);

// DELETE /api/cart/:sessionId  — clear all items
router.delete("/:sessionId", async (req: Request, res: Response) => {
  try {
    const cart = await prisma.cart.findUnique({
      where: { sessionId: param(req.params.sessionId) },
    });

    if (!cart) {
      res.status(404).json({ error: "Cart not found" });
      return;
    }

    await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });

    const updated = await prisma.cart.findUnique({
      where: { id: cart.id },
      include: cartInclude,
    });

    res.json(updated);
  } catch {
    res.status(500).json({ error: "Failed to clear cart" });
  }
});

export default router;
