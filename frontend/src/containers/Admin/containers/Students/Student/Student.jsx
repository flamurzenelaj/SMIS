import React, { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DashboardWrapper from "../../../DashboardWrapper";
import useGetStudentById from "../../../../../api/Student/useGetStudentById";
import { CustomSpinner } from "../../../../../components";

import "./Student.scss";
import { getUrlLastSegment } from "../../../../../lib/helpers/getUrlLastSegment";
import { titleCaseConverter } from "../../../../../lib/helpers/titleCaseConverter";
import useDeleteStudent from "../../../../../api/Student/useDeleteStudent";
import {
  errorToast,
  successToast,
} from "../../../../../components/Toast/Toasts";
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

  const nameRef = useRef(null);
  const surnameRef = useRef(null);
  const genderRef = useRef(null);
  const dateOfBirthRef = useRef(null);
  const phoneRef = useRef(null);
  const groupRef = useRef(null);
  const { loading, error, response: data } = useGetStudentById(thisPath, []);

  const {
    loading: deleteLoading,
    error: deleteError,
    response: deleteData,
  } = useDeleteStudent(thisPath, initDelete);

  const noData =
    (data === undefined || data === {}) && (!loading || !deleteLoading);

  if (deleteData !== undefined) {
    navigate("/admin-dashboard/students");
  }

  const handleUpdate = async () => {
    const body = {
      id: data.id,
      name: nameRef.current.value,
      surname: surnameRef.current.value,
      gender: genderRef.current.value,
      dateOfBirth: dateOfBirthRef.current.value,
      phone: phoneRef.current.value,
      group: groupRef.current.value,
    };
    const bearerToken = auth.isAuthenticated ? `Bearer ${auth.token}` : null;
    const res = await axios.put(`/Student`, body, {
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
      nameRef.current.value = "";
      surnameRef.current.value = "";
      genderRef.current.value = "";
      dateOfBirthRef.current.value = "";
      phoneRef.current.value = "";
      groupRef.current.value = "";
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
                      <label>Name</label>
                      <input
                        type="text"
                        ref={nameRef}
                        placeholder={data.name}
                        className="userUpdateInput"
                      />
                    </div>
                    <div className="userUpdateItem">
                      <label>Surname</label>
                      <input
                        type="text"
                        ref={surnameRef}
                        placeholder={data.surname}
                        className="userUpdateInput"
                      />
                    </div>
                    <div className="userUpdateItem">
                      <label>Gender</label>
                      <input
                        type="text"
                        ref={genderRef}
                        placeholder={data.gender}
                        className="userUpdateInput"
                      />
                    </div> <div className="userUpdateItem">
                      <label>Date Of Birth</label>
                      <input
                        type="date"
                        ref={dateOfBirthRef}
                        placeholder={data.dateOfBirth}
                        className="userUpdateInput"
                      />
                    </div> <div className="userUpdateItem">
                      <label>Phone</label>
                      <input
                        type="text"
                        ref={phoneRef}
                        placeholder={data.phone}
                        className="userUpdateInput"
                      />
                    </div> <div className="userUpdateItem">
                      <label>Group</label>
                      <input
                        type="text"
                        ref={groupRef}
                        placeholder={data.group}
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
