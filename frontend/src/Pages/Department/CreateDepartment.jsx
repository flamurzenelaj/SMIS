import axios from "axios";
import React, { useState } from "react";
import "./Department.css";

function CreateDepartment() {

  const [form, setForm] = useState({
    id: "",
    DepartmentName: "",
    DepartmentHead: "",
    StartDate: "",
    NumberOfStudents: "",
  });

  function handleInputChange(event) {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  }
  function handleSubmit() {
    const request = {
      id: 0,
      departmentName: form.DepartmentName,
      departmentHead: form.DepartmentHead,
      startDate: form.StartDate,
      numberOfStudents: form.NumberOfStudents,
    };
    axios
      .post("https://localhost:7255/api/Departments", request)
      .then((res) => handleStatusCode(res.status));
  }

  function handleStatusCode(statusCode) {
    if (statusCode === 200) {
      setForm({
        id: "",
        DepartmentName: "",
        DepartmentHead: "",
        StartDate: "",
        NumberOfStudents: "",
      });
    }
  }

  
  return (
    <div className="container">
      <header>
        <h1>Create Department</h1>
      </header>
      <div className="content">
        <div className="form">
          <h3>Department Details</h3>

          <form className="form-details">
            <div className="form-input">
              <label htmlFor="name">Department Name</label>
              <input
                name="DepartmentName"
                type="text"
                value={form.DepartmentName}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-input">
              <label htmlFor="name">Head of Department</label>
              <input
                name="DepartmentHead"
                type="text"
                value={form.DepartmentHead}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-input">
              <label htmlFor="name">Department Start Date</label>
              <input
                name="StartDate"
                type="date"
                value={form.StartDate}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-input">
              <label htmlFor="name">No of Students</label>
              <input
                name="NumberOfStudents"
                type="number"
                value={form.NumberOfStudents}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-input">
              <button className="button" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateDepartment;
