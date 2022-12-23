import React, { useState, useEffect } from "react";
import "./Teacher.css";
import "./CreateTeacher"
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";

function Teacher() {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    axios.get("https://localhost:7255/api/Teachers").then((response) => {
      setTeachers(response.data);
    });
  }, []);

  const deleteTeacher = (id) => {
    const newTeachers = teachers.filter((teach) => teach.id !== id);
    setTeachers(newTeachers);
    axios.delete("https://localhost:7255/api/Teachers/" + id);
  };
  return (
    <div className="container">
      <header>
        <h1>Teachers</h1>
      </header>
      <div className="content">
      <button className="button"><Link to="/create-teacher">Add Teacher</Link></button>
        <table className="content-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>FullName</th>
              <th>Department</th>
              <th>PhoneNumber</th>
              <th>Gender</th>
              <th>Qualification</th>
              <th className="center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((item, key) => (
              <tr key={key}>
                <td>{item.id}</td>
                <td>{item.fullName}</td>
                <td>{item.department}</td>
                <td>{item.phoneNumber}</td>
                <td>{item.gender}</td>
                <td>{item.qualification}</td>
                <td className="buttons space-evenly">
                  <Link className="btn-gray">
                    <FaEdit />
                  </Link>
                  <Link
                    onClick={() => deleteTeacher(item.id)}
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

export default Teacher;