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
    Name?: string;
    tagline?: string;
    address?: string;
    Address?: string;
    beds?: number;
    Beds?: number;
    baths?: number;
    Baths?: number;
    guests?: number;
    Guests?: number;
    price?: number;
    Price?: number;
    rating?: number;
    Rating?: number;
    reviews?: number;
    Reviews?: number;
    tags?: string[];
    Tags?: string[];
    badges?: string[];
    Badges?: string[];
    image?: string;
    Image?: string;
    houfy_url?: string;
    "Houfy URL"?: string;
    featured?: boolean;
    Featured?: boolean;
    active?: boolean;
    Active?: boolean;
    sort_order?: number;
    "Sort Order"?: number;
    listing_type?: "home" | "room";
    "Listing Type"?: "home" | "room";
    "Distance to Magic Kingdom (mins)"?: number;
    "Distance to Universal Studios (mins)"?: number;
    "Distance to SeaWorld (mins)"?: number;
    "Distance to LEGOLAND (mins)"?: number;
    "Distance to Orlando Airport (mins)"?: number;
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
        const fields = record.fields as any;
        
        // Handle both lowercase and capitalized field names from different Airtable bases
        const getName = () => fields.name || fields.Name || "";
        const getAddress = () => fields.address || fields.Address || "";
        const getBeds = () => fields.beds || fields.Beds || 1;
        const getBaths = () => fields.baths || fields.Baths || 1;
        const getGuests = () => fields.guests || fields.Guests || 2;
        const getPrice = () => fields.price || fields.Price || 100;
        const getRating = () => fields.rating || fields.Rating || 5;
        const getReviews = () => fields.reviews || fields.Reviews || 0;
        const getTags = () => fields.tags || fields.Tags || [];
        const getBadges = () => fields.badges || fields.Badges || [];
        const getImage = () => fields.houfy_url || fields["Houfy URL"] || fields.image || fields.Image || "https://via.placeholder.com/400x300?text=" + encodeURIComponent(getName());
        const getHoufyUrl = () => fields.houfy_url || fields["Houfy URL"] || "";
        const getFeatured = () => fields.featured || fields.Featured ? 1 : 0;
        const getActive = () => fields.active !== false && fields.Active !== false ? 1 : 0;
        const getSortOrder = () => fields.sort_order || fields["Sort Order"] || 0;
        const getListingType = () => fields.listing_type || fields["Listing Type"] || "home";
        
        // Get distance values from Airtable - handle both field name variations
        const getMagicKingdomDistance = () => {
          const val = fields["Distance to Magic Kingdom (mins)"] || fields["distance_magic_kingdom"];
          return val && !isNaN(val) ? val : null;
        };
        const getUniversalDistance = () => {
          const val = fields["Distance to Universal Studios (mins)"] || fields["distance_universal"];
          return val && !isNaN(val) ? val : null;
        };
        const getSeaworldDistance = () => {
          const val = fields["Distance to SeaWorld (mins)"] || fields["distance_seaworld"];
          return val && !isNaN(val) ? val : null;
        };
        const getLEGOLANDDistance = () => {
          const val = fields["Distance to LEGOLAND (mins)"] || fields["distance_legoland"];
          return val && !isNaN(val) ? val : null;
        };
        const getAirportDistance = () => {
          const val = fields["Distance to Orlando Airport (mins)"] || fields["distance_airport"];
          return val && !isNaN(val) ? val : null;
        };

        // Validate required fields - only name is mandatory
        const name = getName();
        if (!name) {
          console.warn(`Skipping record ${record.id}: missing name field`);
          errors++;
          continue;
        }

        // Check if listing already exists by name (Airtable record ID may not match DB ID)
        const existingResults = await db.select().from(listings).where(eq(listings.name, name)).limit(1);
        const existing = existingResults[0];

        const listingData = {
          name: name,
          tagline: fields.tagline || name,
          location: fields.location || getAddress() || "Orlando, FL",
          address: getAddress(),
          beds: getBeds(),
          baths: String(getBaths()),
          guests: getGuests(),
          price: getPrice(),
          rating: String(getRating()),
          reviews: getReviews(),
          tags: getTags(),
          badges: getBadges(),
          image: getImage(),
          houfy_url: getHoufyUrl(),
          featured: getFeatured(),
          active: getActive(),
          sort_order: getSortOrder(),
          listing_type: getListingType(),
          distanceMagicKingdom: getMagicKingdomDistance() ? JSON.stringify({ minutes: getMagicKingdomDistance() }) : null,
          distanceUniversal: getUniversalDistance() ? JSON.stringify({ minutes: getUniversalDistance() }) : null,
          distanceSeaworld: getSeaworldDistance() ? JSON.stringify({ minutes: getSeaworldDistance() }) : null,
          distanceLEGOLAND: getLEGOLANDDistance() ? JSON.stringify({ minutes: getLEGOLANDDistance() }) : null,
          distanceAirport: getAirportDistance() ? JSON.stringify({ minutes: getAirportDistance() }) : null,
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
