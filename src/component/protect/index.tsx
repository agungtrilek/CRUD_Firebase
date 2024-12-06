import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../redux/store";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const { user, role } = useAppSelector((state) => state.auth);

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(role!)) {
    return <Navigate to="/notfound" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
