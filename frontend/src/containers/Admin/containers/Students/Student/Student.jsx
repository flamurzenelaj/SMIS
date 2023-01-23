import React, { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DashboardWrapper from "../../../DashboardWrapper";
import useGetStudentById from "../../../../../api/Student/useGetStudentById";
import { CustomSpinner } from "../../../../../components";

import "./Student.scss";
import { getUrlLastSegment } from "../../../../../lib/helpers/getUrlLastSegment";
import useDeleteStudent from "../../../../../api/Student/useDeleteStudent";
import { useAuthContext } from "../../../../../lib/context/AuthContext/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function Student() {
  const auth = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [initDelete, setInitDelete] = useState(false);
  const thisPath = getUrlLastSegment(location.pathname);

  const fullNameRef = useRef(null);
  const genderRef = useRef(null);
  const dateOfBirthRef = useRef(null);
  const phoneRef = useRef(null);
  const { loading, response: data } = useGetStudentById(thisPath, []);

  const {
    loading: deleteLoading,
    response: deleteData,
  } = useDeleteStudent(thisPath, initDelete);

  const noData =
    (data === undefined || data === {}) && (!loading || !deleteLoading);

  if (deleteData !== undefined) {

    console.log("deleting..");
    toast.error("Deleting...", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      toastId: 'success1',
    });  
    
    
    setTimeout(() => {
      navigate("/Admin-dashboard/Students")
    }, 2000);
  }

  const handleUpdate = async () => {
    const body = {
      id: data.id,
      fullName: fullNameRef.current.value,
      gender: genderRef.current.value,
      dateOfBirth: dateOfBirthRef.current.value,
      phone: phoneRef.current.value,
      userId: "Unknown",
    };
    const bearerToken = auth.isAuthenticated ? `Bearer ${auth.token}` : null;
    const res = await axios.put(`/Students/${data.id}`, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: bearerToken,
      },
    });
   

    if (res.status === 200 || res.status ===204) {
      toast.success("Updated.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      
      setTimeout(() => {
        navigate("/Admin-dashboard/Students")
      }, 3000);
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
  };

  return (
    <DashboardWrapper>
      <div className="userList">
        <ToastContainer />
        {loading || deleteLoading ? (
          <div className="full-view app__flex">
            <CustomSpinner />
          </div>
        ) : noData ? (
          <div className="full-view app__flex">No Data</div>
        ) : (
          <div className="user">
            <div className="userTitleContainer">
              <h1 className="userTitle">Edit Student</h1>
              <button
                className="userAddButton"
                onClick={() => setInitDelete(true)}
              >
                Delete
              </button>
            </div>
            <div className="userContainer">
              <div className="userUpdate">
                <div className="userUpdateTitle">
                  <span>Edit</span>
                  <button
                    className="userUpdateButton"
                    onClick={() => handleUpdate()}
                  >
                    Update
                  </button>
                </div>
                <form className="userUpdateForm">
                  <div className="userUpdateLeft">
                    <div className="userUpdateItem">
                      <label>Full Name</label>
                      <input
                        type="text"
                        ref={fullNameRef}
                        defaultValue={data.fullName}
                        className="userUpdateInput"
                      />
                    </div>
                    <div className="newUserItem">
                      <label>Gender</label>
                      <select
                        className="newUserSelect"
                        ref={genderRef}
                        name="active"
                        id="active"
                        defaultValue={data.gender}
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                     <div className="userUpdateItem">
                      <label>Date Of Birth</label>
                      <input
                        type="date"
                        ref={dateOfBirthRef}
                        defaultValue={data.dateOfBirth}
                        className="userUpdateInput"
                      />
                    </div> <div className="userUpdateItem">
                      <label>Phone</label>
                      <input
                        type="number"
                        ref={phoneRef}
                        defaultValue={data.phone}
                        className="userUpdateInput"
                      />
                    </div> 
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardWrapper>
  );
}
