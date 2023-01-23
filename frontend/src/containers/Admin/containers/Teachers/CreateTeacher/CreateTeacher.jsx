import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import DashboardWrapper from "../../../DashboardWrapper";
import { useAuthContext } from "../../../../../lib/context/AuthContext/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "./CreateTeacher.scss";

export default function CreateTeacher() {
  const auth = useAuthContext();
  const navigate = useNavigate();
  const fullNameRef = useRef(null);
  const phoneNumberRef = useRef(null);
  const genderRef = useRef(null);


  const handleCreate = async () => {
    const body = {
      id: 0,
      fullName: fullNameRef.current.value,
      phoneNumber: phoneNumberRef.current.value,
      gender: genderRef.current.value,
      userId: "unknown",

    };
    const bearerToken = auth.isAuthenticated ? `Bearer ${auth.token}` : null;
    try {
      const res = await axios.post(`/Teachers`, body, {
        headers: {
          "Content-Type": "application/json",
          Authorization: bearerToken,
        },
      });
      
      console.log("STATUS", res.status);
      console.log("STATUS", res);

      if (res.status === 200 || res.status ===201 ) {
        fullNameRef.current.value = "";
        phoneNumberRef.current.value = "";
        genderRef.current.value = "";
        navigate("/admin-dashboard/teachers");
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
        <h1 className="newUserTitle">New Teacher</h1>
        <div className="newUserForm">
          <div>
            <div className="newUserItem">
              <label>Full Name</label>
              <input ref={fullNameRef} type="text"  />
            </div>
            <div className="newUserItem">
              <label>Phone Number</label>
              <input ref={phoneNumberRef} type="text" />
            </div>
            <div className="newUserItem">
              <label>Gender</label>
              <input ref={genderRef} type="text" />
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
