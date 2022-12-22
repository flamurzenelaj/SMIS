import React, { useState, useEffect } from "react";
import "./Student.css";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";

function Student() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get("https://localhost:7255/api/Students").then((response) => {
      setStudents(response.data);
    });
  }, []);

  const deleteStudent = (id) => {
    const newStudents = students.filter((stu) => stu.id !== id);
    setStudents(newStudents);
    axios.delete("https://localhost:7255/api/Students/" + id);
  };
  return (
    <div className="container">
      <header>
        <h1>Students</h1>
      </header>
      <div className="content">
        <button className="button"><Link to="/create-student">Add Student</Link></button>
        <table className="content-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Surname</th>
              <th>Gender</th>
              <th>Date of Birth</th>
              <th>Phone</th>
              <th>Group</th>
              <th className="center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((item, key) => (
              <tr key={key}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.surname}</td>
                <td>{item.gender}</td>
                <td>{item.dateOfBirth}</td>
                <td>{item.phone}</td>
                <td>{item.group}</td>
                <td className="buttons space-evenly">
                  <Link className="btn-gray">
                    <FaEdit />
                  </Link>
                  <Link
                    onClick={() => deleteStudent(item.id)}
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

export default Student;