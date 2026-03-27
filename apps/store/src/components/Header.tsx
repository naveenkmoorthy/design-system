"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession } from "next-auth/react";
import CartButton from "./CartButton";
import UserMenu from "./UserMenu";
import SignInModal from "./SignInModal";

export default function Header() {
  const { data: session } = useSession();
  const [showSignIn, setShowSignIn] = useState(false);

  return (
    <>
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
            {session?.user ? (
              <UserMenu />
            ) : (
              <button
                onClick={() => setShowSignIn(true)}
                className="hover:text-text transition-colors"
              >
                Sign in
              </button>
            )}
          </nav>
        </div>
      </header>

      {showSignIn && <SignInModal onClose={() => setShowSignIn(false)} />}
    </>
  );
}
