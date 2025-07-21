import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "@/lib/auth/ProtectedRoute";
import { RoleBasedRedirector } from "@/lib/auth/RoleBasedRedirector";
import { ThemeProvider } from "@/lib/theme-provider";
import { SignUpPage } from "@/components/auth/SignUpPage";
import { SignInPage } from "@/components/auth/SignInPage";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { HomePage } from "@/components/dashboard/HomePage";
import { SettingsPage } from "@/components/dashboard/SettingsPage";
import { MyBookingsPage } from "@/components/dashboard/bookings/MyBookingsPage";
import { HotelDetailsPage } from "@/components/dashboard/HotelDetailsPage";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminHomePage } from "@/components/admin/AdminHomePage";

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
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<HomePage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="bookings" element={<MyBookingsPage />} />
            <Route path="hotel/:hotelId" element={<HotelDetailsPage />} />
          </Route>

          {/* Protected admin dashboard */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminHomePage />} />
          </Route>

          {/* Role-based redirector */}
          <Route path="/redirect" element={<RoleBasedRedirector />} />

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