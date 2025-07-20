import { query } from "../_generated/server";
import { v } from "convex/values";
import { requireUser } from "../auth/helpers";

export const listMyBookings = query({
  args: {},
  returns: v.array(
    v.object({
      _id: v.id("bookings"),
      hotelName: v.string(),
      checkIn: v.string(),
      checkOut: v.string(),
      totalAmount: v.number(),
      status: v.string(),
    })
  ),
  handler: async (ctx) => {
    const user = await requireUser(ctx);

    const bookings = await ctx.db
      .query("bookings")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .order("desc")
      .collect();

    return bookings.map((booking) => ({
      _id: booking._id,
      hotelName: booking.hotelName,
      checkIn: booking.checkIn,
      checkOut: booking.checkOut,
      totalAmount: booking.totalAmount,
      status: booking.status,
    }));
  },
});