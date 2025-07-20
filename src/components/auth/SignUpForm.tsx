import { useState, useCallback } from "react";
import { useAuthActions } from "@convex-dev/auth/react";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardContent, CardFooter, Input, Label, Alert, AlertDescription, PasswordInput } from "@/components/ui";
import { Loader2, Mail, User, Lock, ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import type { PasswordValidation } from "@/lib/validators/password";

export function SignUpForm() {
  const { signIn } = useAuthActions();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordValidation, setPasswordValidation] = useState<PasswordValidation | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const validateForm = () => {
    const errors: {
      name?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};
    
    if (!name.trim()) {
      errors.name = "Full name is required";
    } else if (name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters";
    }
    
    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Please enter a valid email";
    }
    
    if (!password) {
      errors.password = "Password is required";
    } else if (passwordValidation && !passwordValidation.isValid) {
      errors.password = "Password doesn't meet security requirements";
    }
    
    if (!confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
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
      await signIn("password", { flow: "signUp", name: name.trim(), email, password, role: "user" });
      navigate("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create account");
    } finally {
      setIsLoading(false);
    }
  };

  const clearFieldError = (field: string) => {
    setFieldErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const handlePasswordValidation = useCallback((validation: PasswordValidation) => {
    setPasswordValidation(validation);
  }, []);

  return (
    <Card className="w-full shadow-xl border-0 bg-card/80 backdrop-blur-sm">
      
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          {error && (
            <Alert variant="destructive" className="animate-in slide-in-from-top-2 duration-300">
              <AlertDescription className="font-medium">{error}</AlertDescription>
            </Alert>
          )}

          {/* Name Field */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Full Name
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-4 w-4 text-muted-foreground" />
              </div>
              <Input
                id="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  clearFieldError('name');
                }}
                className={`pl-10 transition-all duration-200 ${
                  fieldErrors.name 
                    ? 'border-destructive focus:border-destructive focus:ring-destructive/20' 
                    : 'focus:ring-primary/20'
                }`}
                placeholder="John Doe"
                required
                aria-describedby={fieldErrors.name ? "name-error" : undefined}
              />
            </div>
            {fieldErrors.name && (
              <p id="name-error" className="text-sm text-destructive animate-in slide-in-from-top-1 duration-200">
                {fieldErrors.name}
              </p>
            )}
          </div>

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

          {/* Password Field with Strength Indicator */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium">
              Password
            </Label>
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
                onValidationChange={handlePasswordValidation}
                showStrengthIndicator={true}
                className={`pl-10 ${
                  fieldErrors.password 
                    ? 'border-destructive focus:border-destructive focus:ring-destructive/20' 
                    : 'focus:ring-primary/20'
                }`}
                placeholder="Create a strong password"
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

          {/* Confirm Password Field */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-sm font-medium">
              Confirm Password
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                <Lock className="h-4 w-4 text-muted-foreground" />
              </div>
              <PasswordInput
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  clearFieldError('confirmPassword');
                }}
                className={`pl-10 ${
                  fieldErrors.confirmPassword 
                    ? 'border-destructive focus:border-destructive focus:ring-destructive/20' 
                    : password && confirmPassword && password === confirmPassword 
                      ? 'border-green-500 focus:border-green-500 focus:ring-green-500/20'
                      : 'focus:ring-primary/20'
                }`}
                placeholder="Confirm your password"
                required
                aria-describedby={fieldErrors.confirmPassword ? "confirm-password-error" : undefined}
              />
              {password && confirmPassword && password === confirmPassword && (
                <div className="absolute inset-y-0 right-12 flex items-center">
                  <Check className="h-4 w-4 text-green-500" />
                </div>
              )}
            </div>
            {fieldErrors.confirmPassword && (
              <p id="confirm-password-error" className="text-sm text-destructive animate-in slide-in-from-top-1 duration-200">
                {fieldErrors.confirmPassword}
              </p>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4 pt-6">
          {/* Create Account Button */}
          <Button 
            type="submit" 
            className="w-full h-11 font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]" 
            disabled={isLoading || (passwordValidation?.isValid === false)}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating account...
              </>
            ) : (
              <>
                Create account
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>

          {/* Sign In Link */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link 
                to="/sign-in" 
                className="text-primary hover:text-primary/80 font-medium transition-colors hover:underline"
              >
                Sign in instead
              </Link>
            </p>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}