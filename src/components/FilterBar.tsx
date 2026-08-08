"use client";
import { SlidersHorizontal, ArrowUpDown, X } from "lucide-react";

export interface FilterOptions {
  category: string;
  sort: "featured" | "newest" | "price-low" | "price-high" | "rating";
  search: string;
}

export default function FilterBar({ filters, setFilters, counts }: { filters: FilterOptions; setFilters: (f: FilterOptions) => void; counts: { premium: number; men: number; women: number; unisex: number; all: number } }) {
  const categories = [
    { key: "all", label: "All Fragrances", count: counts.all },
    { key: "premium", label: "Premium Indian", count: counts.premium },
    { key: "men", label: "For Him", count: counts.men },
    { key: "women", label: "For Her", count: counts.women },
    { key: "unisex", label: "Unisex / Devotional", count: counts.unisex },
  ];

  const sorts = [
    { key: "featured", label: "Featured" },
    { key: "newest", label: "Newest" },
    { key: "price-low", label: "Price: Low to High" },
    { key: "price-high", label: "Price: High to Low" },
    { key: "rating", label: "Top Rated" },
  ];

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-ivory/60 p-6 shadow-xl shadow-ink/[0.02] mb-10">
      <div className="flex flex-col lg:flex-row lg:items-center gap-6 justify-between">
        
        <div>
          <h3 className="text-[10px] uppercase tracking-[0.25em] text-gold-dark font-bold mb-3">Filter by Collection</h3>
          <div className="flex flex-wrap gap-2.5">
            {categories.map((c) => (
              <button
                key={c.key}
                type="button"
                onClick={() => setFilters({ ...filters, category: c.key })}
                className={`px-4.5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all border ${filters.category === c.key ? "bg-ink text-parchment border-ink shadow-md" : "bg-cream/40 text-ink border-ivory hover:border-gold/60 hover:bg-cream"}`}
              >
                {c.label} <span className={`text-[10px] ml-1 px-1.5 py-0.5 rounded-full ${filters.category === c.key ? "bg-gold-dark text-white" : "bg-cream text-stone"}`}>{c.count}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 lg:border-l lg:border-ivory/60 lg:pl-8">
          <div>
            <h3 className="text-[10px] uppercase tracking-[0.25em] text-gold-dark font-bold mb-3">Sort By</h3>
            <select
              value={filters.sort}
              onChange={(e) => setFilters({ ...filters, sort: e.target.value as FilterOptions["sort"] })}
              className="bg-cream/40 border border-ivory rounded-xl px-3.5 py-2.5 text-xs font-bold uppercase tracking-wider text-ink focus:outline-none focus:ring-2 focus:ring-gold/30 cursor-pointer"
            >
              {sorts.map((s) => <option key={s.key} value={s.key}>{s.label}</option>)}
            </select>
          </div>
          
          <div className="min-w-[220px]">
            <h3 className="text-[10px] uppercase tracking-[0.25em] text-gold-dark font-bold mb-3">Search Scent</h3>
            <div className="relative">
              <input
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                placeholder="Search notes, ingredients..."
                className="w-full bg-cream/40 border border-ivory rounded-xl px-4 py-2.5 text-xs text-ink font-medium focus:outline-none focus:ring-2 focus:ring-gold/30 placeholder:text-stone-light"
              />
              {filters.search && (
                <button type="button" onClick={() => setFilters({ ...filters, search: "" })} aria-label="Clear search" className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-ivory transition-colors text-stone"><X size={12} /></button>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
