"use client";
import Link from "next/link";
import { Star, ArrowUpRight } from "lucide-react";

export interface ProductData {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number | null;
  image: string;
  category: string;
  rating: number;
  reviewCount: number;
  size: string;
  newArrival?: boolean;
  featured?: boolean;
}

export default function ProductCard({ product }: { product: ProductData }) {
  return (
    <Link href={`/product/${product.id}`} className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-ivory/60 shadow-sm shadow-ink/[0.03] hover:shadow-xl hover:shadow-ink/10 hover:-translate-y-1 transition-all duration-300">
      <div className="relative aspect-[4/5] overflow-hidden bg-cream">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        {product.newArrival && <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-gold text-white text-[10px] font-bold tracking-wider uppercase shadow-md">New</span>}
        {product.originalPrice && (
          <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-ink/80 text-parchment text-[10px] font-bold tracking-wider uppercase shadow-md">Sale</span>
        )}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-1.5 mb-2">
          <div className="flex items-center gap-0.5">
            <Star size={12} className="text-gold fill-gold" />
            <span className="text-xs font-semibold text-ink">{product.rating}</span>
          </div>
          <span className="text-xs text-stone">({product.reviewCount})</span>
        </div>
        <h3 className="font-[family-name:var(--font-cormorant)] text-xl font-medium text-ink leading-snug group-hover:text-gold-dark transition-colors">{product.name}</h3>
        <p className="text-xs text-stone uppercase tracking-widest mt-0.5">{product.brand} · {product.size}</p>
        <div className="mt-auto pt-4 flex items-end justify-between">
          <div>
            <span className="font-[family-name:var(--font-playfair)] text-xl text-ink">₹{product.price.toLocaleString("en-IN")}</span>
            {product.originalPrice && <span className="ml-2 text-sm text-stone line-through">₹{product.originalPrice.toLocaleString("en-IN")}</span>}
          </div>
          <span className="h-8 w-8 rounded-full bg-ink text-parchment flex items-center justify-center shadow-md group-hover:bg-gold transition-colors"><ArrowUpRight size={14} /></span>
        </div>
      </div>
    </Link>
  );
}
