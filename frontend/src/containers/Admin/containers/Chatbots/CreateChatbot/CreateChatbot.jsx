import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import DashboardWrapper from "../../../DashboardWrapper";
import { useAuthContext } from "../../../../../lib/context/AuthContext/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "./CreateChatbot.scss";

export default function CreateChatbot() {
  const auth = useAuthContext();
  const navigate = useNavigate();
  const questionRef = useRef(null);
  const responseRef = useRef(null);

  const handleCreate = async () => {
    const body = {
      id: 0,
      question: questionRef.current.value.toLowerCase(),
      response: responseRef.current.value,
    };
    const bearerToken = auth.isAuthenticated ? `Bearer ${auth.token}` : null;
    try {
      const res = await axios.post(`/Chatbot`, body, {
        headers: {
          "Content-Type": "application/json",
          Authorization: bearerToken,
        },
      });
      
      console.log("STATUS", res.status);
      console.log("STATUS", res);

      if (res.status === 200 || res.status ===201 ) {
        questionRef.current.value = "";
        responseRef.current.value = "";
        navigate("/admin-dashboard/chatbot");
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
        <h1 className="chatbot-title">Add Chatbot Data</h1>
        <div className="chatbot-container">
          <div>
            <div className="newChatbot">
              <label>Question</label>
              <textarea ref={questionRef} type="textbox"  />
            </div>
            <div className="newChatbot">
              <label>Response</label>
              <textarea ref={responseRef} type="textbox" />
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
