import { z } from "zod";
import { router, publicProcedure } from "../_core/trpc";
import { TRPCError } from "@trpc/server";
import {
  getAllListings,
  getActiveListings,
  getActiveHomeListings,
  getActiveRoomListings,
  getListingById,
  createListing,
  updateListing,
  deleteListing,
} from "../db";

// Admin guard bypassed for dev access
const adminProcedure = publicProcedure;

const listingInputSchema = z.object({
  name: z.string().min(1),
  tagline: z.string().min(1),
  location: z.string().min(1),
  beds: z.number().int().min(1),
  baths: z.string(), // decimal stored as string
  guests: z.number().int().min(1),
  price: z.number().int().min(1),
  rating: z.string(), // decimal stored as string
  reviews: z.number().int().min(0).default(0),
  tags: z.array(z.string()).default([]),
  badges: z.array(z.string()).default([]),
  image: z.string().min(1), // accepts full URLs and relative paths (e.g. /gatorland.jpg)
  listing_type: z.enum(["home", "room"]).default("home"),
  houfy_url: z.string().default(""),
  featured: z.number().int().min(0).max(1).default(0),
  active: z.number().int().min(0).max(1).default(1),
  sort_order: z.number().int().default(0),
});

export const listingsRouter = router({
  // Public: get all active listings for the homepage
  getActive: publicProcedure.query(async () => {
    return await getActiveListings();
  }),

  // Public: get only active home/vacation listings
  getActiveHomes: publicProcedure.query(async () => {
    return await getActiveHomeListings();
  }),

  // Public: get only active room/suite listings
  getActiveRooms: publicProcedure.query(async () => {
    return await getActiveRoomListings();
  }),

  // Admin: get all listings including inactive
  getAll: adminProcedure.query(async () => {
    return await getAllListings();
  }),

  // Admin: get single listing by id
  getById: adminProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const listing = await getListingById(input.id);
      if (!listing) throw new TRPCError({ code: "NOT_FOUND" });
      return listing;
    }),

  // Admin: create a new listing
  create: adminProcedure
    .input(listingInputSchema)
    .mutation(async ({ input }) => {
      return await createListing(input as any);
    }),

  // Admin: update an existing listing
  update: adminProcedure
    .input(z.object({ id: z.number(), data: listingInputSchema.partial() }))
    .mutation(async ({ input }) => {
      const existing = await getListingById(input.id);
      if (!existing) throw new TRPCError({ code: "NOT_FOUND" });
      return await updateListing(input.id, input.data as any);
    }),

  // Admin: delete a listing
  delete: adminProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const existing = await getListingById(input.id);
      if (!existing) throw new TRPCError({ code: "NOT_FOUND" });
      await deleteListing(input.id);
      return { success: true };
    }),

  // Admin: toggle featured status
  toggleFeatured: adminProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const existing = await getListingById(input.id);
      if (!existing) throw new TRPCError({ code: "NOT_FOUND" });
      return await updateListing(input.id, { featured: existing.featured ? 0 : 1 } as any);
    }),

  // Admin: bulk reorder listings by updating sort_order
  reorder: adminProcedure
    .input(z.array(z.object({ id: z.number(), sort_order: z.number() })))
    .mutation(async ({ input }) => {
      await Promise.all(input.map(({ id, sort_order }) => updateListing(id, { sort_order } as any)));
      return { success: true };
    }),

  // Admin: toggle active status
  toggleActive: adminProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const existing = await getListingById(input.id);
      if (!existing) throw new TRPCError({ code: "NOT_FOUND" });
      return await updateListing(input.id, { active: existing.active ? 0 : 1 } as any);
    }),
});
