import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import DashboardWrapper from "../../../DashboardWrapper";
import { useAuthContext } from "../../../../../lib/context/AuthContext/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "./CreateSubject.scss";

export default function CreateSubject() {
  const auth = useAuthContext();
  const navigate = useNavigate();
  const idRef = useRef(null);
  const nameRef = useRef(null);
  const clasRef = useRef(null);
  const ectsRef = useRef(null);

  const handleCreate = async () => {
    const body = {
      id: 0,
      name: nameRef.current.value,
      clas: clasRef.current.value,
      ects: ectsRef.current.value,
    };
    const bearerToken = auth.isAuthenticated ? `Bearer ${auth.token}` : null;
    try {
      const res = await axios.post(`/Subjects`, body, {
        headers: {
          "Content-Type": "application/json",
          Authorization: bearerToken,
        },
      });
      
      console.log("STATUS", res.status);
      console.log("STATUS", res);

      if (res.status === 200 || res.status ===201 ) {
        nameRef.current.value = "";
        clasRef.current.value = "";
        ectsRef.current.value = "";
        navigate("/admin-dashboard/subjects");
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
        <h1 className="newUserTitle">New Subject</h1>
        <div className="newUserForm">
          <div>
            <div className="newUserItem">
              <label>Name</label>
              <input ref={nameRef} type="text"  />
            </div>
            <div className="newUserItem">
              <label>Class</label>
              <input ref={clasRef} type="text" />
            </div>
            <div className="newUserItem">
              <label>ECTS</label>
              <input ref={ectsRef} type="number" />
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
