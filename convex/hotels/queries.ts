import { query } from "../_generated/server";
import { v } from "convex/values";

export const listHotels = query({
  args: {},
  returns: v.array(
    v.object({
      _id: v.id("hotels"),
      _creationTime: v.number(),
      name: v.string(),
      description: v.string(),
      location: v.string(),
      pricePerNight: v.number(),
      imageUrls: v.array(v.string()),
      amenities: v.array(v.string()),
    })
  ),
  handler: async (ctx) => {
    return await ctx.db.query("hotels").collect();
  },
});

export const getHotel = query({
  args: {
    hotelId: v.id("hotels"),
  },
  returns: v.union(
    v.null(),
    v.object({
      _id: v.id("hotels"),
      _creationTime: v.number(),
      name: v.string(),
      description: v.string(),
      location: v.string(),
      pricePerNight: v.number(),
      imageUrls: v.array(v.string()),
      amenities: v.array(v.string()),
    })
  ),
  handler: async (ctx, args) => {
    return await ctx.db.get(args.hotelId);
  },
});