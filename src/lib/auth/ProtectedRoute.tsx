import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/auth/useAuth";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "user" | "admin";
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const location = useLocation();
  const { user, isLoading, isUser, isAdmin } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  if (requiredRole && ((requiredRole === "user" && !isUser) || (requiredRole === "admin" && !isAdmin))) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
}