import { Routes as Switch, Route } from "react-router-dom";
import { AppRoutes } from "./Routes/app_routes";
import { AdminAppRoutes } from "./Routes/admin_app_routes";
import { useAuthContext } from "../lib/context/AuthContext/AuthContext";
import { useLocation } from "react-router-dom";
import { StudentAppRoutes } from "./Routes/student_app_routes";
import { TeacherAppRoutes } from "./Routes/teacher_app_routes";

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

         {/* ----- Student ----- */}
      {auth.user &&
        auth.user.role === "Student" &&
        StudentAppRoutes.map((r) => {
          const { type, path, ...rest } = r;

          return (
            <Route
              {...rest}
              exact
              key={`${path}`}
              path={`/${path}`}
            />
          );
        })}

         {/* ----- Teacher ----- */}
      {auth.user &&
        auth.user.role === "Teacher" &&
        TeacherAppRoutes.map((r) => {
          const { type, path, ...rest } = r;

          return (
            <Route
              {...rest}
              exact
              key={`${path}`}
              path={`/${path}`}
            />
          );
        })}
    </Switch>
  );
};

export default Routes;
