import type { Metadata } from "next";
import Link from "next/link";
import { Providers } from "@/components/providers";
import "./globals.css";

export const metadata: Metadata = { title: "Pokédex" };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-gray-50 text-gray-900">
        <Providers>
          <header className="p-4 bg-red-600 text-white font-bold text-xl">
            <Link href="/">Pokédex</Link>
          </header>
          <main className="max-w-6xl mx-auto p-4">{children}</main>
        </Providers>
      </body>
    </html>
  );
}