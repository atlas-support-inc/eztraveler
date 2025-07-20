import type { ReactNode } from "react";

export function AuthLayout({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background/95 to-muted/20 p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-lg">
        {/* Header Section with improved spacing and typography */}
        <div className="text-center space-y-6 mb-8">
          {/* Logo with better styling */}
          <div className="flex justify-center">
            <div className="relative">
              <img
                src="/logo.svg"
                alt="EZTraveler Logo"
                className="h-12 w-auto sm:h-16 transition-transform duration-200 hover:scale-105"
              />
              <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl -z-10 opacity-50" />
            </div>
          </div>
          
          {/* Title with improved typography */}
          <div className="space-y-3">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground leading-tight">
              {title}
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-md mx-auto">
              {subtitle}
            </p>
          </div>
        </div>

        {/* Form Section with improved container */}
        <div className="relative">
          {/* Subtle background glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl blur-3xl" />
          
          {/* Main content */}
          <div className="relative">
            {children}
          </div>
        </div>

        {/* Footer Section */}
        <div className="text-center mt-8 pt-6 border-t border-border/50">
          <p className="text-xs text-muted-foreground">
            Secure authentication powered by{" "}
            <span className="text-primary font-medium">EZTraveler</span>
          </p>
        </div>
      </div>
    </div>
  );
} 