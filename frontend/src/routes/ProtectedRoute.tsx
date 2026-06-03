import type { ReactNode } from "react";
import { Navigate } from "react-router";

type TProtectedRouteProps = {
  children: ReactNode;
};

export function ProtectedRoute({ children }: TProtectedRouteProps) {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    return <Navigate to="login" replace />;
  }

  return children;
}
