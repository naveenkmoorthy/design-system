import { Router, Request, Response } from "express";
import { prisma } from "../lib/prisma";

const router = Router();

router.get("/meta/categories", async (req: Request, res: Response) => {
  const categories = await prisma.product.findMany({
    select: { category: true },
    distinct: ["category"],
    orderBy: { category: "asc" },
  });

  res.json(categories.map((c) => c.category));
});

router.get("/", async (req: Request, res: Response) => {
  const { category } = req.query;

  const products = await prisma.product.findMany({
    where: category
      ? { category: { equals: category as string, mode: "insensitive" } }
      : undefined,
    orderBy: { createdAt: "asc" },
  });

  res.json(products);
});

router.get("/:id", async (req: Request, res: Response) => {
  const rawId = req.params.id;
  const id = Array.isArray(rawId) ? rawId[0] : rawId;
  if (!id) {
    res.status(400).json({ message: "Missing product id" });
    return;
  }

  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    res.status(404).json({ message: "Product not found" });
    return;
  }

  res.json(product);
});

export default router;