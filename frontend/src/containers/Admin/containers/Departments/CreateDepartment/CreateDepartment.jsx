import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import DashboardWrapper from "../../../DashboardWrapper";
import { useAuthContext } from "../../../../../lib/context/AuthContext/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "./CreateDepartment.scss";

export default function CreateDepartment() {
  const auth = useAuthContext();
  const navigate = useNavigate();
  const departmentNameRef = useRef(null);
  const departmentHeadRef = useRef(null);
  const startDateRef = useRef(null);
  const numberOfStudentsRef = useRef(null);

  const handleCreate = async () => {
    const body = {
      id: 0,
      departmentName: departmentNameRef.current.value,
      departmentHead: departmentHeadRef.current.value,
      startDate: startDateRef.current.value,
      numberOfStudents: numberOfStudentsRef.current.value,
    };
    const bearerToken = auth.isAuthenticated ? `Bearer ${auth.token}` : null;
    try {
      const res = await axios.post(`/Departments`, body, {
        headers: {
          "Content-Type": "application/json",
          Authorization: bearerToken,
        },
      });
      
      console.log("STATUS", res.status);
      console.log("STATUS", res);

      if (res.status === 200 || res.status ===201 ) {
        departmentNameRef.current.value = "";
        departmentHeadRef.current.value = "";
        startDateRef.current.value = "";
        numberOfStudentsRef.current.value = "";
        navigate("/admin-dashboard/departments");
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
      <div className="user">
      <div className="newUser">
        <ToastContainer />
        <h1 className="newUserTitle">New Department</h1>
        <div className="newUserForm">
          <div>
            <div className="newUserItem">
              <label>Department Name</label>
              <input ref={departmentNameRef} type="text"  />
            </div>
            <div className="newUserItem">
              <label>Department Head</label>
              <input ref={departmentHeadRef} type="text" />
            </div>
            <div className="newUserItem">
              <label>StartDate</label>
              <input ref={startDateRef} type="date" />
            </div>
            <div className="newUserItem">
              <label>Number Of Students</label>
              <input ref={numberOfStudentsRef} type="number" />
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
      </div>
    </DashboardWrapper>
  );
}
