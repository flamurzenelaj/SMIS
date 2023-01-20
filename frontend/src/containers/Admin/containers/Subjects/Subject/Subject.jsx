import React, { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DashboardWrapper from "../../../DashboardWrapper";
import useGetSubjectById from "../../../../../api/Subject/useGetSubjectById";
import { CustomSpinner } from "../../../../../components";

import "./Subject.scss";
import { getUrlLastSegment } from "../../../../../lib/helpers/getUrlLastSegment";
import { titleCaseConverter } from "../../../../../lib/helpers/titleCaseConverter";
import useDeleteSubject from "../../../../../api/Subject/useDeleteSubject";
import {
  errorToast,
  successToast,
} from "../../../../../components/Toast/Toasts";
import { useAuthContext } from "../../../../../lib/context/AuthContext/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function Subject() {
  const auth = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [initDelete, setInitDelete] = useState(false);
  const thisPath = getUrlLastSegment(location.pathname);

  const nameRef = useRef(null);
  const clasRef = useRef(null);
  const ectsRef = useRef(null);
  const { loading, error, response: data } = useGetSubjectById(thisPath, []);

  const {
    loading: deleteLoading,
    error: deleteError,
    response: deleteData,
  } = useDeleteSubject(thisPath, initDelete);

  const noData =
    (data === undefined || data === {}) && (!loading || !deleteLoading);

  if (deleteData !== undefined) {
    navigate("/admin-dashboard/subjects");
  }

  const handleUpdate = async () => {
    const body = {
      id: data.id,
      name: nameRef.current.value,
      clas: clasRef.current.value,
      ects: ectsRef.current.value,
    };
    const bearerToken = auth.isAuthenticated ? `Bearer ${auth.token}` : null;
    const res = await axios.put(`/Subjects`, body, {
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
      clasRef.current.value = "";
      ectsRef.current.value = "";
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
              <h1 className="userTitle">Edit Subject</h1>
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
                      <label>Class</label>
                      <input
                        type="text"
                        ref={clasRef}
                        placeholder={data.clas}
                        className="userUpdateInput"
                      />
                    </div>
                    <div className="userUpdateItem">
                      <label>ECTS</label>
                      <input
                        type="number"
                        ref={ectsRef}
                        placeholder={data.ects}
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
