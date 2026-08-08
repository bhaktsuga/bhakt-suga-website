"use client";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const collections = [
  {
    title: "For Him",
    subtitle: "Bold, dark, unforgettable",
    href: "/shop?category=men",
    image: "/images/perfume-1.jpg",
    tag: "Men",
  },
  {
    title: "For Her",
    subtitle: "Luminous, warm, intimate",
    href: "/shop?category=women",
    image: "/images/perfume-2.jpg",
    tag: "Women",
  },
  {
    title: "For All",
    subtitle: "Clean, refined, universal",
    href: "/shop?category=unisex",
    image: "/images/perfume-3.jpg",
    tag: "Unisex",
  },
];

export default function FeaturedCollections() {
  return (
    <section id="collections" className="bg-parchment py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex items-end justify-between mb-12 lg:mb-16">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-stone mb-2">Curated</p>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl lg:text-5xl font-medium text-ink tracking-tight">Collections</h2>
          </div>
          <Link href="/shop" className="hidden sm:inline-flex items-center gap-1.5 text-sm text-stone hover:text-ink transition-colors underline underline-offset-4 decoration-gold/40">View all <ArrowUpRight size={16} strokeWidth={1.5} /></Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {collections.map((c) => (
            <Link key={c.href} href={c.href} className="group relative overflow-hidden rounded-3xl aspect-[4/5] shadow-lg shadow-ink/5">
              <img src={c.image} alt={c.title} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="inline-block px-3 py-1 rounded-full bg-parchment/90 text-ink text-[10px] font-semibold tracking-widest uppercase shadow-sm">{c.tag}</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-7 lg:p-8 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="font-[family-name:var(--font-playfair)] text-3xl lg:text-4xl text-parchment leading-none mb-2">{c.title}</h3>
                <p className="text-parchment/80 text-sm lg:text-base font-light">{c.subtitle}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
