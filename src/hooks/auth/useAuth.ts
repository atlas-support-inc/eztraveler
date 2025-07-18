import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useAuthActions } from "@convex-dev/auth/react";

export function useAuth() {
  const user = useQuery(api.users.queries.getCurrentUser);
  const { signOut } = useAuthActions();

  return {
    user,
    isAuthenticated: !!user,
    isLoading: user === undefined,
    isUser: user?.role === "user",
    isAdmin: user?.role === "admin",
    signOut,
  };
}