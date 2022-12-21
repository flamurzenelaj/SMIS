import React, { useState, useEffect } from "react";
import "./Department.css";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";

function Department() {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    axios.get("https://localhost:7255/api/Departments").then((response) => {
      setDepartments(response.data);
    });
  }, []);

  const deleteDepartment = (id) => {
    const newDepartments = departments.filter((dep) => dep.id !== id);
    setDepartments(newDepartments);
    axios.delete("https://localhost:7255/api/Departments/" + id);
  };
  return (
    <div className="container">
      <header>
        <h1>Departments</h1>
      </header>
      <div className="content">
          <button className="button"><Link to="/create-department">Add Department</Link></button>
        <table className="content-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Head</th>
              <th>Started Year</th>
              <th>No of Students</th>
              <th className="center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((item, key) => (
              <tr key={key}>
                <td>{item.id}</td>
                <td>{item.departmentName}</td>
                <td>{item.departmentHead}</td>
                <td>{item.startDate}</td>
                <td>{item.numberOfStudents}</td>
                <td className="buttons space-evenly">
                  <Link className="btn-gray">
                    <FaEdit  />
                  </Link>
                  <Link
                    onClick={() => deleteDepartment(item.id)}
                    className="btn-red"
                    to="#"
                  >
                    <FaTrashAlt />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Department;
