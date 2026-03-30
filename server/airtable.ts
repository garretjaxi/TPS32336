import axios from "axios";
import { getDb } from "./db";
import { listings } from "../drizzle/schema";
import { eq } from "drizzle-orm";

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_LISTINGS_TABLE_ID = process.env.AIRTABLE_LISTINGS_TABLE_ID;

if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID || !AIRTABLE_LISTINGS_TABLE_ID) {
  console.warn("Airtable credentials not configured. Sync will be skipped.");
}

const airtableClient = axios.create({
  baseURL: `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}`,
  headers: {
    Authorization: `Bearer ${AIRTABLE_API_KEY}`,
    "Content-Type": "application/json",
  },
});

export interface AirtableListing {
  id: string;
  fields: {
    name?: string;
    tagline?: string;
    address?: string;
    beds?: number;
    baths?: number;
    guests?: number;
    price?: number;
    rating?: number;
    reviews?: number;
    tags?: string[];
    badges?: string[];
    image?: string;
    houfy_url?: string;
    featured?: boolean;
    active?: boolean;
    sort_order?: number;
    listing_type?: "home" | "room";
  };
}

/**
 * Fetch all listings from Airtable
 */
export async function fetchAirtableListings(): Promise<AirtableListing[]> {
  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID || !AIRTABLE_LISTINGS_TABLE_ID) {
    throw new Error("Airtable credentials not configured");
  }

  try {
    const response = await airtableClient.get(`/${AIRTABLE_LISTINGS_TABLE_ID}`);
    return response.data.records || [];
  } catch (error) {
    console.error("Failed to fetch Airtable listings:", error);
    throw error;
  }
}

/**
 * Sync listings from Airtable to database
 */
export async function syncAirtableListings() {
  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID || !AIRTABLE_LISTINGS_TABLE_ID) {
    console.warn("Airtable credentials not configured. Skipping sync.");
    return { synced: 0, errors: 0 };
  }

  try {
    const db = await getDb();
    if (!db) {
      throw new Error("Database connection failed");
    }

    const airtableListings = await fetchAirtableListings();
    let synced = 0;
    let errors = 0;

    for (const record of airtableListings) {
      try {
        const fields = record.fields;
        
        // Validate required fields
        if (!fields.name || !fields.tagline || !fields.image) {
          console.warn(`Skipping record ${record.id}: missing required fields`);
          errors++;
          continue;
        }

        // Check if listing already exists by name (Airtable record ID may not match DB ID)
        const existingResults = await db.select().from(listings).where(eq(listings.name, fields.name!)).limit(1);
        const existing = existingResults[0];

        const listingData = {
          name: fields.name,
          tagline: fields.tagline,
          location: fields.address || "Orlando, FL",
          beds: fields.beds || 1,
          baths: String(fields.baths || 1),
          guests: fields.guests || 2,
          price: fields.price || 100,
          rating: String(fields.rating || 5),
          reviews: fields.reviews || 0,
          tags: fields.tags || [],
          badges: fields.badges || [],
          image: fields.image,
          houfy_url: fields.houfy_url || "",
          featured: fields.featured ? 1 : 0,
          active: fields.active !== false ? 1 : 0,
          sort_order: fields.sort_order || 0,
          listing_type: fields.listing_type || "home",
        };

        if (existing) {
          // Update existing listing
          await db
            .update(listings)
            .set(listingData as any)
            .where(eq(listings.id, existing.id));
        } else {
          // Create new listing
          await db.insert(listings).values(listingData as any);
        }

        synced++;
      } catch (error) {
        console.error(`Failed to sync record ${record.id}:`, error);
        errors++;
      }
    }

    console.log(`Airtable sync completed: ${synced} synced, ${errors} errors`);
    return { synced, errors };
  } catch (error) {
    console.error("Airtable sync failed:", error);
    throw error;
  }
}

/**
 * Test Airtable connection
 */
export async function testAirtableConnection(): Promise<boolean> {
  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID || !AIRTABLE_LISTINGS_TABLE_ID) {
    throw new Error("Airtable credentials not configured");
  }

  try {
    const response = await airtableClient.get(`/${AIRTABLE_LISTINGS_TABLE_ID}?maxRecords=1`);
    return response.status === 200;
  } catch (error) {
    console.error("Airtable connection test failed:", error);
    return false;
  }
}
