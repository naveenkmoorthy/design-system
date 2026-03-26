import { Product } from "@/types/product";
import { Card } from "@basis/ui";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`}>
      <Card variant="outlined" padding="none" className="group hover:shadow-lg transition-shadow duration-200 overflow-hidden">
        <div className="relative aspect-square bg-neutral-50">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
          {!product.inStock && (
            <span className="absolute top-3 left-3 bg-neutral-800 text-white text-xs px-2 py-1 rounded-full">
              Out of stock
            </span>
          )}
        </div>

        <Card.Header className="px-4 pt-4 mb-0">
          <p className="text-xs text-text-muted uppercase tracking-wide">
            {product.category}
          </p>
          <h2 className="text-sm font-medium text-text group-hover:text-primary-600 transition-colors">
            {product.name}
          </h2>
        </Card.Header>

        <Card.Footer className="px-4 pb-4 border-none mt-1 pt-0">
          <span className="text-base font-semibold text-text">
            ${product.price.toFixed(2)}
          </span>
        </Card.Footer>
      </Card>
    </Link>
  );
}