import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { publicProcedure, router, adminProcedure } from "../_core/trpc";
import { createBookingInquiry, getAllBookingInquiries } from "../db";
import { sendEmail } from "../_core/email";
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

        // Notify owner via email
        const emailSubject = `New Booking Inquiry: ${input.propertyName || "General"}`;
        const emailHtml = `
          <p>Dear Admin,</p>
          <p>A new booking inquiry has been submitted:</p>
          <ul>
            <li><b>Property Name:</b> ${input.propertyName || "N/A"}</li>
            <li><b>Guest Name:</b> ${input.guestName}</li>
            <li><b>Guest Email:</b> ${input.guestEmail}</li>
            <li><b>Guest Phone:</b> ${input.guestPhone || "N/A"}</li>
            <li><b>Check-in:</b> ${input.checkIn || "TBD"}</li>
            <li><b>Check-out:</b> ${input.checkOut || "TBD"}</li>
            <li><b>Guests:</b> ${input.guests}</li>
            <li><b>Message:</b> ${input.message || "N/A"}</li>
          </ul>
          <p>Please log in to the admin panel to view more details.</p>
        `;
        // Send notification email to admin — non-blocking so a missing SMTP config never crashes the submission
        sendEmail("admin@themeparkstays.com", emailSubject, emailHtml).catch((err) =>
          console.warn("[Booking] Email notification failed (non-fatal):", err)
        );

        // Manus platform notification — non-blocking; only works when BUILT_IN_FORGE_API_URL is configured
        notifyOwner({
          title: emailSubject,
          content: `${input.guestName} (${input.guestEmail}) has submitted a booking inquiry${input.propertyName ? ` for ${input.propertyName}` : ""}. Check-in: ${input.checkIn || "TBD"}, Check-out: ${input.checkOut || "TBD"}, Guests: ${input.guests}.`,
        }).catch((err) =>
          console.warn("[Booking] Owner notification failed (non-fatal):", err)
        );

        return { success: true, inquiryId: inquiry.id };
      } catch (error) {
        console.error("[Booking] Failed to submit inquiry:", error);
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to submit inquiry" });
      }
    }),

  /**
   * Get all booking inquiries (Admin only)
   */
  getInquiries: adminProcedure
    .query(async () => {
      try {
        return await getAllBookingInquiries();
      } catch (error) {
        console.error("[Booking] Failed to get inquiries:", error);
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to get inquiries" });
      }
    }),
});
