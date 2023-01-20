import Login from "../../containers/Auth/Login/Login";
import Register from "../../containers/Auth/Register/Register";
import { RouteType } from "./route_type";

import {
  Home,
} from "../../containers";

export const AppRoutes = [
  // Public Routes
  {
    type: RouteType.PUBLIC,
    path: "/",
    element: <Home />,
  },
  {
    type: RouteType.PUBLIC,
    path: "/login",
    element: <Login />,
  },
  {
    type: RouteType.PUBLIC,
    path: "/register",
    element: <Register />,
  },
];
