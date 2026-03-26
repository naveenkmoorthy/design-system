"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@basis/ui";

interface CategoryFilterProps {
  categories: string[];
  selected?: string;
}

export default function CategoryFilter({
  categories,
  selected,
}: CategoryFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleSelect(category: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (category === selected) {
      params.delete("category");
    } else {
      params.set("category", category);
    }

    router.push(`/?${params.toString()}`);
  }

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => (
        <Button
          key={cat}
          variant={selected === cat ? "primary" : "secondary"}
          size="sm"
          onClick={() => handleSelect(cat)}
        >
          {cat}
        </Button>
      ))}
    </div>
  );
}