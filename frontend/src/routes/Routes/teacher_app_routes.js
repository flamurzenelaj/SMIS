import MyStudents from "../../containers/Teacher/MyStudents/MyStudents";
import MySubjects from "../../containers/Teacher/MySubjects/MySubjects";
import { RouteType } from "./route_type";

export const TeacherAppRoutes = [
    {
        type: RouteType.PUBLIC,
        path: "/subjects",
        element: <MySubjects />,
      },
      {
        type: RouteType.PUBLIC,
        path: "/students",
        element: <MyStudents />,
      },
];