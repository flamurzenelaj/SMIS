import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";
import registerPhoto from "../assets/registerPhoto.png";
import { v4 as uuidv4 } from "uuid";
import { CustomSpinner } from "../../../components";
import useRegister from "../../../api/Auth/useRegister";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../lib/context/AuthContext/AuthContext";


import "./Register.scss";

import {
  containerVariants,
  h1Variant,
  inputFieldEmailVariant,
  inputFieldPasswordVariant,
  inputFieldRePasswordVariant,
  btnVariant,
  h6Variant,
} from "../framer_variants/registerPageVariants";

function RegisterPage() {

  const auth = useAuthContext();
  const navigate = useNavigate();
  const uidRef = useRef(null);
  const pwdRef = useRef(null);
  const rePwdRef = useRef(null);



  const [uid, setUid] = useState("");
  const [uidError, setUidError] = useState(false);
  const [role, setRole] = useState("");
  const [pwd, setPwd] = useState("");
  const [pwdPower, setPwdPower] = useState("Enter Password");

  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [phone, setPhone] = useState("");
  

  const [requestBody, setRequestBody] = useState({
    username: uid,
    password: pwd,
    uuid: uuidv4(),
    userRole: role,
  });

  const [initRegister, setInitRegister] = useState(false);

  const [pwdPowerBarStyle, setPwdPowerBarStyle] = useState({
    width: "100%",
    backgroundColor: "rgba(223, 219, 219, 0.0)",
  });
  const [rePwd, setRePwd] = useState("");
  const [rePwdError, setRePwdError] = useState(false);

  const [gotRegistered] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");
  const [nextRole, setNextRole] = useState("");


  const handleRoleChange = (e) => {
    setRole(e);
  };

  const handlePasswordChange = (e) => {
    setPwd(e.target.value);

    var strongRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    var mediumRegex = new RegExp(
      "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"
    );
    if (strongRegex.test(e.target.value)) {
      setPwdPower("Strong");
      setPwdPowerBarStyle({
        width: "100%",
        border: "none",
        backgroundColor: "green",
      });
    } else if (mediumRegex.test(e.target.value)) {
      setPwdPower("Medium");
      setPwdPowerBarStyle({
        width: "75%",
        border: "none",
        backgroundColor: "orange",
      });
    } else if (e.target.value.length <= 3 && e.target.value.length > 0) {
      setPwdPower("Very Weak");
      setPwdPowerBarStyle({
        width: "25%",
        border: "none",
        backgroundColor: "red",
      });
    } else if (e.target.value.length <= 6 && e.target.value.length > 0) {
      setPwdPower("Weak");
      setPwdPowerBarStyle({
        width: "50%",
        border: "none",
        backgroundColor: "orangered",
      });
    } else if (e.target.value.length === 0) {
      setPwdPower("Enter Password");
      setPwdPowerBarStyle({
        width: "100%",
        backgroundColor: "rgba(223, 219, 219, 0.0)",
      });
    }
  };

  const handleRePasswordChange = (e) => {
    setRePwd(e.target.value);
    if (e.target.value !== pwd && e.target.value.length > 0) {
      setRePwdError(true);
    } else if (e.target.value === pwd || e.target.value.length === 0) {
      setRePwdError(false);
    }
  };

  const handleUidChange = (e) => {
    setUid(e.target.value);
    if (e.target.value.length > 0 && e.target.value.length < 3) {
      setUidError(true);
      e.target.style.border = "1px solid red";
    } else if (e.target.value.length === 0 || e.target.value.length >= 3) {
      setUidError(false);
      e.target.style.border = "none";
    }
  };

  const { loading, error, response } = useRegister(requestBody, initRegister, [
    requestBody,
  ]);

  if (response !== undefined && response.data !== undefined) {
    setErrorMsg(response.data.msg);
  }

 

  const handleSubmit = () => {
    if (pwd !== rePwd) {
      setErrorMsg("Password is not the same");
      return;
    } else if (uid.length <= 6) {
      setErrorMsg("Username has to be at least 6 character.");
      return;
    } else {
      setErrorMsg("");
    }

    const id = uuidv4();  

    setRequestBody({
      username: uid,
      password: pwd,
      uuid: id,
      userRole: role,
    });

    if(nextRole === "Student"){
    const studentBody = {
      id: 0,
      userId: id,
      fullName: fullName,
      phone: phone,
      gender: gender,
      dateOfBirth: dateOfBirth,
    };
    const bearerToken = auth.isAuthenticated ? `Bearer ${auth.token}` : null;
    try {
      const res = axios.post(`/Students`, studentBody, {
        headers: {
          "Content-Type": "application/json",
          Authorization: bearerToken,
        },
      });

      if (res.status === 200 || res.status ===201 ) {
        setFullName("");
        setPhone("");
        setGender("");
        setPhone("");

        // navigate("/login");
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
   }
   if(nextRole === "Teacher"){
    const teacherBody = {
      id: 0,
      userId: id,
      fullName: fullName,
      phone: phone,
      gender: gender,
    };
    const bearerToken = auth.isAuthenticated ? `Bearer ${auth.token}` : null;
    try {
      const res = axios.post(`/Teachers`, teacherBody, {
        headers: {
          "Content-Type": "application/json",
          Authorization: bearerToken,
        },
      });
      
      if (res.status === 200 || res.status ===201 ) {
        setFullName("");
        setPhone("");
        setGender("");

        // navigate("/login");
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
  }

   
    initRegister === false && setInitRegister(true);
  };

  useEffect(() => {
    console.log("Error", error);
    if (
      error !== undefined &&
      error.response !== undefined &&
      error.response.data !== undefined &&
      error.response.data.msg !== undefined
    ) {
      setErrorMsg(error.response.data.msg);
    }
  }, [error]);

  useEffect(() => {
    console.log("Use res:", response);
    console.log(response && response.status);
    if (response !== undefined) {
      setErrorMsg(response.msg);
      navigate("/login");
    }
  }, [response]);


  return (
    <div className="register-page">
      { nextRole === "" &&
        <div
          className="left-register"
          style={gotRegistered ? { display: "none" } : { display: "flex" }}
        >
          <motion.h1 // REGISTER H1
            variants={h1Variant}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            Register Here!
          </motion.h1>

          <motion.label // USERNAME
            className="custom-field"
            variants={inputFieldEmailVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <input
              type="text"
              name="uid"
              value={uid}
              ref={uidRef}
              onChange={(event) => handleUidChange(event)}
              required
            />
            <span className="placeholder">Enter username</span>
            {uidError && (
              <div className="error-msg">
                <FiAlertCircle />
                <h1>3 or more characters</h1>
              </div>
            )}
          </motion.label>

          <motion.label // PASSWORD
            className="custom-field"
            id="custom-field-Password"
            variants={inputFieldPasswordVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <input
              type="password"
              id="password"
              name="pwd"
              value={pwd}
              ref={pwdRef}
              onChange={(event) => handlePasswordChange(event)}
              required
            />
            <span className="placeholder">Enter Password</span>
            <p id="passwordCheck"></p>
            <div className="password-power">
              <div>
                <div style={pwdPowerBarStyle}></div>
              </div>
              <h1>{pwdPower}</h1>
            </div>
          </motion.label>

          <motion.label // RE-PASSWORD
            className="custom-field"
            variants={inputFieldRePasswordVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <input
              type="password"
              id="re-password"
              ref={rePwdRef}
              value={rePwd}
              name="rePwd"
              onChange={(event) => handleRePasswordChange(event)}
              required
            />
            <span className="placeholder">Re-Enter Password</span>
            <p id="re-passwordCheck"></p>
            {rePwdError && (
              <div className="error-msg">
                <FiAlertCircle />
                <h1>Password is not the same.</h1>
              </div>
            )}
          </motion.label>
          <br />
          
          <div className="toggle-c">
            <motion.label
              variants={inputFieldEmailVariant}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="toggle"
              htmlFor="uniqueID"
            >
              <p>You are: </p>
              <div className="select-field">
                <select
                  id="uniqueID"
                  onChange={(event) => handleRoleChange(event.target.value)}
                >
                  <option value="">--Select Role--</option>
                  <option value="Student">Student</option>
                  <option value="Teacher">Teacher</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
            </motion.label>
          </div>
          <br />

          <motion.div // SUBMIT BTN
            className="btnWrapper"
            variants={btnVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {role === "Admin" && (
              <button
                className="registerBtn"
                onClick={() => {
                  handleSubmit();
                }}
              >
                {loading ? <CustomSpinner size={20} /> : "Register!"}
              </button>
            )}

            {(role === "Teacher" || role === "Student") && (
              <button
                className="registerBtn"
                onClick={() => {
                  setNextRole(role);
                }}
              >
                {loading ? <CustomSpinner size={20} /> : "Continue"}
              </button>
            )}
          </motion.div>

          <motion.h6
            variants={h6Variant}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            You have an account?{" "}
            <Link to="/login" className="auth_links">
              Login here
            </Link>
          </motion.h6>

          <motion.h6
            variants={h6Variant}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {errorMsg}
          </motion.h6>
        </div>
      }



      {nextRole === "Student" && (
        <div
          className="left-register"
          style={gotRegistered ? { display: "none" } : { display: "flex" }}
        >
          <motion.h1 // REGISTER H1
            variants={h1Variant}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            Student Details
          </motion.h1>

          <motion.label // Fullname
            className="custom-field"
            variants={inputFieldEmailVariant}
            initial="hidden"
            animate="visible"
            value={fullName}
            exit="exit"
          >
            <input
              type="text"
              name="fullName"
              onChange={(event) => setFullName(event.target.value)}
              required
            />
            <span className="placeholder">Enter Full Name</span>
            
          </motion.label>
          <br />

          <div className="toggle-c">
            <motion.label
              variants={inputFieldEmailVariant}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="toggle"
              htmlFor="uniqueID"
            >
              <div className="select-field">
                <select
                  id="uniqueID"
                  onChange={(event) => setGender(event.target.value)}
                >
                  <option value="">--Select Gender--</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </motion.label>
          </div>

          <motion.label // Date Of Birth
            className="custom-field"
            variants={inputFieldEmailVariant}
            initial="hidden"
            animate="visible"
            value={dateOfBirth}
            exit="exit"
          >
            <input
              type="date"
              name="dateOfBirth"
              onChange={(event) => setDateOfBirth(event.target.value)}
              required
            />
            
          </motion.label>

          <motion.label // Phone
            className="custom-field"
            variants={inputFieldEmailVariant}
            initial="hidden"
            animate="visible"
            value={phone}
            exit="exit"
          >
            <input
              type="text"
              name="phone"
              onChange={(event) => setPhone(event.target.value)}
              required
            />
            <span className="placeholder">Enter Phone Number</span>
            
          </motion.label>
          

          <motion.div // Back BTN
            className="btnWrapper"
            variants={btnVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
              <button
                className="registerBtn"
                onClick={() => {
                  setNextRole("");
                }}
              >
                {loading ? <CustomSpinner size={20} /> : "Back"}
              </button>
            
          </motion.div>

          <motion.div // SUBMIT BTN
            className="btnWrapper"
            variants={btnVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
              <button
                className="registerBtn"
                onClick={() => {
                  handleSubmit();
                }}
              >
                {loading ? <CustomSpinner size={20} /> : "Register!"}
              </button>
            
          </motion.div>

          <motion.h6
            variants={h6Variant}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            You have an account?{" "}
            <Link to="/login" className="auth_links">
              Login here
            </Link>
          </motion.h6>

          <motion.h6
            variants={h6Variant}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {errorMsg}
          </motion.h6>
        </div>
      )}

      {nextRole === "Teacher" && (
        <div
          className="left-register"
          style={gotRegistered ? { display: "none" } : { display: "flex" }}
        >
          <motion.h1 // REGISTER H1
            variants={h1Variant}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            Teacher Details
          </motion.h1>

          <motion.label // Fullname
            className="custom-field"
            variants={inputFieldEmailVariant}
            initial="hidden"
            animate="visible"
            value={fullName}
            exit="exit"
          >
            <input
              type="text"
              name="fullName"
              onChange={(event) => setFullName(event.target.value)}
              required
            />
            <span className="placeholder">Enter Full Name</span>
            
          </motion.label>
          <br />

          <div className="toggle-c">
            <motion.label
              variants={inputFieldEmailVariant}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="toggle"
              htmlFor="uniqueID"
            >
              <div className="select-field">
                <select
                  id="uniqueID"
                  onChange={(event) => setGender(event.target.value)}
                >
                  <option value="">--Select Gender--</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </motion.label>
          </div>


          <motion.label // Phone
            className="custom-field"
            variants={inputFieldEmailVariant}
            initial="hidden"
            animate="visible"
            value={phone}
            exit="exit"
          >
            <input
              type="text"
              name="phone"
              onChange={(event) => setPhone(event.target.value)}
              required
            />
            <span className="placeholder">Enter Phone Number</span>
            
          </motion.label>
          

          <motion.div // SUBMIT BTN
            className="btnWrapper"
            variants={btnVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
              <button
                className="registerBtn"
                onClick={() => {
                  handleSubmit();
                }}
              >
                {loading ? <CustomSpinner size={20} /> : "Register!"}
              </button>
            
          </motion.div>

          <motion.h6
            variants={h6Variant}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            You have an account?{" "}
            <Link to="/login" className="auth_links">
              Login here
            </Link>
          </motion.h6>

          <motion.h6
            variants={h6Variant}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {errorMsg}
          </motion.h6>
        </div>
      )}

      <motion.div
        className="right-register"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <img src={registerPhoto} alt="shhMan" />
      </motion.div>
    </div>
  );
}

export default RegisterPage;
