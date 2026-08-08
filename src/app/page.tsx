import Hero from "@/components/Hero";
import { db } from "@/db";
import { products, reviews } from "@/db/schema";
import { eq } from "drizzle-orm";
import ProductCard from "@/components/ProductCard";
import ProductDetailClient from "@/components/ProductDetailClient";
import Link from "next/link";
import { Sparkles, Heart, ShieldAlert, Award, Star, Flame, Landmark } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  // Fetch Shree Ram Perfume (ID: 1) from the database
  const productRows = await db.select().from(products).where(eq(products.id, 1));
  const product = productRows[0] || {
    id: 1,
    name: "Shree Ram Perfume",
    brand: "BHAKT SUGA",
    price: "300.00",
    originalPrice: "450.00",
    description: "Inspired by devotion, purity, and Indian fragrance traditions, Shree Ram Perfume is a premium blend of natural, holy ingredients. This 100% alcohol-free premium fragrance offers an extraordinarily rich, long-lasting aroma.",
    size: "20 ML",
    image: "/images/shree_ram_perfume.png",
    rating: 4.9,
    reviewCount: 108,
  };

  // Parse fields
  const parsedProduct = {
    ...product,
    price: typeof product.price === "string" ? parseFloat(product.price) : product.price,
    originalPrice: product.originalPrice ? (typeof product.originalPrice === "string" ? parseFloat(product.originalPrice) : product.originalPrice) : null,
    rating: product.rating ? parseFloat(product.rating as any) : 4.9,
  };

  // Fetch reviews specifically for Shree Ram Perfume
  const reviewRows = await db.select().from(reviews).where(eq(reviews.productId, 1)).orderBy(reviews.date);

  return (
    <main className="min-h-screen bg-parchment">
      {/* 1. Hero Section */}
      <Hero />

      {/* Trust Badges - Inspired by the poster footer */}
      <section className="bg-ink py-6 border-y border-gold/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 text-gold-soft">
              <Sparkles size={16} className="text-gold" />
              <span className="text-[10px] sm:text-xs uppercase tracking-widest font-bold">100% Natural Ingredients</span>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 text-gold-soft">
              <Flame size={16} className="text-gold" />
              <span className="text-[10px] sm:text-xs uppercase tracking-widest font-bold">Alcohol Free Formulation</span>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 text-gold-soft">
              <Award size={16} className="text-gold" />
              <span className="text-[10px] sm:text-xs uppercase tracking-widest font-bold">Extremely Long-Lasting</span>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 text-gold-soft">
              <Landmark size={16} className="text-gold" />
              <span className="text-[10px] sm:text-xs uppercase tracking-widest font-bold">Made With Devotion</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Product Section - Proper product card & interactive details */}
      <section id="product-section" className="py-20 lg:py-28 bg-cream/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-xs uppercase tracking-[0.25em] text-gold-dark font-bold mb-2">Bhakt Suga Masterpiece</p>
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl lg:text-5xl font-black text-ink tracking-tight">The Holy Scent</h2>
            <div className="h-0.5 w-16 bg-gold mx-auto mt-4" />
          </div>

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Product Card visual on Left */}
            <div className="lg:col-span-5">
              <div className="sticky top-28">
                <ProductCard product={{
                  id: parsedProduct.id,
                  name: parsedProduct.name,
                  brand: parsedProduct.brand,
                  price: parsedProduct.price,
                  originalPrice: parsedProduct.originalPrice,
                  image: parsedProduct.image,
                  category: "Premium Indian Perfume",
                  rating: parsedProduct.rating,
                  reviewCount: parsedProduct.reviewCount ?? 108,
                  size: "20 ML",
                  newArrival: true,
                  featured: true
                }} />
                
                <div className="bg-amber-500/5 border border-gold/20 rounded-3xl p-5 mt-6 flex gap-3 text-ink/80 items-center justify-center">
                  <span className="text-xs font-semibold tracking-wider text-gold-dark uppercase">✨ Free express pan-India delivery</span>
                </div>
              </div>
            </div>

            {/* Detailed Interactive Section on Right */}
            <div className="lg:col-span-7">
              <ProductDetailClient product={parsedProduct} reviews={reviewRows} isEmbed={true} />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Divine Ingredients Section - Sourced from user's poster */}
      <section className="bg-ink text-parchment py-24 border-t border-gold/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-xs uppercase tracking-[0.25em] text-gold-soft font-semibold mb-2">Crafted with Holy Flora</p>
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl lg:text-5xl font-bold tracking-tight text-white">Divine Ingredients</h2>
            <p className="text-gold-soft font-[family-name:var(--font-cormorant)] text-xl italic mt-2">“भक्ति की सुगंध, मर्यादा की पहचान”</p>
            <div className="h-0.5 w-16 bg-gold mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              { name: "Chandan", eng: "Sandalwood", desc: "शांति प्रदान करे, मन को ठंडक और पवित्रता दे।", note: "Sacred base of our holy fragrance blend." },
              { name: "Kesar", eng: "Saffron", desc: "दिव्यता और ऊर्जा का प्रतीक, मन को प्रसन्न करे।", note: "Adds golden warmth and rich floral glow." },
              { name: "Kamal", eng: "Lotus", desc: "आध्यात्मिक शुद्धता और सकारात्मकता बढ़ाए।", note: "Elicits calming temple serenity and peace." },
              { name: "Agarwood", eng: "Oudh", desc: "गहरी और रिच सुगंध, ध्यान और एकाग्रता बढ़ाए।", note: "Provides a long-lasting spiritual base note." },
              { name: "Gau Ghrit", eng: "Cow Ghee", desc: "आयुर्वेदिक पवित्रता का प्रतीक, ऊर्जा शुद्ध करे।", note: "Traditional purification base (traces)." },
              { name: "Tulsi", eng: "Holy Basil", desc: "पवित्रता और सुरक्षा का प्रतीक, वातावरण शुद्ध करे।", note: "Brings herbal freshness and protective aura." },
            ].map((ing) => (
              <div key={ing.name} className="bg-white/[0.03] rounded-3xl p-6 border border-white/5 hover:border-gold/30 transition-all duration-300 group">
                <div className="h-10 w-10 rounded-full bg-gold/10 flex items-center justify-center text-gold mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-xs font-bold font-[family-name:var(--font-playfair)]">{ing.name.charAt(0)}</span>
                </div>
                <h3 className="font-[family-name:var(--font-playfair)] text-lg text-white font-semibold flex items-baseline gap-1.5">
                  {ing.name} <span className="text-xs text-gold font-light font-sans">({ing.eng})</span>
                </h3>
                <p className="text-xs text-gold-soft/90 mt-2 font-medium leading-relaxed">{ing.desc}</p>
                <p className="text-[10px] text-stone-light mt-1 font-light italic">{ing.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. About Brand Section */}
      <section id="about" className="py-24 bg-cream/40 border-t border-ivory/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-gold/20">
                <img src="/images/logo.png" alt="Bhakt Suga Brand Philosophy" className="w-full h-full object-cover bg-black p-10 hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="absolute -bottom-6 -right-4 bg-ink text-parchment rounded-3xl p-6 sm:p-8 shadow-xl max-w-xs border border-gold/30">
                <p className="font-[family-name:var(--font-cormorant)] text-2xl text-gold-soft mb-1">Our Heritage</p>
                <p className="text-parchment/70 text-xs leading-relaxed font-light">100% committed to keeping ancient Indian spiritual fragrance traditions alive.</p>
              </div>
            </div>
            
            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.25em] text-gold-dark font-bold">The Spirit of BHAKT SUGA</p>
                <h2 className="font-[family-name:var(--font-playfair)] text-4xl lg:text-5xl font-black text-ink leading-tight">Born of devotion.</h2>
              </div>
              <p className="text-ink/80 text-sm sm:text-base leading-relaxed font-light">
                BHAKT SUGA is a premium Indian fragrance brand deeply rooted in spirituality, devotion, elegance, and the timeless heritage of traditional Indian attar and incense culture.
              </p>
              <p className="text-ink/80 text-sm sm:text-base leading-relaxed font-light">
                Our vision is to capture the pure, serene atmosphere of ancient temples and ashrams, and bottle it into premium, accessible fragrances. We meticulously choose raw natural botanical extracts—ensuring every bottle is entirely <strong>alcohol-free</strong>, skin-friendly, and extraordinarily long-lasting.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="p-4 bg-white rounded-2xl border border-ivory shadow-sm">
                  <span className="block text-2xl font-bold text-gold-dark font-[family-name:var(--font-playfair)]">100%</span>
                  <span className="block text-[10px] uppercase tracking-wider text-stone font-bold mt-1">Alcohol-Free Attar Oils</span>
                </div>
                <div className="p-4 bg-white rounded-2xl border border-ivory shadow-sm">
                  <span className="block text-2xl font-bold text-gold-dark font-[family-name:var(--font-playfair)]">Pan-India</span>
                  <span className="block text-[10px] uppercase tracking-wider text-stone font-bold mt-1">Fast Delivery Coverage</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Interactive Reviews Section */}
      <section id="reviews" className="py-24 bg-white border-t border-ivory/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-xs uppercase tracking-[0.25em] text-gold-dark font-bold mb-2">Customer Testimonials</p>
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl lg:text-5xl font-black text-ink tracking-tight">Reviews & Feedback</h2>
            <p className="text-stone text-xs mt-3 bg-cream/70 inline-block px-3 py-1 rounded-full font-medium border border-ivory/40">💡 Clearly Marked Sample reviews from initial pre-launch testers</p>
            <div className="h-0.5 w-16 bg-gold mx-auto mt-4" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {reviewRows.map((rev) => (
              <div key={rev.id} className="bg-parchment/30 rounded-3xl p-6 border border-ivory/60 shadow-sm hover:shadow-md hover:border-gold/30 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 mb-3.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={14} className={i < rev.rating ? "text-gold fill-gold" : "text-stone-light"} />
                    ))}
                  </div>
                  <h3 className="font-[family-name:var(--font-cormorant)] text-xl font-bold text-ink mb-2">“{rev.title}”</h3>
                  <p className="text-xs text-ink/80 leading-relaxed font-light">{rev.body}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-ivory/50 flex items-center justify-between">
                  <div>
                    <span className="block text-xs font-bold text-ink">{rev.name}</span>
                    <span className="block text-[9px] uppercase tracking-wider text-emerald-600 font-bold mt-0.5">✓ Pre-Launch Buyer</span>
                  </div>
                  <span className="text-[10px] text-stone font-mono">{rev.date ? new Date(rev.date).toLocaleDateString("en-IN") : ""}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Contact & Devotional Footer section */}
      <section id="contact" className="bg-[#120f18] text-parchment py-24 border-t border-gold/20 relative overflow-hidden">
        <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none transform translate-x-12 translate-y-12">
          <img src="/images/logo.png" alt="" className="w-96 h-96 object-contain" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs uppercase tracking-[0.25em] text-gold-soft font-bold block">Contact Our Team</span>
              <h2 className="font-[family-name:var(--font-playfair)] text-4xl lg:text-5xl font-bold text-white tracking-tight">Have questions about Shree Ram Perfume?</h2>
              <p className="text-parchment/75 text-sm sm:text-base leading-relaxed font-light">We are dedicated to assisting our devotional customer community. Reach out for batch updates, corporate gifting, or support regarding UPI verification.</p>
              
              <div className="grid sm:grid-cols-2 gap-5 pt-4">
                <div className="flex gap-3 items-center">
                  <div className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gold"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.79 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg></div>
                  <div><span className="block text-[10px] text-stone-light uppercase tracking-wider font-semibold">Phone Support</span><span className="block text-sm font-semibold text-parchment font-mono">+91 98765 43210</span></div>
                </div>
                <div className="flex gap-3 items-center">
                  <div className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gold"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg></div>
                  <div><span className="block text-[10px] text-stone-light uppercase tracking-wider font-semibold">Email Query</span><span className="block text-sm font-semibold text-parchment">support@bhaktsuga.com</span></div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white/[0.02] border border-white/5 rounded-3xl p-6 sm:p-8 space-y-4">
              <h3 className="font-[family-name:var(--font-cormorant)] text-2xl text-gold-soft font-semibold mb-2">Message Us Directly</h3>
              <div className="space-y-3">
                <input placeholder="Your Name" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-parchment focus:outline-none focus:ring-1 focus:ring-gold/40" />
                <input placeholder="Email Address" type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-parchment focus:outline-none focus:ring-1 focus:ring-gold/40" />
                <textarea placeholder="Write your devotional inquiry..." rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-parchment focus:outline-none focus:ring-1 focus:ring-gold/40 resize-none" />
                <button className="w-full py-3 rounded-xl bg-gold text-ink font-bold tracking-widest uppercase text-xs hover:bg-gold-soft hover:scale-[1.01] transition-all cursor-pointer">Submit Message</button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
