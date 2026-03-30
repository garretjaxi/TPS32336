/**
 * Distance Calculator Utility
 * Calculates approximate driving times between vacation rental properties and theme parks
 */

// Theme park coordinates in Orlando area
export const THEME_PARKS = {
  magicKingdom: {
    name: "Magic Kingdom",
    lat: 28.4172,
    lng: -81.5812,
    icon: "🏰",
  },
  universal: {
    name: "Universal Studios",
    lat: 28.4735,
    lng: -81.4691,
    icon: "🎬",
  },
  seaworld: {
    name: "SeaWorld Orlando",
    lat: 28.4145,
    lng: -81.4602,
    icon: "🌊",
  },
  legoland: {
    name: "LEGOLAND Florida",
    lat: 28.1875,
    lng: -81.7450,
    icon: "🧱",
  },
} as const;

export type ParkKey = keyof typeof THEME_PARKS;

// Property location coordinates (extracted from known addresses in Kissimmee area)
export const PROPERTY_COORDINATES: Record<string, { lat: number; lng: number }> = {
  // Kissimmee area properties
  "Kissimmee, FL": { lat: 28.2917, lng: -81.4139 },
  // Davenport area properties
  "Davenport, FL": { lat: 28.1133, lng: -81.5833 },
  // Clermont area properties
  "Clermont, FL": { lat: 28.5495, lng: -81.7742 },
  // Winter Garden area properties
  "Winter Garden, FL": { lat: 28.5545, lng: -81.5667 },
  // Winter Park area properties
  "Winter Park, FL": { lat: 28.5954, lng: -81.3340 },
  // Windermere area properties
  "Windermere, FL": { lat: 28.4667, lng: -81.4667 },
  // Orlando area properties
  "Orlando, FL": { lat: 28.5383, lng: -81.3792 },
  // WinterGarden (alternative spelling)
  "WinterGarden Fl": { lat: 28.5545, lng: -81.5667 },
};

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
 * Uses Orlando traffic patterns: ~50 mph average
 */
function estimateDrivingTime(distanceMiles: number): number {
  // Orlando average speed with traffic: 50 mph
  const averageSpeed = 50;
  return Math.round((distanceMiles / averageSpeed) * 60); // Returns minutes
}

/**
 * Get property coordinates from location string
 */
export function getPropertyCoordinates(
  location: string
): { lat: number; lng: number } | null {
  // Try exact match first
  if (PROPERTY_COORDINATES[location]) {
    return PROPERTY_COORDINATES[location];
  }

  // Try partial match (e.g., "Kissimmee, FL — 8 mi to Disney" -> "Kissimmee, FL")
  for (const [key, coords] of Object.entries(PROPERTY_COORDINATES)) {
    if (location.includes(key)) {
      return coords;
    }
  }

  return null;
}

/**
 * Calculate driving time from a property to a specific theme park
 * Returns formatted string like "15 mins to Magic Kingdom"
 */
export function calculateDrivingTime(
  propertyLocation: string,
  parkKey: ParkKey
): string | null {
  const propertyCoords = getPropertyCoordinates(propertyLocation);
  if (!propertyCoords) return null;

  const park = THEME_PARKS[parkKey];
  const distanceMiles = haversineDistance(
    propertyCoords.lat,
    propertyCoords.lng,
    park.lat,
    park.lng
  );

  const drivingMinutes = estimateDrivingTime(distanceMiles);
  return `${drivingMinutes} mins to ${park.name}`;
}

/**
 * Get all driving times for a property to all theme parks
 * Returns object with park keys and driving times
 */
export function getAllDrivingTimes(
  propertyLocation: string
): Record<ParkKey, string | null> {
  return {
    magicKingdom: calculateDrivingTime(propertyLocation, "magicKingdom"),
    universal: calculateDrivingTime(propertyLocation, "universal"),
    seaworld: calculateDrivingTime(propertyLocation, "seaworld"),
    legoland: calculateDrivingTime(propertyLocation, "legoland"),
  };
}

/**
 * Find the closest park to a property
 * Returns the park key
 */
export function getClosestPark(propertyLocation: string): ParkKey | null {
  const propertyCoords = getPropertyCoordinates(propertyLocation);
  if (!propertyCoords) return null;

  let closestPark: ParkKey = "magicKingdom";
  let minDistance = Infinity;

  for (const [parkKey, park] of Object.entries(THEME_PARKS)) {
    const distance = haversineDistance(
      propertyCoords.lat,
      propertyCoords.lng,
      park.lat,
      park.lng
    );
    if (distance < minDistance) {
      minDistance = distance;
      closestPark = parkKey as ParkKey;
    }
  }

  return closestPark;
}
