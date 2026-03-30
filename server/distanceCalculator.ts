/**
 * Server-side Distance Calculator
 * Uses Google Maps API to calculate accurate distances from addresses to theme parks
 */

import { makeRequest, DirectionsResult } from "./_core/map";

// Theme park coordinates and names
export const THEME_PARKS = {
  magicKingdom: {
    name: "Magic Kingdom",
    address: "1180 Seven Seas Drive, Lake Buena Vista, FL 32830",
    lat: 28.4172,
    lng: -81.5812,
  },
  universal: {
    name: "Universal Studios",
    address: "6000 Universal Boulevard, Orlando, FL 32819",
    lat: 28.4735,
    lng: -81.4691,
  },
  seaworld: {
    name: "SeaWorld Orlando",
    address: "10500 Universal Boulevard, Orlando, FL 32821",
    lat: 28.4145,
    lng: -81.4602,
  },
  legoland: {
    name: "LEGOLAND Florida",
    address: "1 Legoland Way, Winter Haven, FL 33884",
    lat: 28.1875,
    lng: -81.7450,
  },
  airport: {
    name: "Orlando International Airport",
    address: "1 Jeff Fuqua Boulevard, Orlando, FL 32827",
    lat: 28.4312,
    lng: -81.3089,
  },
};

export type ParkKey = keyof typeof THEME_PARKS;

/**
 * Calculate distance from an address to a theme park using Google Maps Directions API
 * Returns distance in miles and estimated driving time in minutes
 */
export async function calculateDistanceToThemePark(
  address: string,
  parkKey: ParkKey
): Promise<{ distance: number; minutes: number } | null> {
  try {
    const park = THEME_PARKS[parkKey];
    
    const result = await makeRequest<DirectionsResult>(
      "/maps/api/directions/json",
      {
        origin: address,
        destination: park.address,
        mode: "driving",
      }
    );

    if (!result || !result.routes || result.routes.length === 0) {
      return null;
    }

    const route = result.routes[0];
    const leg = route.legs[0];

    // Extract distance in miles and duration in minutes
    const distanceValue = leg.distance?.value || 0; // meters
    const durationValue = leg.duration?.value || 0; // seconds

    // Convert meters to miles (1 meter = 0.000621371 miles)
    const distance = Math.round((distanceValue * 0.000621371) * 10) / 10;
    
    // Convert seconds to minutes
    const minutes = Math.round(durationValue / 60);

    return { distance, minutes };
  } catch (error) {
    console.error(`Failed to calculate distance to ${parkKey}:`, error);
    return null;
  }
}

/**
 * Calculate distances from an address to all theme parks
 * Returns object with park keys and their distances/times
 */
export async function calculateAllDistances(
  address: string
): Promise<Record<ParkKey, { distance: number; minutes: number } | null>> {
  const results: Record<ParkKey, { distance: number; minutes: number } | null> = {
    magicKingdom: null,
    universal: null,
    seaworld: null,
    legoland: null,
    airport: null,
  };

  try {
    // Calculate distances in parallel
    const [mk, us, sw, ll, ap] = await Promise.all([
      calculateDistanceToThemePark(address, "magicKingdom"),
      calculateDistanceToThemePark(address, "universal"),
      calculateDistanceToThemePark(address, "seaworld"),
      calculateDistanceToThemePark(address, "legoland"),
      calculateDistanceToThemePark(address, "airport"),
    ]);

    results.magicKingdom = mk;
    results.universal = us;
    results.seaworld = sw;
    results.legoland = ll;
    results.airport = ap;
  } catch (error) {
    console.error("Failed to calculate all distances:", error);
  }

  return results;
}

/**
 * Format distance for display
 * e.g., { distance: 15.2, minutes: 25 } -> "15 mi, 25 mins"
 */
export function formatDistance(data: { distance: number; minutes: number } | null): string | null {
  if (!data) return null;
  return `${Math.round(data.distance)} mi, ${data.minutes} mins`;
}
