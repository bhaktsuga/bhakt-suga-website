import { db } from "@/db";
import { products, reviews } from "@/db/schema";

const demoProducts = [
  {
    name: "Midnight Oud",
    brand: "Bhakt Suga",
    category: "men" as const,
    scentFamily: "Oriental Wood",
    price: "195.00",
    originalPrice: "240.00",
    description:
      "A commanding fusion of aged oud, smoked incense, and crushed ambergris. Midnight Oud unfolds with dark leather and charred woods, settling into a long-lasting, intimate trail. Designed for the man who moves with purpose and prefers the shadows to the spotlight.",
    notes: {
      top: ["Bergamot", "Black Pepper", "Cardamom"],
      middle: ["Oud", "Smoked Incense", "Leather"],
      base: ["Ambergris", "Sandalwood", "Vetiver"],
    },
    size: "100ml",
    image: "/images/perfume-1.jpg",
    images: ["/images/perfume-1.jpg", "/images/perfume-3.jpg", "/images/hero-perfume.jpg"],
    rating: 4.8,
    reviewCount: 124,
    inStock: true,
    featured: true,
    newArrival: false,
  },
  {
    name: "Velvet Rose",
    brand: "Bhakt Suga",
    category: "women" as const,
    scentFamily: "Floral Oriental",
    price: "175.00",
    originalPrice: "210.00",
    description:
      "A luminous cascade of Bulgarian rose, saffron, and white musk. Velvet Rose opens with juicy lychee and dewy rose, then deepens into a warm amber heart before leaving a gossamer trail of vanilla and sandalwood. Elegant, assertive, and unforgettable.",
    notes: {
      top: ["Lychee", "Bergamot", "Pink Pepper"],
      middle: ["Bulgarian Rose", "Saffron", "Jasmine"],
      base: ["White Musk", "Sandalwood", "Vanilla"],
    },
    size: "100ml",
    image: "/images/perfume-2.jpg",
    images: ["/images/perfume-2.jpg", "/images/perfume-5.jpg", "/images/hero-perfume.jpg"],
    rating: 4.9,
    reviewCount: 189,
    inStock: true,
    featured: true,
    newArrival: true,
  },
  {
    name: "Silver Meridian",
    brand: "Bhakt Suga",
    category: "unisex" as const,
    scentFamily: "Fresh Woody",
    price: "165.00",
    originalPrice: null,
    description:
      "Clean and expansive, Silver Meridian blends marine accords with silver cedar and white thyme. It is the scent of open horizons—bright enough for day, refined enough for evening. A modern classic for those who value understated sophistication.",
    notes: {
      top: ["Calabrian Bergamot", "Sea Salt", "Aquatic Notes"],
      middle: ["Silver Cedar", "White Thyme", "Iris"],
      base: ["White Amber", "Musk", "Sandalwood"],
    },
    size: "100ml",
    image: "/images/perfume-3.jpg",
    images: ["/images/perfume-3.jpg", "/images/perfume-4.jpg"],
    rating: 4.6,
    reviewCount: 96,
    inStock: true,
    featured: false,
    newArrival: false,
  },
  {
    name: "Golden Hour",
    brand: "Bhakt Suga",
    category: "women" as const,
    scentFamily: "Gourmand Floral",
    price: "185.00",
    originalPrice: "220.00",
    description:
      "A warm embrace of honeyed amber, wild jasmine, and toasted almond. Golden Hour captures the fleeting magic of sunset—golden light, soft skin, lingering warmth. It is intimate, comforting, and quietly luxurious.",
    notes: {
      top: ["Bergamot", "Wild Jasmine", "Honey"],
      middle: ["Amber", "Toasted Almond", "Patchouli"],
      base: ["White Musk", "Vanilla", "Sandalwood"],
    },
    size: "75ml",
    image: "/images/perfume-4.jpg",
    images: ["/images/perfume-4.jpg", "/images/perfume-5.jpg"],
    rating: 4.7,
    reviewCount: 152,
    inStock: true,
    featured: true,
    newArrival: false,
  },
  {
    name: "Amber Muse",
    brand: "Bhakt Suga",
    category: "men" as const,
    scentFamily: "Spicy Oriental",
    price: "190.00",
    originalPrice: "230.00",
    description:
      "Deep amber, roasted coffee, and crushed spices create a bold, intoxicating profile. Amber Muse is for evenings that become nights, for moments when you want to leave a memory behind. Warm, dark, and irresistibly masculine.",
    notes: {
      top: ["Bergamot", "Saffron", "Cardamom"],
      middle: ["Amber", "Coffee", "Leather"],
      base: ["Myrrh", "Vetiver", "Sandalwood"],
    },
    size: "100ml",
    image: "/images/perfume-5.jpg",
    images: ["/images/perfume-5.jpg", "/images/perfume-1.jpg", "/images/perfume-3.jpg"],
    rating: 4.5,
    reviewCount: 78,
    inStock: true,
    featured: false,
    newArrival: true,
  },
];

const demoReviews = [
  { productName: "Midnight Oud", name: "Ravi M.", rating: 5, title: "Unmatched intensity", body: "This is not a casual fragrance. It announces you. The oud is authentic and deep, not synthetic. I get compliments every time I wear it. The longevity is remarkable—over 12 hours on my skin. Worth every rupee.", verified: true, date: new Date("2025-11-12") },
  { productName: "Midnight Oud", name: "Arjun K.", rating: 4, title: "Bold and refined", body: "Excellent quality with a luxurious feel. The leather note is very present, and the overall composition feels like something from a Parisian atelier. I found it slightly heavy for daytime, but perfect for evenings.", verified: true, date: new Date("2025-10-28") },
  { productName: "Midnight Oud", name: "Nisha P.", rating: 5, title: "A masterpiece", body: "Bought for my husband and he refuses to wear anything else. The balance between darkness and elegance is perfect. The bottle itself is art.", verified: true, date: new Date("2025-09-15") },
  { productName: "Velvet Rose", name: "Priya R.", rating: 5, title: "Absolutely divine", body: "This scent is like walking through a rose garden at dawn. The saffron adds warmth without being heavy, and the dry down is pure silk. I have been wearing it daily for three months and still find new layers.", verified: true, date: new Date("2025-12-01") },
  { productName: "Velvet Rose", name: "Anjali D.", rating: 4, title: "Elegant and long-lasting", body: "Beautiful fragrance with excellent projection. The white musk base is incredibly clean and modern. Would recommend to anyone looking for a signature scent.", verified: true, date: new Date("2025-11-20") },
  { productName: "Velvet Rose", name: "Meera T.", rating: 5, title: "The best rose I have tried", body: "Not powdery, not sweet—just pure, luminous rose. The packaging is beautiful and the bottle is heavy with quality glass. I have already purchased two more bottles.", verified: true, date: new Date("2025-10-05") },
  { productName: "Silver Meridian", name: "Kunal V.", rating: 5, title: "Fresh without being generic", body: "Most fresh fragrances feel like soap. Silver Meridian feels like sea air and cool cedar. Perfect for office wear and summer evenings.", verified: true, date: new Date("2025-11-30") },
  { productName: "Silver Meridian", name: "Shweta B.", rating: 4, title: "Clean and modern", body: "A great unisex option. I share it with my partner and it suits both of us. The projection is moderate, making it intimate and appropriate for close settings.", verified: true, date: new Date("2025-09-22") },
  { productName: "Golden Hour", name: "Rohit S.", rating: 5, title: "Warm and captivating", body: "Golden Hour is the perfect gift. The amber is not cloying, the jasmine is bright, and the overall dry down feels like a warm embrace. My partner wears it and I can always smell her presence.", verified: true, date: new Date("2025-11-18") },
  { productName: "Golden Hour", name: "Neha C.", rating: 5, title: "Luxury in a bottle", body: "The bottle design is elegant, the scent profile is unique, and the value is exceptional compared to designer alternatives. Highly recommend.", verified: true, date: new Date("2025-08-30") },
  { productName: "Amber Muse", name: "Vikram J.", rating: 4, title: "Bold and characterful", body: "Strong and distinctive. The coffee note is surprising but adds depth. Not for the faint of heart, but if you want presence, this delivers. The packaging is premium and the gift box is beautiful.", verified: true, date: new Date("2025-11-05") },
  { productName: "Amber Muse", name: "Ankit R.", rating: 5, title: "A new favorite", body: "This is the kind of scent that becomes part of your identity. I have worn it for two months and friends ask about it constantly. The mysrrh base is beautifully done.", verified: true, date: new Date("2025-10-14") },
];

export async function seed() {
  const existing = await db.select().from(products).limit(1);
  if (existing.length > 0) {
    console.log("Data already seeded.");
    return;
  }

  for (const p of demoProducts) {
    const [inserted] = await db.insert(products).values({
      name: p.name,
      brand: p.brand,
      category: p.category,
      scentFamily: p.scentFamily,
      price: p.price,
      originalPrice: p.originalPrice,
      description: p.description,
      notes: p.notes,
      size: p.size,
      image: p.image,
      images: p.images,
      rating: p.rating,
      reviewCount: p.reviewCount,
      inStock: p.inStock,
      featured: p.featured,
      newArrival: p.newArrival,
    }).returning({ id: products.id });

    const productReviews = demoReviews.filter((r) => r.productName === p.name);
    for (const r of productReviews) {
      await db.insert(reviews).values({
        productId: inserted.id,
        name: r.name,
        rating: r.rating,
        title: r.title,
        body: r.body,
        verified: r.verified,
        date: r.date,
      });
    }
  }
  console.log("Seeded products and reviews.");
}
