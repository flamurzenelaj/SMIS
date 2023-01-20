import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import DashboardWrapper from "../../../DashboardWrapper";
import { useAuthContext } from "../../../../../lib/context/AuthContext/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "./CreateUser.scss";

export default function CreateUser() {
  const auth = useAuthContext();
  const navigate = useNavigate();
  const idRef = useRef(null);
  const nameRef = useRef(null);
  const codeRef = useRef(null);

  const handleCreate = async () => {
    const body = {
      id: idRef.current.value,
      name: nameRef.current.value,
      code: codeRef.current.value,
    };
    const bearerToken = auth.isAuthenticated ? `Bearer ${auth.token}` : null;
    try {
      const res = await axios.post(`/User`, body, {
        headers: {
          "Content-Type": "application/json",
          Authorization: bearerToken,
        },
      });
      console.log("STATUS", res.status);
      console.log("STATUS", res);

      if (res.status === 200) {
        nameRef.current.value = "";
        codeRef.current.value = "";
        navigate("/admin-dashboard/regions");
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
        <h1 className="newUserTitle">New User</h1>
        <div className="newUserForm">
          <div>
            <div className="newUserItem">
              <label>UID</label>
              <input ref={idRef} type="text" placeholder="john" />
            </div>
            <div className="newUserItem">
              <label>Role</label>
              <select className="newUserSelect" name="active" id="active">
                <option value="Admin">Admin</option>
                <option value="User">User</option>
              </select>
            </div>
            <div className="newUserItem">
              <label>Username</label>
              <input ref={codeRef} type="text" placeholder="john" />
            </div>
          </div>
          <button className="newUserButton" onClick={() => handleCreate()}>
            Create
          </button>
        </div>
      </div>
    </DashboardWrapper>
  );
}
