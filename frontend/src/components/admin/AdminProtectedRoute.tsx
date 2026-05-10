import { Navigate } from "react-router-dom";
import React from "react";

import { getAdminToken } from "../../utils/token";

interface Props {
  children: React.ReactNode;
}

const AdminProtectedRoute = ({
  children,
}: Props) => {
  const token =
    getAdminToken();

  if (!token) {
    return (
      <Navigate
        to="/admin/login"
      />
    );
  }

  return children;
};

export default AdminProtectedRoute;
