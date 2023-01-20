import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../lib/context/AuthContext/AuthContext";

const PrivateRoute = () => {
  const auth = useAuthContext().isAuthenticated; // determine if authorized, not implemented

  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
