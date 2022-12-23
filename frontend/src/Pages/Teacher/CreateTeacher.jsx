import axios from "axios";
import React, { useState } from "react";
import "./Teacher.css";

function CreateTeacher() {

    const [form, setForm] = useState({
        Id:"",
        FullName:"",
        Department:"",
        PhoneNumber:"",
        Gender:"",
        Qualification:""
    });

    function handleInputChange(event) {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    }
    function handleSubmit() {
        const request = {
            id: 0,
            FullName: form.FullName,
            Department: form.Department,
            PhoneNumber: form.PhoneNumber,
            Gender: form.Gender,
            Qualification: form.Qualification
        };
        axios
            .post("https://localhost:7255/api/Teachers", request)
            .then((res) => handleStatusCode(res.status));
    }

    function handleStatusCode(statusCode) {
        if (statusCode === 200) {
            setForm({
                Id:"",
                FullName:"",
                Department:"",
                PhoneNumber:"",
                Gender:"",
                Qualification:""
            });
        }
    }


    return (
        <div className="container">
            <header>
                <h1>Create Teacher</h1>
            </header>
            <div className="content">
                <div className="form">
                    <h3>Teacher's Details</h3>

                    <form className="form-details">
                        <div className="form-input">
                            <label htmlFor="name">FullName</label>
                            <input
                                name="FullName"
                                type="text"
                                value={form.FullName}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-input">
                            <label htmlFor="name">Department</label>
                            <input
                                name="Department"
                                type="text"
                                value={form.Department}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-input">
                            <label htmlFor="name">Gender</label>
                            <input
                                name="Gender"
                                type="text"
                                value={form.Gender}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-input">
                            <label htmlFor="name">Qualification</label>
                            <input
                                name="Qualification"
                                type="text"
                                value={form.Qualification}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-input">
                            <label htmlFor="name">Phone</label>
                            <input
                                name="PhoneNumber"
                                type="text"
                                value={form.PhoneNumber}
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

export default CreateTeacher;
