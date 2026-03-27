"use client";

import { Button } from "@basis/ui";
import { useCartStore } from "@/store/cart";
import { useState } from "react";

interface Props {
  productId: string;
  inStock: boolean;
}

export default function AddToCartButton({ productId, inStock }: Props) {
  const addItem = useCartStore((s) => s.addItem);
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  async function handleClick() {
    if (!inStock || adding) return;
    setAdding(true);
    await addItem(productId);
    setAdding(false);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  if (!inStock) {
    return (
      <Button size="lg" variant="secondary" disabled>
        Out of stock
      </Button>
    );
  }

  return (
    <Button size="lg" variant="primary" onClick={handleClick} disabled={adding}>
      {adding ? "Adding..." : added ? "Added ✓" : "Add to cart"}
    </Button>
  );
}
