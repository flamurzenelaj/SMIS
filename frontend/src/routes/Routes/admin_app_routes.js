import { RouteType } from "./route_type";

import {
  Home,
  Users,
  User,
  CreateUser,
  Departments,
  Department,
} from "../../containers/Admin/containers";
import CreateDepartment from "../../containers/Admin/containers/Departments/CreateDepartment/CreateDepartment";
import Student from "../../containers/Admin/containers/Students/Student/Student";
import Students from "../../containers/Admin/containers/Students/Students";
import CreateStudent from "../../containers/Admin/containers/Students/CreateStudent/CreateStudent";
import Teachers from "../../containers/Admin/containers/Teachers/Teachers";
import Teacher from "../../containers/Admin/containers/Teachers/Teacher/Teacher";
import CreateTeacher from "../../containers/Admin/containers/Teachers/CreateTeacher/CreateTeacher";
import Subjects from "../../containers/Admin/containers/Subjects/Subjects";
import Subject from "../../containers/Admin/containers/Subjects/Subject/Subject";
import CreateSubject from "../../containers/Admin/containers/Subjects/CreateSubject/CreateSubject";
import Chatbots from "../../containers/Admin/containers/Chatbots/Chatbots";
import CreateChatbot from "../../containers/Admin/containers/Chatbots/CreateChatbot/CreateChatbot";
import Chatbot from "../../containers/Admin/containers/Chatbots/Chatbot/Chatbot";
import Exams from "../../containers/Admin/containers/Exams/Exams";
import CreateExam from "../../containers/Admin/containers/Exams/CreateExam/CreateExam";
import Exam from "../../containers/Admin/containers/Exams/Exam/Exam";

export const AdminAppRoutes = [
  {
    type: RouteType.PUBLIC,
    path: "/",
    element: <Home />,
  },
  {
    type: RouteType.PUBLIC,
    path: "users",
    element: <Users />,
  },
  {
    type: RouteType.PUBLIC,
    path: "user/:userId",
    element: <User />,
  },
  {
    type: RouteType.PUBLIC,
    path: "create-user",
    element: <CreateUser />,
  },
  {
    type: RouteType.PUBLIC,
    path: "departments",
    element: <Departments />,
  },
  {
    type: RouteType.PUBLIC,
    path: "departments/:departmentId",
    element: <Department />,
  },
  {
    type: RouteType.PUBLIC,
    path: "create-department",
    element: <CreateDepartment />,
  },
  {
    type: RouteType.PUBLIC,
    path: "students",
    element: <Students />,
  },
  {
    type: RouteType.PUBLIC,
    path: "students/:studentId",
    element: <Student />,
  },
  {
    type: RouteType.PUBLIC,
    path: "create-student",
    element: <CreateStudent />,
  },
  {
    type: RouteType.PUBLIC,
    path: "teachers",
    element: <Teachers />,
  },
  {
    type: RouteType.PUBLIC,
    path: "teachers/:teacherId",
    element: <Teacher />,
  },
  {
    type: RouteType.PUBLIC,
    path: "create-teacher",
    element: <CreateTeacher />,
  },
  {
    type: RouteType.PUBLIC,
    path: "subjects",
    element: <Subjects />,
  },
  {
    type: RouteType.PUBLIC,
    path: "subject/:subjectId",
    element: <Subject />,
  },
  {
    type: RouteType.PUBLIC,
    path: "create-subject",
    element: <CreateSubject />,
  },
  {
    type: RouteType.PUBLIC,
    path: "chatbot",
    element: <Chatbots />,
  },
  {
    type: RouteType.PUBLIC,
    path: "chatbot/:chatbotId",
    element: <Chatbot />,
  },
  {
    type: RouteType.PUBLIC,
    path: "create-chatbot",
    element: <CreateChatbot />,
  },
  {
    type: RouteType.PUBLIC,
    path: "exams",
    element: <Exams />,
  },
  {
    type: RouteType.PUBLIC,
    path: "create-exam",
    element: <CreateExam />,
  },
  {
    type: RouteType.PUBLIC,
    path: "exams/:examsId",
    element: <Exam />,
  },


];
