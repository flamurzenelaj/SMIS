import axios from 'axios';
import React from 'react'
import { useState } from 'react';

function CreateSubject() {

  const [form, setForm] = useState({
    id: "",
    SubjectName: "",
    Clas: "",
    ECTS: "",
  });

  function handleInputChange(event) {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  }
  function handleSubmit() {
    const request = {
      id: 0,
      name: form.Name,
      clas: form.Clas,
      ects: form.ECTS,

    };
    axios
      .post("https://localhost:7255/api/Subjects", request)
      .then((res) => handleStatusCode(res.status));
  }

  function handleStatusCode(statusCode) {
    if (statusCode === 200) {
      setForm({
        id: "",
        name: "",
        clas: "",
        ects: "",

      });
    }
  }


  return (
    <div className="container">
      <header>
        <h1>Create Subject</h1>
      </header>
      <div className="content">
        <div className="form">
          <h3>Subject Details</h3>

          <form className="form-details">
            <div className="form-input">
              <label htmlFor="name">Subject Name</label>
              <input
                name="Name"
                type="text"
                value={form.Name}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-input">
              <label htmlFor="name">Class</label>
              <input
                name="Clas"
                type="text"
                value={form.Clas}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-input">
              <label htmlFor="name">ECTS</label>
              <input
                name="ECTS"
                type="number"
                value={form.ECTS}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-input"></div>
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

export default CreateSubject