import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

export default defineSchema({
  ...authTables,
  users: defineTable({
    // Email and password are handled by auth tables
    email: v.optional(v.string()),
    name: v.optional(v.string()),
    role: v.optional(v.union(v.literal("user"), v.literal("admin"))),
    isActive: v.optional(v.boolean()),
    emailVerified: v.optional(v.boolean()),

    // Profile fields
    phoneNumber: v.optional(v.string()),
    profileImage: v.optional(v.string()),

    // Timestamps - these are optional because auth system creates users
    createdAt: v.optional(v.number()),
    updatedAt: v.optional(v.number()),
  })
    .index("by_email", ["email"])
    .index("by_role", ["role"]),

  hotels: defineTable({
    name: v.string(),
    description: v.string(),
    location: v.string(),
    pricePerNight: v.number(),
    imageUrls: v.array(v.string()),
    amenities: v.array(v.string()),
  }),

  bookings: defineTable({
    userId: v.id("users"),
    hotelId: v.id("hotels"),
    hotelName: v.string(),
    checkIn: v.string(), // ISO date string
    checkOut: v.string(), // ISO date string
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
  })
    .index("by_user", ["userId"])
    .index("by_status", ["status"])
    .index("by_user_and_status", ["userId", "status"]),
});