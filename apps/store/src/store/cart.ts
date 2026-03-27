import { create } from "zustand";
import { getSessionId } from "@/lib/session";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  inStock: boolean;
}

export interface CartItem {
  id: string;
  cartId: string;
  productId: string;
  quantity: number;
  product: Product;
}

export interface Cart {
  id: string;
  sessionId: string;
  items: CartItem[];
  createdAt: string;
  updatedAt: string;
}

interface CartStore {
  cart: Cart | null;
  loading: boolean;
  error: string | null;

  fetchCart: () => Promise<void>;
  addItem: (productId: string, quantity?: number) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>;

  // Derived
  itemCount: () => number;
  total: () => number;
}

async function cartRequest(
  method: string,
  path: string,
  body?: object,
): Promise<Cart> {
  const res = await fetch(`${API_URL}/api/cart/${path}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) throw new Error(`Cart API error: ${res.status}`);
  return res.json();
}

export const useCartStore = create<CartStore>((set, get) => ({
  cart: null,
  loading: false,
  error: null,

  fetchCart: async () => {
    set({ loading: true, error: null });
    try {
      const sessionId = getSessionId();
      const cart = await cartRequest("GET", sessionId);
      set({ cart });
    } catch {
      set({ error: "Failed to load cart" });
    } finally {
      set({ loading: false });
    }
  },

  addItem: async (productId, quantity = 1) => {
    set({ error: null });
    try {
      const sessionId = getSessionId();
      const cart = await cartRequest("POST", `${sessionId}/items`, {
        productId,
        quantity,
      });
      set({ cart });
    } catch {
      set({ error: "Failed to add item" });
    }
  },

  updateQuantity: async (productId, quantity) => {
    set({ error: null });
    try {
      const sessionId = getSessionId();
      const cart = await cartRequest(
        "PATCH",
        `${sessionId}/items/${productId}`,
        { quantity },
      );
      set({ cart });
    } catch {
      set({ error: "Failed to update quantity" });
    }
  },

  removeItem: async (productId) => {
    set({ error: null });
    try {
      const sessionId = getSessionId();
      const cart = await cartRequest(
        "DELETE",
        `${sessionId}/items/${productId}`,
      );
      set({ cart });
    } catch {
      set({ error: "Failed to remove item" });
    }
  },

  clearCart: async () => {
    set({ error: null });
    try {
      const sessionId = getSessionId();
      const cart = await cartRequest("DELETE", sessionId);
      set({ cart });
    } catch {
      set({ error: "Failed to clear cart" });
    }
  },

  itemCount: () => {
    return get().cart?.items.reduce((sum, i) => sum + i.quantity, 0) ?? 0;
  },

  total: () => {
    return (
      get().cart?.items.reduce(
        (sum, i) => sum + i.product.price * i.quantity,
        0,
      ) ?? 0
    );
  },
}));
