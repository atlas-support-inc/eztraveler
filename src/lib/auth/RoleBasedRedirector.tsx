import { useAuth } from "@/hooks/auth/useAuth";
import { Navigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

export function RoleBasedRedirector() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/sign-in" replace />;
  }

  if (user.role === "admin") {
    return <Navigate to="/admin" replace />;
  }

  if (user.role === "user") {
    return <Navigate to="/dashboard" replace />;
  }

  return <Navigate to="/sign-in" replace />;
}