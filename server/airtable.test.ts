import { describe, it, expect } from "vitest";
import { testAirtableConnection, fetchAirtableListings } from "./airtable";

describe("Airtable Integration", () => {
  it("should connect to Airtable successfully", async () => {
    const result = await testAirtableConnection();
    expect(result).toBe(true);
  });

  it("should fetch listings from Airtable", async () => {
    const listings = await fetchAirtableListings();
    expect(Array.isArray(listings)).toBe(true);
    expect(listings.length).toBeGreaterThan(0);
  });

  it("should have valid listing structure", async () => {
    const listings = await fetchAirtableListings();
    if (listings.length > 0) {
      const listing = listings[0];
      expect(listing).toHaveProperty("id");
      expect(listing).toHaveProperty("fields");
      expect(listing.fields).toHaveProperty("name");
    }
  });
});
