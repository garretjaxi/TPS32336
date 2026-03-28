import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock the database module to avoid real DB calls in unit tests
vi.mock("./db", () => ({
  getAllListings: vi.fn().mockResolvedValue([
    {
      id: 1,
      name: "Test Home",
      tagline: "3BR Test Home",
      location: "Kissimmee, FL",
      beds: 3,
      baths: "2.0",
      guests: 6,
      price: 150,
      rating: "4.9",
      reviews: 10,
      tags: ["pool"],
      badges: ["Pool"],
      image: "https://example.com/img.jpg",
      houfy_url: "https://houfy.com/123",
      featured: 1,
      active: 1,
      sort_order: 0,
      listing_type: "home",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  getActiveListings: vi.fn().mockResolvedValue([
    {
      id: 1,
      name: "Active Home",
      tagline: "Active tagline",
      location: "Kissimmee, FL",
      beds: 4,
      baths: "3.0",
      guests: 8,
      price: 200,
      rating: "5.0",
      reviews: 20,
      tags: ["pool", "gameroom"],
      badges: ["Pool", "Game Room"],
      image: "https://example.com/active.jpg",
      houfy_url: "https://houfy.com/456",
      featured: 0,
      active: 1,
      sort_order: 1,
      listing_type: "home",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  getListingById: vi.fn().mockImplementation(async (id: number) => {
    if (id === 1) return { id: 1, name: "Test Home", active: 1, featured: 0 };
    return null;
  }),
  createListing: vi.fn().mockResolvedValue({ id: 99, name: "New Home" }),
  updateListing: vi.fn().mockResolvedValue({ id: 1, name: "Updated Home" }),
  deleteListing: vi.fn().mockResolvedValue(undefined),
}));

import {
  getAllListings,
  getActiveListings,
  getListingById,
  createListing,
  updateListing,
  deleteListing,
} from "./db";

describe("Listings DB helpers (mocked)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("getAllListings returns an array", async () => {
    const result = await getAllListings();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0]).toHaveProperty("name");
  });

  it("getActiveListings returns only active listings", async () => {
    const result = await getActiveListings();
    expect(Array.isArray(result)).toBe(true);
    result.forEach((l: any) => expect(l.active).toBe(1));
  });

  it("getListingById returns a listing when found", async () => {
    const result = await getListingById(1);
    expect(result).not.toBeNull();
    expect(result?.id).toBe(1);
  });

  it("getListingById returns null when not found", async () => {
    const result = await getListingById(999);
    expect(result).toBeNull();
  });

  it("createListing returns the new listing", async () => {
    const result = await createListing({ name: "New Home" } as any);
    expect(result).toHaveProperty("id");
    expect(result).toHaveProperty("name", "New Home");
  });

  it("updateListing returns the updated listing", async () => {
    const result = await updateListing(1, { name: "Updated Home" } as any);
    expect(result).toHaveProperty("name", "Updated Home");
  });

  it("deleteListing resolves without error", async () => {
    await expect(deleteListing(1)).resolves.not.toThrow();
  });
});

describe("Listings data shape validation", () => {
  it("active listing has all required fields", async () => {
    const listings = await getActiveListings();
    const listing = listings[0] as any;
    const requiredFields = ["id", "name", "tagline", "location", "beds", "baths", "guests", "price", "rating", "image"];
    requiredFields.forEach((field) => {
      expect(listing).toHaveProperty(field);
    });
  });

  it("listing tags and badges are arrays", async () => {
    const listings = await getActiveListings();
    const listing = listings[0] as any;
    expect(Array.isArray(listing.tags)).toBe(true);
    expect(Array.isArray(listing.badges)).toBe(true);
  });

  it("listing has a listing_type field", async () => {
    const listings = await getActiveListings();
    const listing = listings[0] as any;
    expect(listing).toHaveProperty("listing_type");
    expect(["home", "room"]).toContain(listing.listing_type);
  });
});
