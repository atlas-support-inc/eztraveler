import React from "react";
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <div className="text-center space-y-6">
        <img
          src="/logo.svg"
          alt="EZTraveler Logo"
          className="mx-auto h-16 w-auto"
        />
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          {title}
        </h1>
        <p className="text-muted-foreground">
          {subtitle}
        </p>
        <div className="max-w-md mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
} 