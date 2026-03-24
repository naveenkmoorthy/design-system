import Container from "@/components/Container";

function SkeletonCard() {
  return (
    <div className="rounded-xl border border-border overflow-hidden animate-pulse">
      <div className="aspect-square bg-bg-subtle" />
      <div className="p-4 space-y-2">
        <div className="h-3 w-16 bg-bg-subtle rounded" />
        <div className="h-4 w-3/4 bg-bg-subtle rounded" />
        <div className="h-5 w-1/3 bg-bg-subtle rounded mt-3" />
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    <main>
      <Container className="py-12">
        <div className="mb-8">
          <div className="h-8 w-32 bg-bg-subtle rounded animate-pulse" />
          <div className="h-4 w-24 bg-bg-subtle rounded animate-pulse mt-2" />
        </div>
        <div className="flex gap-2 mb-8">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-8 w-20 bg-bg-subtle rounded-md animate-pulse"
            />
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </Container>
    </main>
  );
}
