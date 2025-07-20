import React, { useState, forwardRef, useMemo } from "react";
import { Eye, EyeOff, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Input } from "./input";
import { validatePassword, getPasswordStrengthColor, type PasswordValidation } from "@/lib/validators/password";

interface PasswordInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  showStrengthIndicator?: boolean;
  onValidationChange?: (validation: PasswordValidation) => void;
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, showStrengthIndicator = false, onValidationChange, value = "", ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const validation = useMemo(() => validatePassword(value.toString()), [value]);

    React.useEffect(() => {
      if (onValidationChange) {
        onValidationChange(validation);
      }
    }, [validation.score, validation.strength, validation.isValid, onValidationChange]);

    return (
      <div className="space-y-2">
        <div className="relative">
          <Input
            ref={ref}
            type={showPassword ? "text" : "password"}
            className={cn("pr-10", className)}
            value={value}
            {...props}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Eye className="h-4 w-4 text-muted-foreground" />
            )}
            <span className="sr-only">
              {showPassword ? "Hide password" : "Show password"}
            </span>
          </Button>
        </div>

        {showStrengthIndicator && value && (
          <div className="space-y-2">
            {/* Strength bar */}
            <div className="flex items-center space-x-2">
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={cn(
                    "h-full transition-all duration-300 ease-in-out rounded-full",
                    getPasswordStrengthColor(validation.strength)
                  )}
                  style={{ width: `${validation.score}%` }}
                />
              </div>
              <span className="text-xs font-medium text-muted-foreground capitalize min-w-12">
                {validation.strength}
              </span>
            </div>

            {/* Requirements checklist */}
            {validation.feedback.length > 0 && (
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Password must include:</p>
                <div className="grid grid-cols-1 gap-1">
                  {[
                    "At least 8 characters",
                    "One uppercase letter",
                    "One lowercase letter", 
                    "One number",
                    "One special character"
                  ].map((requirement) => {
                    const isComplete = !validation.feedback.includes(requirement);
                    return (
                      <div key={requirement} className="flex items-center space-x-1">
                        {isComplete ? (
                          <Check className="h-3 w-3 text-green-500" />
                        ) : (
                          <X className="h-3 w-3 text-muted-foreground" />
                        )}
                        <span
                          className={cn(
                            "text-xs",
                            isComplete ? "text-green-600 dark:text-green-400" : "text-muted-foreground"
                          )}
                        >
                          {requirement}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export { PasswordInput }; 