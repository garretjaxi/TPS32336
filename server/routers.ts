import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { shopRouter } from "./routers/shop";
import { adminRouter } from "./routers/admin";
import { bookingRouter } from "./routers/booking";
import { listingsRouter } from "./routers/listings";
import { vipRouter } from "./routers/vip";

export const appRouter = router({
  system: systemRouter,
  shop: shopRouter,
  admin: adminRouter,
  booking: bookingRouter,
  listings: listingsRouter,
  vip: vipRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
});

export type AppRouter = typeof appRouter;
