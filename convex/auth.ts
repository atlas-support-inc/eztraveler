import { convexAuth } from "@convex-dev/auth/server";
import { Password } from "@convex-dev/auth/providers/Password";
import { ConvexError } from "convex/values";
import { z } from "zod";

// Email validation schema
const EmailSchema = z.string().email().toLowerCase();

// Password validation schema
const PasswordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character");

// Sign up params validation
const SignUpSchema = z.object({
  email: EmailSchema,
  password: PasswordSchema,
  name: z.string().min(2, "Name must be at least 2 characters"),
  role: z.enum(["user", "admin"]).default("user"),
  flow: z.literal("signUp"),
});

// Sign in params validation
const SignInSchema = z.object({
  email: EmailSchema,
  password: z.string(), // Don't validate password complexity for sign-in
  flow: z.literal("signIn"),
});

// Custom Password provider with validation and role support
const PasswordWithRole = Password({
  profile(params) {
    const flow = params.flow as string;
    
    if (flow === "signUp") {
      // Validate sign-up data
      const result = SignUpSchema.safeParse(params);
      if (!result.success) {
        throw new ConvexError(result.error.format());
      }
      const { email, name, role } = result.data;

      return {
        email,
        name,
        role,
        emailVerified: false,
        isActive: true,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
    } else if (flow === "signIn") {
      // For sign-in, validate the basic params
      const result = SignInSchema.safeParse(params);
      if (!result.success) {
        throw new ConvexError(result.error.format());
      }
      
      // Return profile with all required fields - the actual user data will be used from the database
      return {
        email: result.data.email,
        name: "", // This will be overridden by the actual user data
        role: "user" as const,
        emailVerified: false,
        isActive: true,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
    } else {
      throw new ConvexError(`Unsupported flow: ${flow}`);
    }
  },

  validatePasswordRequirements(password: string) {
    const result = PasswordSchema.safeParse(password);
    if (!result.success) {
      throw new ConvexError(result.error.message);
    }
  },
});

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [PasswordWithRole],
});