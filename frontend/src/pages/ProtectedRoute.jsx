import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function ProtectedRoute() {
  const { user } = useUser();
  const redirectPath = "/login";

  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
}
