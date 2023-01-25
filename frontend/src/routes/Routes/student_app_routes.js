import ApplyExam from "../../containers/Student/ApplyExam/ApplyExam";
import Exams from "../../containers/Student/Exams/Exams";
import Transcript from "../../containers/Student/Transcript/Transcript";
import { RouteType } from "./route_type";

export const StudentAppRoutes = [
    {
        type: RouteType.PUBLIC,
        path: "/exams",
        element: <Exams />,
      },
      {
        type: RouteType.PUBLIC,
        path: "/transcript",
        element: <Transcript />,
      },
      {
        type: RouteType.PUBLIC,
        path: "/apply-exam",
        element: <ApplyExam />,
      },
];