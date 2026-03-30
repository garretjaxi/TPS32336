/**
 * Distance Caching Module
 * Calculates distances from properties to theme parks and caches them in the database
 */

import { getDb } from "./db";
import { listings } from "../drizzle/schema";
import { geocodeAddress } from "./geocoding";
import { eq } from "drizzle-orm";

// Theme park coordinates
const THEME_PARKS = {
  magicKingdom: {
    name: "Magic Kingdom",
    lat: 28.4172,
    lng: -81.5812,
  },
  universal: {
    name: "Universal Studios",
    lat: 28.4735,
    lng: -81.4691,
  },
  seaworld: {
    name: "SeaWorld Orlando",
    lat: 28.4145,
    lng: -81.4602,
  },
  legoland: {
    name: "LEGOLAND Florida",
    lat: 28.1875,
    lng: -81.7450,
  },
  airport: {
    name: "Orlando International Airport",
    lat: 28.4312,
    lng: -81.3089,
  },
} as const;

/**
 * Calculate distance between two coordinates using Haversine formula
 * Returns distance in miles
 */
function haversineDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 3959; // Earth's radius in miles
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Estimate driving time based on distance
 * Uses 50 mph average speed
 */
function estimateDrivingTime(distanceMiles: number): number {
  const averageSpeed = 50;
  return Math.round((distanceMiles / averageSpeed) * 60); // Returns minutes
}

/**
 * Calculate all distances for a single property
 */
async function calculatePropertyDistances(
  propertyId: number,
  address: string
): Promise<{
  magicKingdom: { distance: number; minutes: number } | null;
  universal: { distance: number; minutes: number } | null;
  seaworld: { distance: number; minutes: number } | null;
  legoland: { distance: number; minutes: number } | null;
  airport: { distance: number; minutes: number } | null;
}> {
  // Geocode the address to get coordinates
  const geocoded = await geocodeAddress(address);

  if (!geocoded) {
    console.warn(`Failed to geocode address for property ${propertyId}: ${address}`);
    return {
      magicKingdom: null,
      universal: null,
      seaworld: null,
      legoland: null,
      airport: null,
    };
  }

  const distances: Record<string, { distance: number; minutes: number } | null> = {};

  // Calculate distance to each theme park
  for (const [key, park] of Object.entries(THEME_PARKS)) {
    const distanceMiles = haversineDistance(
      geocoded.lat,
      geocoded.lng,
      park.lat,
      park.lng
    );
    const minutes = estimateDrivingTime(distanceMiles);

    distances[key] = {
      distance: Math.round(distanceMiles * 10) / 10, // Round to 1 decimal
      minutes,
    };
  }

  return distances as any;
}

/**
 * Cache distances for a single property in the database
 */
async function cachePropertyDistances(
  propertyId: number,
  address: string
): Promise<boolean> {
  try {
    const db = await getDb();
    if (!db) {
      console.error(`Database not available for property ${propertyId}`);
      return false;
    }

    const distances = await calculatePropertyDistances(propertyId, address);

    // Update the listing with cached distances
    await db
      .update(listings)
      .set({
        distanceMagicKingdom: distances.magicKingdom,
        distanceUniversal: distances.universal,
        distanceSeaworld: distances.seaworld,
        distanceLEGOLAND: distances.legoland,
        distanceAirport: distances.airport,
        updatedAt: new Date(),
      })
      .where(eq(listings.id, propertyId));

    console.log(`✓ Cached distances for property ${propertyId}`);
    return true;
  } catch (error) {
    console.error(`✗ Failed to cache distances for property ${propertyId}:`, error);
    return false;
  }
}

/**
 * Cache distances for all properties
 */
export async function cacheAllDistances(): Promise<{
  success: number;
  failed: number;
  total: number;
}> {
  try {
    const db = await getDb();
    if (!db) {
      throw new Error("Database not available");
    }

    // Get all listings with addresses
    const allListings = await db
      .select({
        id: listings.id,
        address: listings.address,
        name: listings.name,
      })
      .from(listings)
      .where(eq(listings.active, 1))

    console.log(`Starting distance caching for ${allListings.length} properties...`);

    let success = 0;
    let failed = 0;

    // Process each listing
    for (const listing of allListings) {
      if (!listing.address) {
        console.warn(`Skipping ${listing.name} - no address found`);
        failed++;
        continue;
      }

      const cached = await cachePropertyDistances(listing.id, listing.address);
      if (cached) {
        success++;
      } else {
        failed++;
      }

      // Add small delay to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    console.log(`Distance caching complete: ${success} succeeded, ${failed} failed`);

    return {
      success,
      failed,
      total: allListings.length,
    };
  } catch (error) {
    console.error("Error during distance caching:", error);
    throw error;
  }
}

/**
 * Get cached distances for a property
 */
export function getPropertyDistances(listing: any) {
  return {
    magicKingdom: listing.distanceMagicKingdom,
    universal: listing.distanceUniversal,
    seaworld: listing.distanceSeaworld,
    legoland: listing.distanceLEGOLAND,
    airport: listing.distanceAirport,
  };
}
