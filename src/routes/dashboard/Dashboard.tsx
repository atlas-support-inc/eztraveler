import { useAuth } from "@/hooks/auth/useAuth";

export function Dashboard() {
  const { user, signOut } = useAuth();

  return (
    <div className="p-4">
      <h1>Welcome, {user?.name} ({user?.role})!</h1>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
}