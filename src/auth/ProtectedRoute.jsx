import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function ProtectedRoute({ redirectTo = "/login" }) {
  const { user, initializing, session } = useAuth();

  if (initializing) {
    return <div>Loading...</div>; // splash/spinner while we confirm session
  }

  return user ? <Outlet /> : <Navigate to={redirectTo} replace />;
}
