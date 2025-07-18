import { SignUpForm } from "@/components/auth/SignUpForm";
import { AuthLayout } from "@/components/auth/AuthLayout";

export function SignUpPage() {
  return (
    <AuthLayout
      title="Join EZTraveler and Start Your Journey"
      subtitle="Create your account to begin booking seamless trips"
    >
      <SignUpForm />
    </AuthLayout>
  );
} 