import { mutation } from "../_generated/server";
import { v } from "convex/values";
import { requireAdmin } from "../auth/helpers";

export const createHotel = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    location: v.string(),
    pricePerNight: v.number(),
    imageUrls: v.array(v.string()),
    amenities: v.array(v.string()),
  },
  returns: v.id("hotels"),
  handler: async (ctx, args) => {
    await requireAdmin(ctx);

    const hotelId = await ctx.db.insert("hotels", {
      ...args,
    });

    return hotelId;
  },
});

export const updateHotel = mutation({
  args: {
    hotelId: v.id("hotels"),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    location: v.optional(v.string()),
    pricePerNight: v.optional(v.number()),
    imageUrls: v.optional(v.array(v.string())),
    amenities: v.optional(v.array(v.string())),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    const { hotelId, ...rest } = args;
    await ctx.db.patch(hotelId, rest);
    return null;
  },
});

export const deleteHotel = mutation({
  args: {
    hotelId: v.id("hotels"),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    await ctx.db.delete(args.hotelId);
    return null;
  },
});