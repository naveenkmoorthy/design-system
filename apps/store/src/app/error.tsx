"use client";

import { Button } from "@repo/ui";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center max-w-md mx-auto">
      <p className="text-4xl mb-4">⚠️</p>
      <h2 className="text-lg font-semibold text-text">Something went wrong</h2>
      <p className="text-text-muted mt-1 mb-6 text-sm">
        {error.message || "Could not load products. Is the API running?"}
      </p>
      <Button variant="primary" size="sm" onClick={reset}>
        Try again
      </Button>
    </div>
  );
}