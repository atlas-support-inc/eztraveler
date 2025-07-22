import { query } from "../_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";
import { requireAdmin } from "../auth/helpers";

export const getCurrentUser = query({
  args: {},
  returns: v.union(
    v.null(),
    v.object({
      _id: v.id("users"),
      email: v.string(),
      name: v.string(),
      role: v.union(v.literal("user"), v.literal("admin")),
      isActive: v.boolean(),
      emailVerified: v.boolean(),
    })
  ),
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return null;
    }

    const user = await ctx.db.get(userId);
    if (!user || !user.isActive) {
      return null;
    }

    return {
      _id: user._id,
      email: user.email!,
      name: user.name!,
      role: user.role as "user" | "admin",
      isActive: user.isActive,
      emailVerified: user.emailVerified || false,
    };
  },
});

export const searchUsers = query({
  args: {
    searchText: v.string(),
  },
  returns: v.array(
    v.object({
      _id: v.id("users"),
      email: v.string(),
      name: v.string(),
      role: v.union(v.literal("user"), v.literal("admin")),
    })
  ),
  handler: async (ctx, args) => {
    await requireAdmin(ctx); // Only admins can search for users

    const users = await ctx.db
      .query("users")
      .withSearchIndex("by_email_search", (q) =>
        q.search("email", args.searchText)
      )
      .collect();

    return users.map((user) => ({
      _id: user._id,
      email: user.email!,
      name: user.name!,
      role: user.role as "user" | "admin",
    }));
  },
});