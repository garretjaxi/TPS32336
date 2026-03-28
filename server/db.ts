import { eq, desc, and, like, asc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, orders, productInventory, bookingInquiries, listings, vipSubscribers, InsertOrder, InsertBookingInquiry, InsertListing, InsertVIPSubscriber } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

// ─── User helpers ────────────────────────────────────────────────────────────

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = await getDb();
  if (!db) { console.warn("[Database] Cannot upsert user: database not available"); return; }

  try {
    const values: InsertUser = { openId: user.openId };
    const updateSet: Record<string, unknown> = {};
    const textFields = ["name", "email", "loginMethod"] as const;

    textFields.forEach((field) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    });

    if (user.lastSignedIn !== undefined) { values.lastSignedIn = user.lastSignedIn; updateSet.lastSignedIn = user.lastSignedIn; }
    if (user.role !== undefined) { values.role = user.role; updateSet.role = user.role; }
    else if (user.openId === ENV.ownerOpenId) { values.role = 'admin'; updateSet.role = 'admin'; }

    if (!values.lastSignedIn) values.lastSignedIn = new Date();
    if (Object.keys(updateSet).length === 0) updateSet.lastSignedIn = new Date();

    await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) { console.warn("[Database] Cannot get user: database not available"); return undefined; }
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getAdminByEmail(email: string | null): Promise<boolean> {
  if (!email) return false;
  const db = await getDb();
  if (!db) return false;
  const result = await db.select().from(users).where(and(eq(users.email, email), eq(users.role, 'admin'))).limit(1);
  return result.length > 0;
}

export async function getAllUsers() {
  const db = await getDb();
  if (!db) return [];
  return db.select({
    id: users.id,
    openId: users.openId,
    name: users.name,
    email: users.email,
    role: users.role,
    loginMethod: users.loginMethod,
    lastSignedIn: users.lastSignedIn,
    createdAt: users.createdAt,
  }).from(users).orderBy(desc(users.createdAt));
}

export async function setUserRole(userId: number, role: 'admin' | 'user'): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  await db.update(users).set({ role }).where(eq(users.id, userId));
}

export async function deleteUserById(userId: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  await db.delete(users).where(eq(users.id, userId));
}

export async function inviteAdminByEmail(email: string, name: string): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  // Create a placeholder record — role will be confirmed on first OAuth login
  const openId = `invited-admin-${email.replace(/[^a-z0-9]/gi, '-')}-${Date.now()}`;
  await db.insert(users)
    .values({ openId, name: name || null, email, role: 'admin', loginMethod: 'invited', lastSignedIn: new Date() })
    .onDuplicateKeyUpdate({ set: { role: 'admin', name: name || null } });
}

export async function updateUserStripeCustomerId(userId: number, stripeCustomerId: string): Promise<void> {
  const db = await getDb();
  if (!db) return;
  await db.update(users).set({ stripeCustomerId }).where(eq(users.id, userId));
}

// ─── Order helpers ────────────────────────────────────────────────────────────

export async function createOrder(order: InsertOrder): Promise<any> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  try {
    const result = await db.insert(orders).values(order);
    const insertId = (result as any)[0]?.insertId;
    if (!insertId) throw new Error("Failed to create order");
    const newOrder = await db.select().from(orders).where(eq(orders.id, insertId as number)).limit(1);
    if (newOrder.length === 0) throw new Error("Order not found after creation");
    return newOrder[0];
  } catch (error) {
    console.error("[Database] Failed to create order:", error);
    throw error;
  }
}

export async function updateOrderStatus(orderId: number, status: "pending" | "completed" | "failed" | "cancelled"): Promise<void> {
  const db = await getDb();
  if (!db) return;
  await db.update(orders).set({ status }).where(eq(orders.id, orderId));
}

export async function getOrderByStripeSession(sessionId: string): Promise<any | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(orders).where(eq(orders.stripeSessionId, sessionId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getOrderByPaymentIntentId(paymentIntentId: string): Promise<any | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(orders).where(eq(orders.stripePaymentIntentId, paymentIntentId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getUserOrders(userId: number): Promise<any[]> {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(orders).where(eq(orders.userId, userId)).orderBy(desc(orders.createdAt));
}

export async function getAllOrders(): Promise<any[]> {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(orders).orderBy(desc(orders.createdAt));
}

export async function getOrdersWithAnalytics() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const allOrders = await db.select().from(orders).orderBy(desc(orders.createdAt));
  const totalOrders = allOrders.length;
  const completedOrders = allOrders.filter(o => o.status === "completed").length;
  const failedOrders = allOrders.filter(o => o.status === "failed").length;
  const totalRevenue = allOrders
    .filter(o => o.status === "completed")
    .reduce((sum, o) => sum + parseFloat(o.amount as string), 0)
    .toFixed(2);
  return { totalOrders, totalRevenue, completedOrders, failedOrders, orders: allOrders };
}

// ─── Product inventory helpers ────────────────────────────────────────────────

export async function getProductInventory(): Promise<any[]> {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(productInventory);
}

export async function updateProductInventory(productId: string, updates: any): Promise<void> {
  const db = await getDb();
  if (!db) return;
  await db.update(productInventory).set(updates).where(eq(productInventory.productId, productId));
}

export async function createProductInventory(product: any): Promise<any> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(productInventory).values(product);
  const insertId = (result as any)[0]?.insertId;
  if (!insertId) throw new Error("Failed to create product");
  const newProduct = await db.select().from(productInventory).where(eq(productInventory.id, insertId as number)).limit(1);
  if (newProduct.length === 0) throw new Error("Product not found after creation");
  return newProduct[0];
}

// ─── Booking inquiry helpers ──────────────────────────────────────────────────

export async function createBookingInquiry(inquiry: InsertBookingInquiry): Promise<any> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(bookingInquiries).values(inquiry);
  const insertId = (result as any)[0]?.insertId;
  if (!insertId) throw new Error("Failed to create inquiry");
  const newInquiry = await db.select().from(bookingInquiries).where(eq(bookingInquiries.id, insertId as number)).limit(1);
  return newInquiry[0];
}

export async function getAllBookingInquiries(): Promise<any[]> {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(bookingInquiries).orderBy(desc(bookingInquiries.createdAt));
}

// ─── Listings helpers ─────────────────────────────────────────────────────────

function parseListingJson(l: any) {
  if (!l) return l;
  return {
    ...l,
    tags: typeof l.tags === 'string' ? JSON.parse(l.tags) : l.tags,
    badges: typeof l.badges === 'string' ? JSON.parse(l.badges) : l.badges,
  };
}

export async function getAllListings(): Promise<any[]> {
  const db = await getDb();
  if (!db) return [];
  const results = await db.select().from(listings).orderBy(asc(listings.sort_order), asc(listings.id));
  return results.map(parseListingJson);
}

export async function getActiveListings(): Promise<any[]> {
  const db = await getDb();
  if (!db) return [];
  const results = await db.select().from(listings).where(eq(listings.active, 1)).orderBy(asc(listings.sort_order), asc(listings.id));
  return results.map(parseListingJson);
}

export async function getActiveHomeListings(): Promise<any[]> {
  const db = await getDb();
  if (!db) return [];
  const results = await db.select().from(listings)
    .where(and(eq(listings.active, 1), eq(listings.listing_type, "home")))
    .orderBy(asc(listings.sort_order), asc(listings.id));
  return results.map(parseListingJson);
}

export async function getActiveRoomListings(): Promise<any[]> {
  const db = await getDb();
  if (!db) return [];
  const results = await db.select().from(listings)
    .where(and(eq(listings.active, 1), eq(listings.listing_type, "room")))
    .orderBy(asc(listings.sort_order), asc(listings.id));
  return results.map(parseListingJson);
}

export async function getListingById(id: number): Promise<any | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(listings).where(eq(listings.id, id)).limit(1);
  return result.length > 0 ? parseListingJson(result[0]) : undefined;
}

export async function createListing(listing: InsertListing): Promise<any> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(listings).values(listing);
  const insertId = (result as any)[0]?.insertId;
  if (!insertId) throw new Error("Failed to create listing");
  const newListing = await db.select().from(listings).where(eq(listings.id, insertId as number)).limit(1);
  return newListing[0];
}

export async function updateListing(id: number, updates: Partial<InsertListing>): Promise<any> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(listings).set(updates).where(eq(listings.id, id));
  const updated = await db.select().from(listings).where(eq(listings.id, id)).limit(1);
  return updated[0];
}

export async function deleteListing(id: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(listings).where(eq(listings.id, id));
}

export async function countListings(): Promise<number> {
  const db = await getDb();
  if (!db) return 0;
  const result = await db.select().from(listings);
  return result.length;
}

// ─── VIP Subscriber helpers ──────────────────────────────────────────────────

export async function signupVIPSubscriber(email: string): Promise<any> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  try {
    // Check if email already exists
    const existing = await db.select().from(vipSubscribers).where(eq(vipSubscribers.email, email)).limit(1);
    if (existing.length > 0) {
      return existing[0]; // Return existing subscriber
    }
    
    // Insert new VIP subscriber
    const result = await db.insert(vipSubscribers).values({
      email,
      discountCode: "Online10",
      discountPercentage: 10,
      isActive: 1,
    });
    
    const insertId = (result as any)[0]?.insertId;
    if (!insertId) throw new Error("Failed to create VIP subscriber");
    
    const newSubscriber = await db.select().from(vipSubscribers).where(eq(vipSubscribers.id, insertId as number)).limit(1);
    return newSubscriber[0];
  } catch (error) {
    console.error("[Database] Failed to signup VIP subscriber:", error);
    throw error;
  }
}

export async function getAllVIPSubscribers(): Promise<any[]> {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(vipSubscribers).orderBy(desc(vipSubscribers.createdAt));
}
