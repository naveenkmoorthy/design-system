import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "@basis/ui/styles";
import "./globals.css";
import Header from "@/components/Header";
import { CartInitializer } from "./cartInitializer";
import { SessionProvider } from "next-auth/react";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Basis Store",
  description: "A product listing app built with Basis design system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geist.className} bg-bg text-text`}>
        <SessionProvider>
          <Header />
          <CartInitializer />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
