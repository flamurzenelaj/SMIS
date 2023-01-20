import React from "react";
import { Route, Outlet } from "react-router-dom";

const PublicRoute = (props) => {
  return <Route {...props} />
}

export default PublicRoute;