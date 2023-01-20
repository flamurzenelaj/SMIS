import { Routes as Switch, Route } from "react-router-dom";
import { AppRoutes } from "./Routes/app_routes";
import { AdminAppRoutes } from "./Routes/admin_app_routes";
import { useAuthContext } from "../lib/context/AuthContext/AuthContext";
import { useLocation } from "react-router-dom";

// import PrivateRoute from "./PrivateRoute";
// import RestrictedRoute from "./RestrictedRoute";

const Routes = () => {
  const location = useLocation();
  const auth = useAuthContext();

  return (
    <Switch location={location} key={location.key}>
      {/* ----- GENERAL ----- */}
      {AppRoutes.map((r) => {
        const { type, path, ...rest } = r;

        return <Route {...rest} exact key={`${path}`} path={`/${path}`} />;
      })}

      {/* ----- ADMIN ----- */}
      {auth.user &&
        auth.user.role === "Admin" &&
        AdminAppRoutes.map((r) => {
          const { type, path, ...rest } = r;

          return (
            <Route
              {...rest}
              exact
              key={`admin-${path}`}
              path={`/admin-dashboard/${path}`}
            />
          );
        })}
    </Switch>
  );
};

export default Routes;
