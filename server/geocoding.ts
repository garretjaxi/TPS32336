/**
 * Geocoding Module
 * Converts property addresses to latitude/longitude coordinates using Google Maps API
 */

import { makeRequest } from "./_core/map";

export interface GeocodingResult {
  lat: number;
  lng: number;
  formattedAddress: string;
}

/**
 * Geocode an address to latitude/longitude using Google Maps Geocoding API
 * @param address - Full address string (e.g., "1750 Sawyer Palm Pl, Kissimmee, FL 34747")
 * @returns Object with lat, lng, and formatted address, or null if geocoding fails
 */
export async function geocodeAddress(
  address: string
): Promise<GeocodingResult | null> {
  try {
    const response = await makeRequest<{
      results: Array<{
        geometry: { location: { lat: number; lng: number } };
        formatted_address: string;
      }>;
      status: string;
    }>("/maps/api/geocode/json", {
      address: address,
    });

    if (response.results && response.results.length > 0) {
      const result = response.results[0];
      const location = result.geometry.location;

      return {
        lat: location.lat,
        lng: location.lng,
        formattedAddress: result.formatted_address,
      };
    }

    return null;
  } catch (error) {
    console.error(`Geocoding error for address "${address}":`, error);
    return null;
  }
}

/**
 * Batch geocode multiple addresses
 * @param addresses - Array of address strings
 * @returns Array of geocoding results in the same order as input
 */
export async function geocodeAddresses(
  addresses: string[]
): Promise<(GeocodingResult | null)[]> {
  const results = await Promise.all(addresses.map((addr) => geocodeAddress(addr)));
  return results;
}
