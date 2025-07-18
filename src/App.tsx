import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "@/lib/auth/ProtectedRoute";
import { Dashboard } from "@/routes/dashboard/Dashboard";
import { ThemeProvider } from "@/lib/theme-provider"
import { SignUpPage } from "@/components/auth/SignUpPage";
import { SignInPage } from "@/components/auth/SignInPage";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />

          {/* Protected user dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute requiredRole="user">
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Redirect root to sign-in */}
          <Route path="/" element={<Navigate to="/sign-in" />} />

          {/* Catch-all for not found */}
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;