import { db } from "@/db";
import { products, reviews } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import ProductDetailClient from "@/components/ProductDetailClient";

export const dynamic = "force-dynamic";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const idNum = parseInt(id, 10);
  if (isNaN(idNum)) notFound();

  const productRows = await db.select().from(products).where(eq(products.id, idNum));
  if (!productRows.length) notFound();
  const product = productRows[0];

  const reviewRows = await db.select().from(reviews).where(eq(reviews.productId, idNum)).orderBy(reviews.date);

  const mappedProduct = {
    ...product,
    price: parseFloat(product.price as any),
    originalPrice: product.originalPrice ? parseFloat(product.originalPrice as any) : null,
    rating: product.rating ? parseFloat(product.rating as any) : 0,
  };

  return (
    <main className="min-h-screen bg-parchment">
      <ProductDetailClient product={mappedProduct as any} reviews={reviewRows} />
    </main>
  );
}
