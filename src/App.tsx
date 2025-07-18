import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SignInForm } from "@/components/auth/SignInForm";
import { SignUpForm } from "@/components/auth/SignUpForm";
import { ProtectedRoute } from "@/lib/auth/ProtectedRoute";
import { Dashboard } from "@/routes/dashboard/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign-in" element={<SignInForm />} />
        <Route path="/sign-up" element={<SignUpForm />} />

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
  );
}

export default App;