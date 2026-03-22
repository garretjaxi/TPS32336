import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { publicProcedure, router } from "../_core/trpc";
import { createBookingInquiry } from "../db";
import { notifyOwner } from "../_core/notification";

export const bookingRouter = router({
  /**
   * Submit a booking inquiry
   */
  submitInquiry: publicProcedure
    .input(
      z.object({
        propertyName: z.string().optional(),
        guestName: z.string().min(1),
        guestEmail: z.string().email(),
        guestPhone: z.string().optional(),
        checkIn: z.string().optional(),
        checkOut: z.string().optional(),
        guests: z.number().int().positive().default(1),
        message: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const inquiry = await createBookingInquiry({
          propertyName: input.propertyName,
          guestName: input.guestName,
          guestEmail: input.guestEmail,
          guestPhone: input.guestPhone,
          checkIn: input.checkIn,
          checkOut: input.checkOut,
          guests: input.guests,
          message: input.message,
          status: "new",
        });

        // Notify owner
        await notifyOwner({
          title: "New Booking Inquiry",
          content: `${input.guestName} (${input.guestEmail}) has submitted a booking inquiry${input.propertyName ? ` for ${input.propertyName}` : ""}. Check-in: ${input.checkIn || "TBD"}, Check-out: ${input.checkOut || "TBD"}, Guests: ${input.guests}.`,
        });

        return { success: true, inquiryId: inquiry.id };
      } catch (error) {
        console.error("[Booking] Failed to submit inquiry:", error);
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to submit inquiry" });
      }
    }),
});
