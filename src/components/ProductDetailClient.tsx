"use client";
import { useState } from "react";
import { useCart } from "./CartProvider";
import { Star, Check, ShoppingBag, ChevronLeft, ChevronRight, ShieldCheck, Heart, Sparkles, AlertTriangle } from "lucide-react";
import Link from "next/link";

interface ReviewRow {
  id: number;
  name: string;
  rating: number;
  title: string;
  body: string;
  verified: boolean | null;
  date: Date | null;
}

export default function ProductDetailClient({ product, reviews, isEmbed = false }: { product: any; reviews: ReviewRow[]; isEmbed?: boolean }) {
  const { add, setOpen } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const images = product.images && Array.isArray(product.images) && product.images.length ? product.images : [product.image];

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) {
      add({
        id: product.id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        image: product.image,
        size: product.size || "20 ML",
      });
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    add({
      id: product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      image: product.image,
      size: product.size || "20 ML",
    });
    setOpen(true);
  };

  const avgRating = reviews.length ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : product.rating || 4.9;

  const contentMarkup = (
    <div className="flex flex-col">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[10px] uppercase tracking-[0.25em] text-gold-dark font-bold">{product.brand}</span>
        <span className="text-stone">·</span>
        <span className="text-[10px] uppercase tracking-[0.25em] text-stone font-semibold">Premium Indian Perfume</span>
      </div>
      
      <h1 className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl font-black text-ink leading-tight mb-2">
        {product.name}
      </h1>
      
      <p className="font-[family-name:var(--font-cormorant)] text-xl text-gold-dark italic font-medium mb-4">
        “The Fragrance of Devotion”
      </p>

      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={14} className={i < Math.round(avgRating) ? "text-gold fill-gold" : "text-stone-light"} />
          ))}
        </div>
        <span className="text-sm font-bold text-ink">{avgRating.toFixed(1)}</span>
        <span className="text-xs text-stone-light">({product.reviewCount ?? reviews.length} verified buyer ratings)</span>
      </div>

      <div className="flex items-baseline gap-3 mb-6 bg-cream/30 p-4 rounded-2xl border border-ivory/50 w-fit">
        <span className="block text-[10px] uppercase tracking-widest text-stone font-bold mr-2">Special Price:</span>
        <span className="font-[family-name:var(--font-playfair)] text-3xl font-black text-ink">₹{product.price.toLocaleString("en-IN")}</span>
        {product.originalPrice && (
          <span className="text-base text-stone-light line-through font-mono">₹{product.originalPrice.toLocaleString("en-IN")}</span>
        )}
        <span className="text-xs text-gold-dark font-bold ml-2">(Save 33%)</span>
      </div>

      <p className="text-ink/80 text-sm sm:text-base leading-relaxed mb-6 font-light">
        {product.description}
      </p>

      {/* Highlights - Sourced from user request & poster */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-3 bg-parchment/60 rounded-xl border border-ivory/50">
          <span className="block text-[10px] uppercase tracking-wider text-stone font-bold">Volume</span>
          <span className="block text-sm font-bold text-ink font-mono mt-0.5">{product.size || "20 ML"}</span>
        </div>
        <div className="p-3 bg-parchment/60 rounded-xl border border-ivory/50">
          <span className="block text-[10px] uppercase tracking-wider text-stone font-bold">Purity</span>
          <span className="block text-sm font-bold text-emerald-600 mt-0.5">100% Alcohol-Free</span>
        </div>
        <div className="p-3 bg-parchment/60 rounded-xl border border-ivory/50">
          <span className="block text-[10px] uppercase tracking-wider text-stone font-bold">Longevity</span>
          <span className="block text-sm font-bold text-ink mt-0.5">Over 24 Hours Active</span>
        </div>
        <div className="p-3 bg-parchment/60 rounded-xl border border-ivory/50">
          <span className="block text-[10px] uppercase tracking-wider text-stone font-bold">Origin</span>
          <span className="block text-sm font-bold text-ink mt-0.5">Devotional India</span>
        </div>
      </div>

      {product.notes && (
        <div className="bg-cream/40 rounded-2xl p-5 mb-6 border border-ivory/80 shadow-inner">
          <h3 className="font-[family-name:var(--font-playfair)] text-xs uppercase tracking-widest text-ink font-bold mb-3 flex items-center gap-1.5"><Sparkles size={14} className="text-gold" /> Fragrance Notes (सुगंध पिरामिड)</h3>
          <div className="grid sm:grid-cols-3 gap-4 text-xs">
            <div>
              <h4 className="text-[10px] uppercase tracking-widest text-gold-dark font-bold mb-1">Top Notes (चंदन, केसर)</h4>
              <div className="flex flex-wrap gap-1">
                {product.notes.top?.map((n: string) => <span key={n} className="px-2 py-0.5 rounded-full bg-white text-[10px] font-medium text-ink shadow-sm border border-ivory/50">{n}</span>)}
              </div>
            </div>
            <div>
              <h4 className="text-[10px] uppercase tracking-widest text-gold-dark font-bold mb-1">Heart Notes (कमल, गुलाब)</h4>
              <div className="flex flex-wrap gap-1">
                {product.notes.middle?.map((n: string) => <span key={n} className="px-2 py-0.5 rounded-full bg-white text-[10px] font-medium text-ink shadow-sm border border-ivory/50">{n}</span>)}
              </div>
            </div>
            <div>
              <h4 className="text-[10px] uppercase tracking-widest text-gold-dark font-bold mb-1">Base Notes (ऊद, एम्बर)</h4>
              <div className="flex flex-wrap gap-1">
                {product.notes.base?.map((n: string) => <span key={n} className="px-2 py-0.5 rounded-full bg-white text-[10px] font-medium text-ink shadow-sm border border-ivory/50">{n}</span>)}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quantity & Action buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="flex items-center gap-3 bg-cream rounded-full px-2 py-1.5 shadow-inner border border-ivory/50 w-fit justify-between shrink-0">
          <button onClick={() => setQty(Math.max(1, qty - 1))} className="h-8 w-8 rounded-full bg-white shadow-sm flex items-center justify-center hover:shadow transition font-bold" aria-label="Decrease quantity">-</button>
          <span className="text-sm font-bold w-6 text-center tabular-nums">{qty}</span>
          <button onClick={() => setQty(qty + 1)} className="h-8 w-8 rounded-full bg-white shadow-sm flex items-center justify-center hover:shadow transition font-bold" aria-label="Increase quantity">+</button>
        </div>

        <button onClick={handleAdd} className={`flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-full font-bold tracking-widest uppercase text-xs shadow-xl transition-all cursor-pointer ${added ? "bg-emerald-600 text-white shadow-emerald-600/20" : "bg-ink text-parchment hover:bg-navy shadow-ink/15"}`}>
          {added ? <><Check size={16} /> Added successfully</> : <><ShoppingBag size={16} /> Add to Cart</>}
        </button>
      </div>

      <button onClick={handleBuyNow} className="w-full py-4 rounded-full bg-gold-dark text-white font-bold tracking-widest uppercase text-xs hover:bg-gold transition-all shadow-lg shadow-gold/20 mb-6 cursor-pointer">
        ⚡ Instant UPI Buy Now
      </button>

      <div className="space-y-2 border-t border-ivory/60 pt-4">
        <div className="flex items-center gap-2 text-[11px] text-stone font-semibold uppercase tracking-wider">
          <ShieldCheck size={14} className="text-emerald-600" /> <span>Complimentary Pan-India courier shipping</span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-stone font-semibold uppercase tracking-wider">
          <AlertTriangle size={14} className="text-gold-dark" /> <span className="text-gold-dark">COD is NOT available • Only UPI Scans accepted</span>
        </div>
      </div>
    </div>
  );

  if (isEmbed) {
    return contentMarkup;
  }

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="text-xs uppercase tracking-widest text-stone font-semibold mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-ink">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-ink">Shop</Link>
          <span>/</span>
          <span className="text-ink">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Images Section */}
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden bg-[#0d0a11] shadow-2xl border border-gold/20">
              <img src={images[selectedImage]} alt={product.name} className="w-full h-full object-cover transition-opacity duration-300" />
            </div>
            {images.length > 1 && (
              <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
                {images.map((img: string, i: number) => (
                  <button key={i} onClick={() => setSelectedImage(i)} aria-label={`Image ${i + 1}`} className={`shrink-0 w-16 h-16 rounded-xl overflow-hidden ring-2 transition-all ${selectedImage === i ? "ring-gold shadow-md" : "ring-transparent opacity-60 hover:opacity-100"}`}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Section */}
          {contentMarkup}
        </div>

        {/* Detailed Review Panel inside Product detail view */}
        <div className="mt-20 border-t border-ivory/60 pt-16">
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl text-ink font-bold mb-8">Verified Customer Reviews</h2>
          {reviews.length === 0 ? (
            <p className="text-stone text-sm">No reviews yet for this product batch. Be the first to express devotion.</p>
          ) : (
            <div className="grid sm:grid-cols-2 gap-6">
              {reviews.map((r) => (
                <div key={r.id} className="bg-white rounded-3xl p-6 border border-ivory/50 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-8 w-8 rounded-full bg-cream flex items-center justify-center text-xs font-bold text-ink">{r.name.charAt(0)}</div>
                    <div>
                      <div className="text-xs font-bold text-ink">{r.name}</div>
                      <div className="text-[9px] text-stone font-mono">{r.date ? new Date(r.date).toLocaleDateString("en-IN") : ""}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={11} className={i < r.rating ? "text-gold fill-gold" : "text-stone-light"} />)}
                  </div>
                  <h4 className="font-[family-name:var(--font-cormorant)] text-base font-bold text-ink mb-1.5">“{r.title}”</h4>
                  <p className="text-xs text-ink/70 leading-relaxed font-light">{r.body}</p>
                  {r.verified === true && <span className="inline-block mt-3 text-[9px] uppercase tracking-wider text-gold-dark font-bold bg-cream px-2 py-0.5 rounded-full border border-ivory/40">Verified pre-launch purchaser</span>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
