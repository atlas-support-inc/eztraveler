import { useState } from "react";
import { useAuthActions } from "@convex-dev/auth/react";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardContent, CardFooter, Input, Label, Alert, AlertDescription, PasswordInput } from "@/components/ui";
import { Loader2, Mail, Lock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function SignInForm() {
  const { signIn } = useAuthActions();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{email?: string; password?: string}>({});

  const validateForm = () => {
    const errors: {email?: string; password?: string} = {};
    
    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Please enter a valid email";
    }
    
    if (!password) {
      errors.password = "Password is required";
    }
    
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await signIn("password", { flow: "signIn", email, password });
      navigate("/redirect");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to sign in");
    } finally {
      setIsLoading(false);
    }
  };

  const clearFieldError = (field: string) => {
    setFieldErrors(prev => ({ ...prev, [field]: undefined }));
  };

  return (
    <Card className="w-full shadow-xl border-0 bg-card/80 backdrop-blur-sm">
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          {error && (
            <Alert variant="destructive" className="animate-in slide-in-from-top-2 duration-300">
              <AlertDescription className="font-medium">{error}</AlertDescription>
            </Alert>
          )}

          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email address
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-4 w-4 text-muted-foreground" />
              </div>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  clearFieldError('email');
                }}
                className={`pl-10 transition-all duration-200 ${
                  fieldErrors.email 
                    ? 'border-destructive focus:border-destructive focus:ring-destructive/20' 
                    : 'focus:ring-primary/20'
                }`}
                placeholder="you@example.com"
                required
                aria-describedby={fieldErrors.email ? "email-error" : undefined}
              />
            </div>
            {fieldErrors.email && (
              <p id="email-error" className="text-sm text-destructive animate-in slide-in-from-top-1 duration-200">
                {fieldErrors.email}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <Link 
                to="/forgot-password" 
                className="text-sm text-primary hover:text-primary/80 transition-colors"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                <Lock className="h-4 w-4 text-muted-foreground" />
              </div>
              <PasswordInput
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  clearFieldError('password');
                }}
                className={`pl-10 ${
                  fieldErrors.password 
                    ? 'border-destructive focus:border-destructive focus:ring-destructive/20' 
                    : 'focus:ring-primary/20'
                }`}
                placeholder="Enter your password"
                required
                aria-describedby={fieldErrors.password ? "password-error" : undefined}
              />
            </div>
            {fieldErrors.password && (
              <p id="password-error" className="text-sm text-destructive animate-in slide-in-from-top-1 duration-200">
                {fieldErrors.password}
              </p>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4 pt-6">
          {/* Sign In Button */}
          <Button 
            type="submit" 
            className="w-full h-11 font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]" 
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                Sign in
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link 
                to="/sign-up" 
                className="text-primary hover:text-primary/80 font-medium transition-colors hover:underline"
              >
                Create one now
              </Link>
            </p>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}