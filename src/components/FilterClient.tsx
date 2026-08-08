"use client";
import { useState, useMemo } from "react";
import ProductCard from "./ProductCard";
import FilterBar, { FilterOptions } from "./FilterBar";
import { ArrowUp } from "lucide-react";

export interface ProductRow {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice: number | null;
  image: string;
  category: string;
  scentFamily: string | null;
  rating: number;
  reviewCount: number;
  size: string;
  newArrival: boolean | null;
  featured: boolean | null;
  description: string;
  notes?: any;
  images?: string[];
}

export default function FilterClient({ initialCategory, initialSearch, initialFeatured, counts, products }: { initialCategory: string; initialSearch: string; initialFeatured: boolean; counts: { premium: number; men: number; women: number; unisex: number; all: number }; products: ProductRow[] }) {
  const [filters, setFilters] = useState<FilterOptions>({
    category: initialCategory,
    sort: "featured",
    search: initialSearch,
  });

  const display = useMemo(() => {
    let list = [...products];
    if (filters.category !== "all") list = list.filter((p) => p.category === filters.category);
    if (filters.category === "featured") list = list.filter((p) => p.featured);
    if (filters.search.trim()) {
      const q = filters.search.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || (p.scentFamily || "").toLowerCase().includes(q));
    }
    if (filters.sort === "price-low") list.sort((a, b) => a.price - b.price);
    if (filters.sort === "price-high") list.sort((a, b) => b.price - a.price);
    if (filters.sort === "rating") list.sort((a, b) => b.rating - a.rating);
    if (filters.sort === "newest") list.sort((a, b) => (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0));
    return list;
  }, [products, filters]);

  return (
    <div>
      <FilterBar filters={filters} setFilters={setFilters} counts={counts} />
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-stone"><span className="font-medium text-ink">{display.length}</span> fragrance{display.length !== 1 ? "s" : ""}</p>
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="p-2 rounded-full bg-white border border-ivory shadow-sm hover:shadow transition text-stone hover:text-ink" aria-label="Scroll to top"><ArrowUp size={16} strokeWidth={1.5} /></button>
      </div>
      {display.length === 0 ? (
        <div className="text-center py-24 bg-white/50 rounded-3xl border border-ivory/50">
          <p className="font-[family-name:var(--font-cormorant)] text-3xl text-ink mb-2">No fragrances found</p>
          <p className="text-stone">Try adjusting your filters or search terms.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-7 mb-24">
          {display.map((p) => (
            <ProductCard key={p.id} product={{ id: p.id, name: p.name, brand: p.brand, price: p.price, originalPrice: p.originalPrice, image: p.image, category: p.category, rating: p.rating, reviewCount: p.reviewCount, size: p.size, newArrival: !!p.newArrival, featured: !!p.featured }} />
          ))}
        </div>
      )}
    </div>
  );
}
