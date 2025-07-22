import { query } from "../_generated/server";
import { v } from "convex/values";
import { requireUser, requireAdmin } from "../auth/helpers";

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

export const listAll = query({
  args: {
    search: v.optional(v.string()),
  },
  returns: v.array(
    v.object({
      _id: v.id("bookings"),
      _creationTime: v.number(),
      userId: v.id("users"),
      hotelId: v.id("hotels"),
      hotelName: v.string(),
      checkIn: v.string(),
      checkOut: v.string(),
      guests: v.number(),
      rooms: v.number(),
      totalAmount: v.number(),
      status: v.union(
        v.literal("pending"),
        v.literal("confirmed"),
        v.literal("cancelled"),
        v.literal("completed")
      ),
      paymentId: v.optional(v.string()),
      notes: v.optional(v.string()),
      createdAt: v.number(),
      updatedAt: v.number(),
      userEmail: v.string(),
      userName: v.string(),
    })
  ),
  handler: async (ctx, args) => {
    await requireAdmin(ctx);

    const users = args.search && args.search.length > 0
      ? await ctx.db
          .query("users")
          .withSearchIndex("by_email_search", (q) =>
            q.search("email", args.search as string)
          )
          .collect()
      : [];
    
    const userIds = users.map((user) => user._id);
    const bookingsData = []

    for (const user of users) {
      const booking = await ctx.db
        .query("bookings")
        .withIndex("by_user", (q) => q.eq("userId", user._id))
        .collect();

      for (const b of booking) {
        bookingsData.push({
          ...b,
          userEmail: user.email || "N/A",
          userName: user.name || "N/A",
        });
      }
    }

    return bookingsData;
  },
});