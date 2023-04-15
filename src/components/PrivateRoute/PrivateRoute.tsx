import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoute: React.FC = () => {
  const token: any = localStorage.getItem("accessToken");
  const location = useLocation();
  return token ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
};
export default React.memo(PrivateRoute);
