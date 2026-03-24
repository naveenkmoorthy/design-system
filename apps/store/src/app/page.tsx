import { getProducts, getCategories } from "@/lib/api";
import ProductGrid from "@/components/ProductGrid";
import CategoryFilter from "@/components/CategoryFilter";
import { Suspense } from "react";
import Container from "@/components/Container";

interface HomeProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const { category } = await searchParams;
  const [products, categories] = await Promise.all([
    getProducts(category),
    getCategories(),
  ]);

  return (
    <main>
      <Container className="py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text">Products</h1>
          <p className="mt-1 text-text-muted">
            {products.length} {products.length === 1 ? "item" : "items"}{" "}
            {category ? `in ${category}` : "available"}
          </p>
        </div>

        <div className="mb-8">
          <Suspense>
            <CategoryFilter categories={categories} selected={category} />
          </Suspense>
        </div>

        <ProductGrid products={products} />
      </Container>
    </main>
  );
}
