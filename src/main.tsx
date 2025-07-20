import { ConvexAuthProvider } from "@convex-dev/auth/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { ConvexReactClient } from "convex/react";
import App from "./App.tsx";
import "./index.css";
import { Toaster } from "@/components/ui/sonner";
 
const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);
 
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConvexAuthProvider client={convex}>
      <App />
      <Toaster position="top-center"/>
    </ConvexAuthProvider>
  </React.StrictMode>,
);