import React, { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DashboardWrapper from "../../../DashboardWrapper";
import useGetUserById from "../../../../../api/User/useGetUserById";
import { CustomSpinner } from "../../../../../components";

import "./User.scss";
import { getUrlLastSegment } from "../../../../../lib/helpers/getUrlLastSegment";
import useDeleteUser from "../../../../../api/User/useDeleteUser";
import { useAuthContext } from "../../../../../lib/context/AuthContext/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function User() {
  const auth = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [initDelete, setInitDelete] = useState(false);
  const thisPath = getUrlLastSegment(location.pathname);


  const userNameRef = useRef(null);
  const roleRef = useRef(null);
  const { loading, response: data } = useGetUserById(thisPath);

  const {
    loading: deleteLoading,
    response: deleteData,
  } = useDeleteUser(thisPath, initDelete);

  const noData =
    (data === undefined || data === {}) && (!loading || !deleteLoading);

  if (deleteData !== undefined) {
    toast.error("Deleting User", {
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
      navigate("/admin-dashboard/users");
    }, 2000);
  }

  const handleUpdate = async () => {
    const body = {
      id: data.id,
      uid: data.uid,
      username: userNameRef.current.value,
      role: roleRef.current.value,
      passwordHash: data.passwordHash,
      passwordSalt: data.passwordSalt,
    };
    console.log(body)
    const bearerToken = auth.isAuthenticated ? `Bearer ${auth.token}` : null;
    const res = await axios.put(`/User`, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: bearerToken,
      },
    });
    

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

      setTimeout(() => {
        navigate("/admin-dashboard/users");
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
              <h1 className="userTitle">Edit User</h1>
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
                      <label>UID</label>
                      <input
                        type="text"
                        value={data.uid}
                        className="userUpdateInput"
                      />
                    </div>
                    <div className="userUpdateItem">
                      <label>Username</label>
                      <input
                        type="text"
                        ref={userNameRef}
                        defaultValue={data.username}
                        className="userUpdateInput"
                      />
                    </div>
                    <div className="newUserItem">
                      <label>Role</label>
                      <select
                        className="newUserSelect"
                        ref={roleRef}
                        name="active"
                        id="active"
                        defaultValue={data.role}
                      >
                        <option value="Admin">Admin</option>
                        <option value="Student">Student</option>
                        <option value="Teacher">Teacher</option>
                      </select>
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
