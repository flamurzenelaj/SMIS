import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import DashboardWrapper from "../../../DashboardWrapper";
import { useAuthContext } from "../../../../../lib/context/AuthContext/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import useGetAllTeacherData from "../../../../../api/Teacher/useGetAllTeacherData";
import useGetTeacher from "../../../../../api/Teacher/useGetTeacher";
import useGetSubject from "../../../../../api/Subject/useGetSubject";
import { useState } from "react";


export default function CreateExam() {
  const auth = useAuthContext();
  const navigate = useNavigate();
  const subjectIdRef = useRef(null);
  const teacherIdRef = useRef(null);
  const dateRef = useRef(null);

  const { loading, response: getTeacherDataRes } = useGetTeacher();
  const { loadingg, response: getSubjectDataRes } = useGetSubject();
  const teachers = getTeacherDataRes;
  const subjects = getSubjectDataRes;

  
  // setTeachers(getTeacherDataRes);/
  

  

  const handleCreate = async () => {
    const body = {
      id: 0,
      subjectId: subjectIdRef.current.value,
      teacherId: teacherIdRef.current.value,
      date:      dateRef.current.value,
    };
    const bearerToken = auth.isAuthenticated ? `Bearer ${auth.token}` : null;
    try {
      const res = await axios.post(`/Exams`, body, {
        headers: {
          "Content-Type": "application/json",
          Authorization: bearerToken,
        },
      });
      
      console.log("STATUS", res.status);
      console.log("STATUS", res);

      if (res.status === 200 || res.status ===201 ) {
        subjectIdRef.current.value = "";
        teacherIdRef.current.value = "";
        dateRef.current.value = "";
        navigate("/admin-dashboard/exams");
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
        <h1 className="newUserTitle">New Exam</h1>
        <div className="newUserForm">
          <div>
            <div className="newUserItem">
              <label>Subject ID</label>
              <select className="newUserSelect" style={{width: "50px"}} ref={subjectIdRef}  >
              {subjects && subjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.id}
                </option>
              ))}
           </select>
            </div>
            <div className="newUserItem">
              <label>Teacher ID</label>
              <select className="newUserSelect" style={{width: "50px"}} ref={teacherIdRef}  >
              {teachers && teachers.map((teacher) => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.id}
                </option>
              ))}
           </select>
            </div>
            <div className="newUserItem">
              <label>Date</label>
              <input ref={dateRef} type="date" />
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
