import React, { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DashboardWrapper from "../../../DashboardWrapper";
import useGetDepartmentById from "../../../../../api/Department/useGetDepartmentById";
import { CustomSpinner } from "../../../../../components";

import "./Department.scss";
import { getUrlLastSegment } from "../../../../../lib/helpers/getUrlLastSegment";
import { titleCaseConverter } from "../../../../../lib/helpers/titleCaseConverter";
import useDeleteDepartment from "../../../../../api/Department/useDeleteDepartment";
import {
  errorToast,
  successToast,
} from "../../../../../components/Toast/Toasts";
import { useAuthContext } from "../../../../../lib/context/AuthContext/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function Department() {
  const auth = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [initDelete, setInitDelete] = useState(false);
  const thisPath = getUrlLastSegment(location.pathname);

  const departmentNameRef = useRef(null);
  const departmentHeadRef = useRef(null);
  const startDateRef = useRef(null);
  const numberOfStudentsRef = useRef(null);
  const { loading, error, response: data } = useGetDepartmentById(thisPath, []);
  console.log(thisPath);

  const {
    loading: deleteLoading,
    error: deleteError,
    response: deleteData,
  } = useDeleteDepartment(thisPath, initDelete);

  const noData =
    (data === undefined || data === {}) && (!loading || !deleteLoading);

  if (deleteData !== undefined) {
    navigate("/admin-dashboard/departments");
  }

  const handleUpdate = async () => {
    const body = {
      id: data.id,
      departmentName: departmentNameRef.current.value,
      departmentHead: departmentHeadRef.current.value,
      startDate: startDateRef.current.value,
      numberOfStudents: numberOfStudentsRef.current.value,
    };
    const bearerToken = auth.isAuthenticated ? `Bearer ${auth.token}` : null;
    const res = await axios.put(`/Departments/`, body, {
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
      departmentNameRef.current.value = "";
      departmentHeadRef.current.value = "";
      startDateRef.current.value = "";
      numberOfStudentsRef.current.value = "";

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
              <h1 className="userTitle">Edit Department</h1>
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
                      <label>Department Name</label>
                      <input
                        type="text"
                        ref={departmentNameRef}
                        placeholder={data.departmentName}
                        className="userUpdateInput"
                      />
                    </div>
                    <div className="userUpdateItem">
                      <label>Department Head</label>
                      <input
                        type="text"
                        ref={departmentHeadRef}
                        placeholder={data.departmentHead}
                        className="userUpdateInput"
                      />
                    </div>
                    <div className="userUpdateItem">
                      <label>Start Date</label>
                      <input
                        type="date"
                        ref={startDateRef}
                        placeholder={data.startDate}
                        className="userUpdateInput"
                      />
                    </div> <div className="userUpdateItem">
                      <label>Number Of Students</label>
                      <input
                        type="text"
                        ref={numberOfStudentsRef}
                        placeholder={data.numberOfStudents}
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
