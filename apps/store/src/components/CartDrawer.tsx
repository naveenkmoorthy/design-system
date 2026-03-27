"use client";

import { useCartStore } from "@/store/cart";
import { Button } from "@basis/ui";
import Image from "next/image";
import { useEffect, useRef } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: Props) {
  const { cart, loading, updateQuantity, removeItem, clearCart } =
    useCartStore();
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const items = cart?.items ?? [];
  const total = useCartStore((s) => s.total());
  const isEmpty = items.length === 0;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-neutral-900">
            Cart
            {items.length > 0 && (
              <span className="ml-2 text-sm font-normal text-neutral-400">
                ({items.length} {items.length === 1 ? "item" : "items"})
              </span>
            )}
          </h2>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-700 transition-colors p-1"
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
          {loading && items.length === 0 && (
            <p className="text-sm text-neutral-400 text-center mt-12">
              Loading...
            </p>
          )}

          {!loading && isEmpty && (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <p className="text-4xl mb-3">🛒</p>
              <p className="text-neutral-500 font-medium">Your cart is empty</p>
              <p className="text-sm text-neutral-400 mt-1">
                Add some products to get started
              </p>
            </div>
          )}

          {items.map((item) => (
            <div key={item.id} className="flex gap-4">
              {/* Image */}
              <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-neutral-50 shrink-0">
                <Image
                  src={item.product.image}
                  alt={item.product.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-neutral-900 truncate">
                  {item.product.name}
                </p>
                <p className="text-xs text-neutral-400 mt-0.5">
                  ${item.product.price.toFixed(2)} each
                </p>

                {/* Quantity controls */}
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() =>
                      item.quantity === 1
                        ? removeItem(item.productId)
                        : updateQuantity(item.productId, item.quantity - 1)
                    }
                    className="w-7 h-7 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-600 hover:bg-neutral-50 transition-colors text-sm"
                  >
                    -
                  </button>
                  <span className="text-sm font-medium w-4 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      updateQuantity(item.productId, item.quantity + 1)
                    }
                    className="w-7 h-7 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-600 hover:bg-neutral-50 transition-colors text-sm"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Line total + remove */}
              <div className="flex flex-col items-end justify-between shrink-0">
                <p className="text-sm font-semibold text-neutral-900">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => removeItem(item.productId)}
                  className="text-xs text-neutral-400 hover:text-red-500 transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        {!isEmpty && (
          <div className="border-t px-6 py-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-500">Subtotal</span>
              <span className="text-lg font-bold text-neutral-900">
                ${total.toFixed(2)}
              </span>
            </div>
            <Button variant="primary" size="lg" className="w-full">
              Checkout
            </Button>
            <button
              onClick={clearCart}
              className="w-full text-xs text-neutral-400 hover:text-red-500 transition-colors"
            >
              Clear cart
            </button>
          </div>
        )}
      </div>
    </>
  );
}
