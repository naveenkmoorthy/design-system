import Link from "next/link";
import CartButton from "./CartButton";

export default function Header() {
  return (
    <header className="border-b border-border bg-bg sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-lg font-bold text-text tracking-tight">
          Basis <span className="text-primary-600">Store</span>
        </Link>

        <nav className="flex items-center gap-6 text-sm text-text-muted">
          <Link href="/" className="hover:text-text transition-colors">
            Products
          </Link>
          <CartButton />
        </nav>
      </div>
    </header>
  );
}
