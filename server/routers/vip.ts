import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { signupVIPSubscriber, getAllVIPSubscribers } from "../db";

export const vipRouter = router({
  signup: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .mutation(async ({ input }) => {
      try {
        const subscriber = await signupVIPSubscriber(input.email);
        return {
          success: true,
          message: "Successfully signed up for VIP list",
          subscriber,
        };
      } catch (error) {
        console.error("[VIP Router] Signup error:", error);
        throw error;
      }
    }),

  getAll: publicProcedure
    .query(async () => {
      try {
        const subscribers = await getAllVIPSubscribers();
        return subscribers;
      } catch (error) {
        console.error("[VIP Router] Get all error:", error);
        throw error;
      }
    }),
});
