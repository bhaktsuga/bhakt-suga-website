"use client";
import { ArrowDown, Sparkles } from "lucide-react";
import Link from "next/link";
import { useCart } from "./CartProvider";

export default function Hero() {
  const { add } = useCart();

  const handleBuyNow = () => {
    add({
      id: 1,
      name: "Shree Ram Perfume",
      brand: "BHAKT SUGA",
      price: 300,
      image: "/shree-ram-perfume.png",
      size: "20 ML",
    });
  };

  return (
    <section className="relative overflow-hidden bg-[#0d0a11] text-parchment py-20 lg:py-28 min-h-[90vh] flex items-center">
      {/* Background with custom overlay gradients for luxury aesthetic */}
      <div className="absolute inset-0">
        <img 
          src="/shree-ram-perfume.png" 
          alt="Shree Ram Perfume Premium Indian Fragrance" 
          className="w-full h-full object-cover opacity-35 mix-blend-luminosity scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0a11] via-[#0d0a11]/90 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0a11] via-transparent to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 animate-fade-up">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-[10px] sm:text-xs uppercase tracking-[0.25em] text-gold-soft font-bold">
              <Sparkles size={14} className="text-gold animate-pulse" /> PREMIUM INDIAN PERFUME
            </div>

            <div className="space-y-3">
              <h1 className="font-[family-name:var(--font-playfair)] text-5xl sm:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tight text-parchment">
                SHREE RAM
              </h1>
              <p className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-3xl lg:text-4xl text-gold font-medium italic tracking-wide">
                “The Fragrance of Devotion”
              </p>
            </div>

            <p className="text-parchment/70 text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl font-light">
              Experience the aura of divine energy and temple serenity. Infused with pure Chandan, precious Kesar, and sacred Lotus. 100% alcohol-free and extraordinarily long-lasting.
            </p>

            <div className="flex items-center gap-4 sm:gap-6 pt-2">
              <div className="border-r border-gold/30 pr-6">
                <span className="block text-[10px] uppercase tracking-widest text-stone-light">Premium Size</span>
                <span className="block text-xl font-semibold text-parchment font-mono mt-0.5">20 ML</span>
              </div>
              <div>
                <span className="block text-[10px] uppercase tracking-widest text-stone-light">Special Launch Price</span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-3xl font-bold text-gold-soft font-[family-name:var(--font-playfair)]">₹300</span>
                  <span className="text-sm text-stone line-through font-mono">₹450</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <button 
                onClick={handleBuyNow} 
                className="px-8 sm:px-10 py-4 rounded-full bg-gold-dark text-white font-bold hover:bg-gold hover:scale-[1.03] transition-all tracking-widest uppercase text-xs shadow-xl shadow-gold-dark/20 cursor-pointer"
              >
                BUY NOW — ₹300
              </button>
              <Link 
                href="/product/1" 
                className="inline-flex items-center gap-2 px-8 sm:px-10 py-4 rounded-full bg-white/10 text-parchment font-semibold hover:bg-white/15 transition-all backdrop-blur border border-white/10 text-xs tracking-widest uppercase"
              >
                Learn More
              </Link>
            </div>

            <p className="text-[10px] text-stone-light tracking-wider font-semibold uppercase">
              🚩 FREE shipping across India • UPI Only Payment • COD Unavailable
            </p>
          </div>

          {/* Hero Right Visual Column */}
          <div className="lg:col-span-5 hidden lg:block">
            <div className="relative mx-auto w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-gold/20 bg-gradient-to-b from-navy/40 to-[#0d0a11]">
              <img 
                src="/shree-ram-perfume.png" 
                alt="Shree Ram Perfume Bottle and Box" 
                className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-700 ease-out" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0a11]/90 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 bg-black/65 backdrop-blur-md rounded-2xl p-4 border border-gold/20 text-center">
                <span className="block font-[family-name:var(--font-cormorant)] text-lg text-gold-soft font-semibold">॥ भक्ति की सुगंध, मर्यादा की पहचान ॥</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block">
        <a 
          href="#product-section" 
          aria-label="Scroll to product details" 
          className="animate-bounce flex flex-col items-center gap-1.5 text-parchment/40 hover:text-parchment transition-colors"
        >
          <span className="text-[9px] uppercase tracking-[0.25em] font-semibold">Discover Devotion</span>
          <ArrowDown size={14} strokeWidth={2} />
        </a>
      </div>
    </section>
  );
}
