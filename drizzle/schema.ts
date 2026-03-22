import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, decimal, json, date, tinyint } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  stripeCustomerId: varchar("stripeCustomerId", { length: 128 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Orders table for tracking guest add-on purchases
 */
export const orders = mysqlTable("orders", {
  id: int("id").autoincrement().primaryKey(),
  orderId: varchar("order_id", { length: 128 }).notNull().unique(),
  userId: int("user_id"),
  guestEmail: varchar("guest_email", { length: 320 }).notNull(),
  guestName: varchar("guest_name", { length: 256 }),
  stripeSessionId: varchar("stripe_session_id", { length: 256 }),
  stripePaymentIntentId: varchar("stripe_payment_intent_id", { length: 256 }),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  currency: varchar("currency", { length: 3 }).default("USD").notNull(),
  status: mysqlEnum("status", ["pending", "completed", "failed", "cancelled"]).default("pending").notNull(),
  items: json("items").$type<Array<{ productId: string; name: string; price: number; quantity: number }>>().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Order = typeof orders.$inferSelect;
export type InsertOrder = typeof orders.$inferInsert;

/**
 * Product inventory table for managing add-on availability
 */
export const productInventory = mysqlTable("productInventory", {
  id: int("id").autoincrement().primaryKey(),
  productId: varchar("productId", { length: 64 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  category: mysqlEnum("category", ["services", "welcome", "activities"]).notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  isActive: int("isActive").default(1).notNull(),
  maxQuantityPerOrder: int("maxQuantityPerOrder").default(10).notNull(),
  description: text("description"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ProductInventory = typeof productInventory.$inferSelect;
export type InsertProductInventory = typeof productInventory.$inferInsert;

/**
 * Booking inquiries for vacation rental properties
 */
export const bookingInquiries = mysqlTable("booking_inquiries", {
  id: int("id").autoincrement().primaryKey(),
  propertyName: varchar("property_name", { length: 256 }),
  guestName: varchar("guest_name", { length: 256 }).notNull(),
  guestEmail: varchar("guest_email", { length: 320 }).notNull(),
  guestPhone: varchar("guest_phone", { length: 32 }),
  checkIn: varchar("check_in", { length: 16 }),
  checkOut: varchar("check_out", { length: 16 }),
  guests: int("guests").default(1),
  message: text("message"),
  status: mysqlEnum("status", ["new", "contacted", "booked", "closed"]).default("new").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type BookingInquiry = typeof bookingInquiries.$inferSelect;
export type InsertBookingInquiry = typeof bookingInquiries.$inferInsert;

/**
 * Property listings managed via admin dashboard
 */
export const listings = mysqlTable("listings", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  tagline: varchar("tagline", { length: 512 }).notNull(),
  location: varchar("location", { length: 256 }).notNull(),
  beds: int("beds").notNull().default(1),
  baths: decimal("baths", { precision: 4, scale: 1 }).notNull().default("1.0"),
  guests: int("guests").notNull().default(2),
  price: int("price").notNull().default(100),
  rating: decimal("rating", { precision: 3, scale: 2 }).notNull().default("5.00"),
  reviews: int("reviews").notNull().default(0),
  tags: json("tags").$type<string[]>().notNull().default([]),
  badges: json("badges").$type<string[]>().notNull().default([]),
  image: text("image").notNull(),
  houfy_url: text("houfy_url").notNull().default(""),
  featured: tinyint("featured").notNull().default(0),
  active: tinyint("active").notNull().default(1),
  sort_order: int("sort_order").notNull().default(0),
  listing_type: varchar("listing_type", { length: 20 }).notNull().default("home"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Listing = typeof listings.$inferSelect;
export type InsertListing = typeof listings.$inferInsert;