import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Subject() {
  const [Subject, setSubjects] = useState([]);

  useEffect(() => {
    axios.get("https://localhost:7255/api/Subjects").then((response) => {
      setSubjects(response.data);
    });
  }, []);

  const deleteSubject = (id) => {
    const newSubjects = Subject.filter((dep) => dep.id !== id);
    setSubjects(newSubjects);
    axios.delete("https://localhost:7255/api/Subjects/" + id);
  };
  return (
    <div className="container">
      <header>
        <h1>Subjects</h1>
      </header>
      <div className="content">
          <button className="button"><Link to="/create-subject">Add Subject</Link></button>
        <table className="content-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Class</th>
              <th>ECTS</th>
              <th className="center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Subject.map((item, key) => (
              <tr key={key}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.clas}</td>
                <td>{item.ects}</td>
    
                <td className="buttons space-evenly">
                  <Link className="btn-gray">
                    <FaEdit />
                  </Link>
                  <Link
                    onClick={() => deleteSubject(item.id)}
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

export default Subject