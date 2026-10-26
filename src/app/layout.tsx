import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Regula Sancti Benedicti · The Rule of St. Benedict · 聖本篤會規",
  description: "The Rule of St. Benedict in Latin, English and Chinese.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <Link href="/" className="brand">
            Regula Sancti Benedicti
          </Link>
        </header>
        <main>{children}</main>
        <footer className="site-footer">
          <p>Regula Sancti Benedicti · The Rule of St. Benedict · 聖本篤會規</p>
        </footer>
      </body>
    </html>
  );
}
