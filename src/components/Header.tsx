"use client";
import Link from "next/link";
import { useCart } from "./CartProvider";
import { Menu, X, ShoppingBag } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const { count, setOpen } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "About", href: "/#about" },
    { label: "Reviews", href: "/#reviews" },
    { label: "Contact", href: "/#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-parchment/90 backdrop-blur-xl border-b border-ivory/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-3.5 group">
            <div className="relative h-12 w-12 rounded-full overflow-hidden border border-gold/40 shadow-inner bg-black">
              <img src="/images/logo.png" alt="Bhakt Suga Logo" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="leading-none">
              <span className="block font-[family-name:var(--font-playfair)] text-xl font-bold tracking-wider text-ink uppercase">BHAKT SUGA</span>
              <span className="block text-[9px] uppercase tracking-[0.25em] text-gold-dark font-semibold mt-1">Divine Fragrance</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <Link key={l.label} href={l.href} className="text-sm font-medium uppercase tracking-widest text-ink/80 hover:text-gold-dark transition-colors relative after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-gold-dark after:transition-all after:duration-300">
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button onClick={() => setOpen(true)} aria-label="Open cart" className="relative rounded-full p-2.5 hover:bg-cream transition-colors text-ink border border-ivory/50">
              <ShoppingBag strokeWidth={1.5} size={20} />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-gold-dark text-white text-[10px] font-bold flex items-center justify-center shadow-md animate-pulse">
                  {count}
                </span>
              )}
            </button>
            <button onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu" className="md:hidden rounded-full p-2 hover:bg-cream transition-colors text-ink border border-ivory/50">
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <nav className="md:hidden bg-parchment/95 backdrop-blur-xl border-t border-ivory/50 px-6 py-6 space-y-4 shadow-2xl animate-fade-up">
          {navLinks.map((l) => (
            <Link key={l.label} href={l.href} onClick={() => setMobileOpen(false)} className="block text-sm font-semibold uppercase tracking-widest text-ink/90 hover:text-gold-dark transition-colors py-1">
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
