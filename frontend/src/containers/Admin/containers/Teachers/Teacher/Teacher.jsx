import React, { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DashboardWrapper from "../../../DashboardWrapper";
import useGetTeacherById from "../../../../../api/Teacher/useGetTeacherById";
import { CustomSpinner } from "../../../../../components";

import "./Teacher.scss";
import { getUrlLastSegment } from "../../../../../lib/helpers/getUrlLastSegment";
import { titleCaseConverter } from "../../../../../lib/helpers/titleCaseConverter";
import useDeleteTeacher from "../../../../../api/Teacher/useDeleteTeacher";
import {
  errorToast,
  successToast,
} from "../../../../../components/Toast/Toasts";
import { useAuthContext } from "../../../../../lib/context/AuthContext/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function Teacher() {
  const auth = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [initDelete, setInitDelete] = useState(false);
  const thisPath = getUrlLastSegment(location.pathname);

  const fullNameRef = useRef(null);
  const departmentRef = useRef(null);
  const phoneNumberRef = useRef(null);
  const genderRef = useRef(null);
  const qualificationRef = useRef(null);
  const { loading, error, response: data } = useGetTeacherById(thisPath, []);

  const {
    loading: deleteLoading,
    error: deleteError,
    response: deleteData,
  } = useDeleteTeacher(thisPath, initDelete);

  const noData =
    (data === undefined || data === {}) && (!loading || !deleteLoading);

  if (deleteData !== undefined) {
    navigate("/admin-dashboard/teachers");
  }

  const handleUpdate = async () => {
    const body = {
      id: data.id,
      fullName: fullNameRef.current.value,
      department: departmentRef.current.value,
      phoneNumber: phoneNumberRef.current.value,
      gender: genderRef.current.value,
      qualification: qualificationRef.current.value,
    };
    const bearerToken = auth.isAuthenticated ? `Bearer ${auth.token}` : null;
    const res = await axios.put(`/Teacher`, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: bearerToken,
      },
    });
    console.log("STATUS", res.status);
    console.log("STATUS", res);

    if (res.status === 200) {
      toast.success("Updated.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      fullNameRef.current.value = "";
      departmentRef.current.value = "";
      phoneNumberRef.current.value = "";
      genderRef.current.value = "";
      qualificationRef.current.value = "";
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
              <h1 className="userTitle">Edit Teacher</h1>
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
                        placeholder={data.fullName}
                        className="userUpdateInput"
                      />
                    </div>
                    <div className="userUpdateItem">
                      <label>Department</label>
                      <input
                        type="text"
                        ref={departmentRef}
                        placeholder={data.department}
                        className="userUpdateInput"
                      />
                    </div><div className="userUpdateItem">
                      <label>Phone Number</label>
                      <input
                        type="text"
                        ref={phoneNumberRef}
                        placeholder={data.phoneNumber}
                        className="userUpdateInput"
                      />
                    </div><div className="userUpdateItem">
                      <label>Gender</label>
                      <input
                        type="text"
                        ref={genderRef}
                        placeholder={data.gender}
                        className="userUpdateInput"
                      />
                    </div><div className="userUpdateItem">
                      <label>Qualification</label>
                      <input
                        type="text"
                        ref={qualificationRef}
                        placeholder={data.qualification}
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
