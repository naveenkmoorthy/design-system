"use client";

import { useEffect } from "react";
import { useCartStore } from "@/store/cart";

export function CartInitializer() {
  const fetchCart = useCartStore((s) => s.fetchCart);
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);
  return null;
}
