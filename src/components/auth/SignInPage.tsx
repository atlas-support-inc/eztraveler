import { SignInForm } from "@/components/auth/SignInForm";
import { AuthLayout } from "@/components/auth/AuthLayout";

export function SignInPage() {
  return (
    <AuthLayout
      title="Welcome Back to EZTraveler"
      subtitle="Sign in to access your dashboard and bookings"
    >
      <SignInForm />
    </AuthLayout>
  );
} 