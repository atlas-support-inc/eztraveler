import { mutation } from "../_generated/server";
import { v } from "convex/values";
import { requireUser, requireAdmin } from "../auth/helpers";
import { ConvexError } from "convex/values";

export const createBooking = mutation({
  args: {
    hotelId: v.id("hotels"),
    checkIn: v.string(),
    checkOut: v.string(),
    guests: v.number(),
    rooms: v.number(),
  },
  returns: v.id("bookings"),
  handler: async (ctx, args) => {
    const user = await requireUser(ctx);

    const hotel = await ctx.db.get(args.hotelId);
    if (!hotel) {
      throw new ConvexError("Hotel not found");
    }

    const checkInDate = new Date(args.checkIn);
    const checkOutDate = new Date(args.checkOut);
    const durationMs = checkOutDate.getTime() - checkInDate.getTime();
    const nights = Math.ceil(durationMs / (1000 * 60 * 60 * 24));

    if (nights <= 0) {
      throw new ConvexError("Check-out date must be after check-in date.");
    }

    const totalAmount = nights * hotel.pricePerNight * args.rooms;

    const bookingId = await ctx.db.insert("bookings", {
      userId: user._id,
      hotelId: args.hotelId,
      hotelName: hotel.name,
      checkIn: args.checkIn,
      checkOut: args.checkOut,
      guests: args.guests,
      rooms: args.rooms,
      totalAmount,
      status: "confirmed",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return bookingId;
  },
});

export const cancelBooking = mutation({
  args: {
    bookingId: v.id("bookings"),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    await requireAdmin(ctx);

    await ctx.db.patch(args.bookingId, {
      status: "cancelled",
      updatedAt: Date.now(),
    });

    return null;
  },
});

export const updateBookingDetails = mutation({
  args: {
    bookingId: v.id("bookings"),
    checkIn: v.string(),
    checkOut: v.string(),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    await requireAdmin(ctx);

    const booking = await ctx.db.get(args.bookingId);
    if (!booking) {
      throw new ConvexError("Booking not found");
    }

    const hotel = await ctx.db.get(booking.hotelId);
    if (!hotel) {
      throw new ConvexError("Hotel not found");
    }

    const checkInDate = new Date(args.checkIn);
    const checkOutDate = new Date(args.checkOut);
    const durationMs = checkOutDate.getTime() - checkInDate.getTime();
    const nights = Math.ceil(durationMs / (1000 * 60 * 60 * 24));

    if (nights <= 0) {
      throw new ConvexError("Check-out date must be after check-in date.");
    }

    const totalAmount = nights * hotel.pricePerNight * booking.rooms;

    await ctx.db.patch(args.bookingId, {
      checkIn: args.checkIn,
      checkOut: args.checkOut,
      totalAmount,
      updatedAt: Date.now(),
    });

    return null;
  },
});