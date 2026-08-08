import { db } from "@/db";
import { products } from "@/db/schema";
import { eq, and, or, ilike } from "drizzle-orm";
import FilterClient from "@/components/FilterClient";

export const dynamic = "force-dynamic";

export default async function ShopPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const params = await searchParams;
  const category = typeof params.category === "string" ? params.category : "all";
  const search = typeof params.search === "string" ? params.search : "";
  const featured = typeof params.featured === "string" ? params.featured : "";

  const conditions = [];
  if (category !== "all") conditions.push(eq(products.category, category));
  if (featured === "true") conditions.push(eq(products.featured, true));
  if (search.trim()) {
    const q = `%${search.trim()}%`;
    conditions.push(or(ilike(products.name, q), ilike(products.brand, q), ilike(products.scentFamily, q)));
  }

  const rawRows = conditions.length ? await db.select().from(products).where(and(...conditions) as any) : await db.select().from(products);
  const rows = rawRows.map((r: any) => ({ ...r, price: parseFloat(r.price), originalPrice: r.originalPrice ? parseFloat(r.originalPrice) : null })) as any;

  const counts = {
    all: (await db.select().from(products)).length,
    premium: (await db.select().from(products).where(eq(products.category, "premium"))).length,
    men: (await db.select().from(products).where(eq(products.category, "men"))).length,
    women: (await db.select().from(products).where(eq(products.category, "women"))).length,
    unisex: (await db.select().from(products).where(eq(products.category, "unisex"))).length,
  };

  return (
    <main className="min-h-screen bg-parchment">
      <div className="relative h-[50vh] lg:h-[60vh] overflow-hidden bg-navy">
        <img src="/images/perfume-3.jpg" alt="Store" className="w-full h-full object-cover opacity-30 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/60 to-navy/90" />
        <div className="absolute inset-0 flex items-end pb-16 lg:pb-20 px-6 lg:px-10">
          <div className="max-w-7xl mx-auto w-full">
            <p className="text-xs uppercase tracking-[0.3em] text-gold-soft mb-3">Fragrances</p>
            <h1 className="font-[family-name:var(--font-playfair)] text-5xl lg:text-7xl font-medium text-parchment leading-[0.9]">The Store</h1>
          </div>
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-6 lg:px-10 -mt-12 relative z-10">
        <FilterClient initialCategory={category} initialSearch={search} initialFeatured={featured === "true"} counts={counts} products={rows as any} />
      </section>
    </main>
  );
}
