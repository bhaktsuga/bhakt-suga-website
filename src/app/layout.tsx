import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Playfair_Display, Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import CartSlide from "@/components/CartSlide";
import { CartProvider } from "@/components/CartProvider";
import Footer from "@/components/Footer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bhakt Suga — Artisanal Fragrances",
  description: "Luxury perfumes for men, women, and every fragrance lover. Crafted with rare ingredients and timeless design.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${cormorant.variable} ${inter.variable}`}>
      <body className="font-[family-name:var(--font-inter)] bg-parchment text-ink antialiased selection:bg-amber-200/60 selection:text-amber-950">
        <CartProvider>
          <Header />
          {children}
          <CartSlide />
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
