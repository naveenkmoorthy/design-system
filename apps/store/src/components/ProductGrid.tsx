"use client";

import { useRouter } from "next/navigation";
import { Button } from "@repo/ui";
import ProductCard from "./ProductCard";
import { Product } from "@/types/product";

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  const router = useRouter();

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-4xl mb-4">🔍</p>
        <h2 className="text-lg font-semibold text-text">No products found</h2>
        <p className="text-text-muted mt-1 mb-6">
          Try selecting a different category
        </p>
        <Button variant="secondary" size="sm" onClick={() => router.push("/")}>
          Clear filter
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}