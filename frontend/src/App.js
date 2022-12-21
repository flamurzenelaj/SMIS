import Sidebar from "./Components/Sidebar/Sidebar";
import Department from "./Pages/Department/Department.jsx"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard.jsx";
import Student from "./Pages/Student/Student.jsx";
import Teacher from "./Pages/Teacher/Teacher";
import Subject from "./Pages/Subject/Subject.jsx";
import CreateDepartment from "./Pages/Department/CreateDepartment";



function App() {
  return (
    <Router>
      <div className="page-container">
      <Sidebar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/students" element={<Student />} />
        <Route path="/teachers" element={<Teacher />} />
        <Route path="/departments" element={<Department />} />
        <Route path="/create-department" element={<CreateDepartment />} />
        <Route path="/subjects" element={<Subject />} />

      </Routes>
      </div>
    </Router>
  );
}

export default App;
