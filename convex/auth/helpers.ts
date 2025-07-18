import { ConvexError } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";
import { QueryCtx, MutationCtx } from "../_generated/server"; // Adjust if your generated types are in a different path

type Context = QueryCtx | MutationCtx; // ActionCtx if you add actions later

export const requireAuth = async (ctx: Context) => {
  const userId = await getAuthUserId(ctx);
  if (!userId) {
    throw new ConvexError("Authentication required");
  }

  const user = await ctx.db.get(userId);
  if (!user || !user.isActive) {
    throw new ConvexError("User not found or inactive");
  }

  return user;
};

export const requireUser = async (ctx: Context) => {
  const user = await requireAuth(ctx);

  if (user.role !== "user") {
    throw new ConvexError("User access required");
  }

  return user;
};

export const requireAdmin = async (ctx: Context) => {
  const user = await requireAuth(ctx);

  if (user.role !== "admin") {
    throw new ConvexError("Admin access required");
  }

  return user;
};