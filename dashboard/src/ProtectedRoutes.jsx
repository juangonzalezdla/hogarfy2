import { useAuth } from "./context/AuthContext.jsx";
import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoute() {
  const { loading, isAuthenticated } = useAuth();

  if (loading) return <h1>Loading...</h1>;
  if (!isAuthenticated && !loading)
    return <Navigate to="/" replace />;

  return <Outlet />;
}

export function ProtectedRouteDashboard() {
  const { loading, isAuthorized } = useAuth();

  if (loading) return <h1>Loading...</h1>;
  if (!isAuthorized && !loading)
    return <Navigate to="/" replace />;

  return <Outlet />;
}