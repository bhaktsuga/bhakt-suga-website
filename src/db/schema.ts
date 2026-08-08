import { pgTable, serial, varchar, text, integer, decimal, boolean, timestamp, jsonb, doublePrecision } from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 200 }).notNull(),
  brand: varchar("brand", { length: 100 }).notNull(),
  category: varchar("category", { length: 20 }).notNull(), // men, women, unisex, premium
  scentFamily: varchar("scent_family", { length: 50 }),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  originalPrice: decimal("original_price", { precision: 10, scale: 2 }),
  description: text("description").notNull(),
  notes: jsonb("notes").$type<{ top: string[]; middle: string[]; base: string[] }>(),
  size: varchar("size", { length: 20 }).default("100ml"),
  image: varchar("image", { length: 500 }).notNull(),
  images: text("images").array(),
  rating: doublePrecision("rating").default(0),
  reviewCount: integer("review_count").default(0),
  inStock: boolean("in_stock").default(true),
  featured: boolean("featured").default(false),
  newArrival: boolean("new_arrival").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  productId: integer("product_id").notNull().references(() => products.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 100 }).notNull(),
  rating: integer("rating").notNull(),
  title: varchar("title", { length: 200 }).notNull(),
  body: text("body").notNull(),
  verified: boolean("verified").default(true),
  date: timestamp("date").defaultNow(),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  customerName: varchar("customer_name", { length: 100 }).notNull(),
  customerEmail: varchar("customer_email", { length: 100 }).notNull(),
  customerPhone: varchar("customer_phone", { length: 20 }).notNull(),
  shippingAddress: text("shipping_address").notNull(),
  city: varchar("city", { length: 50 }).notNull(),
  zip: varchar("zip", { length: 20 }).notNull(),
  items: jsonb("items").notNull(), // Array of CartItem
  totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
  paymentUtr: varchar("payment_utr", { length: 100 }).notNull(), // UPI Reference Number (UTR)
  status: varchar("status", { length: 20 }).default("pending").notNull(), // pending, verified, processing, shipped, completed
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
