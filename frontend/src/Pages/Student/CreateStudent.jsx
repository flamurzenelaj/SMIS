import axios from "axios";
import React, { useState } from "react";
import "./Student.css";

function CreateStudent() {

    const [form, setForm] = useState({
        id: "",
        Name: "",
        Surname: "",
        gender: "",
        DateOfBirth: "",
        Phone: "",
        Group: "",
    });

    function handleInputChange(event) {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    }
    function handleSubmit() {
        const request = {
            id: 0,
            name: form.Name,
            surname: form.Surname,
            gender: form.Gender,
            dateOfBirth: form.DateOfBirth,
            phone: form.Phone,
            group: form.Group,
        };
        axios
            .post("https://localhost:7255/api/Students", request)
            .then((res) => handleStatusCode(res.status));
    }

    function handleStatusCode(statusCode) {
        if (statusCode === 200) {
            setForm({
                id: "",
                Name: "",
                Surname: "",
                gender: "",
                DateOfBirth: "",
                Phone: "",
                Group: "",
            });
        }
    }


    return (
        <div className="container">
            <header>
                <h1>Create Student</h1>
            </header>
            <div className="content">
                <div className="form">
                    <h3>Student's Details</h3>

                    <form className="form-details">
                        <div className="form-input">
                            <label htmlFor="name">Name</label>
                            <input
                                name="Name"
                                type="text"
                                value={form.Name}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-input">
                            <label htmlFor="name">Surname</label>
                            <input
                                name="Surname"
                                type="text"
                                value={form.Surname}
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
                            <label htmlFor="name">Date of Birth</label>
                            <input
                                name="DateOfBirth"
                                type="date"
                                value={form.DateOfBirth}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-input">
                            <label htmlFor="name">Phone</label>
                            <input
                                name="Phone"
                                type="text"
                                value={form.Phone}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-input">
                            <label htmlFor="name">Group</label>
                            <input
                                name="Group"
                                type="text"
                                value={form.Group}
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

export default CreateStudent;
