import Container from "@/components/Container";
import { getProduct, getProducts } from "@/lib/api";
import { Button } from "@repo/ui";
import Image from "next/image";
import Link from "next/link";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ id: p.id }));
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = await getProduct(id);

  return (
    <main>
      <Container className="py-12">
        <Link
          href="/"
          className="text-sm text-neutral-500 hover:text-neutral-900 mb-8 inline-block"
        >
          ← Back to products
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-neutral-50">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-xs text-neutral-400 uppercase tracking-wide mb-2">
              {product.category}
            </p>
            <h1 className="text-2xl font-bold text-neutral-900">
              {product.name}
            </h1>
            <p className="mt-4 text-neutral-500 leading-relaxed">
              {product.description}
            </p>
            <p className="mt-6 text-3xl font-bold text-neutral-900">
              ${product.price.toFixed(2)}
            </p>

            <div className="mt-8">
              {product.inStock ? (
                <Button size="lg" variant="primary" className="w-full">
                  Add to cart
                </Button>
              ) : (
                <Button
                  size="lg"
                  variant="secondary"
                  disabled
                  className="w-full"
                >
                  Out of stock
                </Button>
              )}
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
