import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../pages/LoginPage/useAuth";

export default function ProtectedRoutes() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}
