"use client";

import { useCartStore } from "@/store/cart";
import { useState } from "react";
import CartDrawer from "./CartDrawer";

export default function CartButton() {
  const itemCount = useCartStore((s) => s.itemCount());
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="relative flex items-center gap-1.5 text-sm text-text-muted hover:text-text transition-colors"
        aria-label="Open cart"
      >
        <span>🛒</span>
        <span>Cart</span>
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-3 bg-primary-600 text-white text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none">
            {itemCount > 9 ? "9+" : itemCount}
          </span>
        )}
      </button>

      <CartDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}
