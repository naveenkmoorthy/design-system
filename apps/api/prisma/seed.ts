import "dotenv/config";
import { readFileSync } from "node:fs";
import path from "node:path";
import { prisma } from "../src/lib/prisma";

type ProductSeed = {
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  inStock: boolean;
};

const productsPath = path.join(__dirname, "..", "src", "data", "products.json");
const products = JSON.parse(readFileSync(productsPath, "utf-8")) as ProductSeed[];

async function main() {
  console.log("Seeding database...");

  await prisma.product.deleteMany();

  for (const product of products) {
    await prisma.product.create({ data: product });
  }

  console.log(`Seeded ${products.length} products from ${productsPath}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
