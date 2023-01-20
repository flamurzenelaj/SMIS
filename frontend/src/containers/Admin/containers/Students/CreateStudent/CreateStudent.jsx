import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import DashboardWrapper from "../../../DashboardWrapper";
import { useAuthContext } from "../../../../../lib/context/AuthContext/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "./CreateStudent.scss";

export default function CreateStudent() {
  const auth = useAuthContext();
  const navigate = useNavigate();
  const idRef = useRef(null);
  const nameRef = useRef(null);
  const surnameRef = useRef(null);
  const genderRef = useRef(null);
  const dateOfBirthRef = useRef(null);
  const phoneRef = useRef(null);
  const groupRef = useRef(null);


  const handleCreate = async () => {
    const body = {
      id: 0,
      name: nameRef.current.value,
      surname: surnameRef.current.value,
      gender: genderRef.current.value,
      dateOfBirth: dateOfBirthRef.current.value,
      phone: phoneRef.current.value,
      group: groupRef.current.value,

    };
    const bearerToken = auth.isAuthenticated ? `Bearer ${auth.token}` : null;
    try {
      const res = await axios.post(`/Students`, body, {
        headers: {
          "Content-Type": "application/json",
          Authorization: bearerToken,
        },
      });
      
      console.log("STATUS", res.status);
      console.log("STATUS", res);

      if (res.status === 200 || res.status ===201 ) {
        nameRef.current.value = "";
        surnameRef.current.value = "";
        genderRef.current.value = "";
        dateOfBirthRef.current.value = "";
        phoneRef.current.value = "";
        groupRef.current.value = "";

        navigate("/admin-dashboard/students");
      } else {
        toast.error("Error. Try again.", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (e) {
      toast.error(e.toString(), {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <DashboardWrapper>
      <div className="newUser">
        <ToastContainer />
        <h1 className="newUserTitle">New Student</h1>
        <div className="newUserForm">
          <div>
            <div className="newUserItem">
              <label>Name</label>
              <input ref={nameRef} type="text"  />
            </div>
            <div className="newUserItem">
              <label>Surname</label>
              <input ref={surnameRef} type="text" />
            </div>
            <div className="newUserItem">
              <label>Gender</label>
              <input ref={genderRef} type="text" />
            </div>
            <div className="newUserItem">
              <label>Date of Birth</label>
              <input ref={dateOfBirthRef} type="date" />
            </div>
            <div className="newUserItem">
              <label>Phone</label>
              <input ref={phoneRef} type="text" />
            </div>
            <div className="newUserItem">
              <label>Group</label>
              <input ref={groupRef} type="text" />
            </div>
            {/* <div className="newUserItem">
              <label>Active</label>
              <select className="newUserSelect" name="active" id="active">
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div> */}
          </div>
          <button className="newUserButton" onClick={() => handleCreate()}>
            Create
          </button>
        </div>
      </div>
    </DashboardWrapper>
  );
}
