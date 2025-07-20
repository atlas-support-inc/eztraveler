import { useAuth } from "@/hooks/auth/useAuth";

export function HomePage() {
  const { user } = useAuth();
  return (
    <div>
      <h1>
        Welcome, {user?.name} ({user?.role})!
      </h1>
    </div>
  );
} 