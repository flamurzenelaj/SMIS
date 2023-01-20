import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";
import registerPhoto from "../assets/registerPhoto.png";
import { v4 as uuidv4 } from "uuid";
import { CustomSpinner } from "../../../components";
import useRegister from "../../../api/Auth/useRegister";

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
  const uidRef = useRef(null);
  const pwdRef = useRef(null);
  const rePwdRef = useRef(null);
  const isAdminRef = useRef(null);

  const [uid, setUid] = useState("");
  const [uidError, setUidError] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [pwd, setPwd] = useState("");
  const [pwdPower, setPwdPower] = useState("Enter Password");

  const [requestBody, setRequestBody] = useState({
    username: uid,
    password: pwd,
    uuid: uuidv4(),
    isAdmin: isAdmin,
  });

  const [initRegister, setInitRegister] = useState(false);

  const [pwdPowerBarStyle, setPwdPowerBarStyle] = useState({
    width: "100%",
    backgroundColor: "rgba(223, 219, 219, 0.0)",
  });
  const [rePwd, setRePwd] = useState("");
  const [rePwdError, setRePwdError] = useState(false);

  const [gotRegistered, setGotRegistered] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");

  const clearAllInputFields = () => {
    clearUid();
    clearPwd();
    clearRePwd();
    setIsAdmin(false);
    setPwdPower("Enter Password");
    setPwdPowerBarStyle({
      width: "100%",
      backgroundColor: "rgba(223, 219, 219, 0.0)",
    });
  };

  const clearUid = () => {
    uidRef.current.value = "";
  };

  const clearPwd = () => {
    pwdRef.current.value = "";
  };
  const clearRePwd = () => {
    rePwdRef.current.value = "";
  };

  const handleIsAdminChange = (e) => {
    console.log(e.target.checked);
    setIsAdmin(e.target.checked);
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
    } else if (e.target.value.length == 0) {
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
    } else if (e.target.value.length == 0 || e.target.value.length >= 3) {
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
      clearAllInputFields();
    }
  }, [response]);

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

    setRequestBody({
      username: uid,
      password: pwd,
      uuid: uuidv4(),
      isAdmin: isAdmin,
    });

    initRegister === false && setInitRegister(true);
  };

  return (
    <div className="register-page">
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
          value={uid}
          exit="exit"
        >
          <input
            type="text"
            name="uid"
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
            ref={pwdRef}
            onChange={(event) => handlePasswordChange(event)}
            required
          />
          <span className="placeholder">Enter Password</span>
          <h6 id="passwordCheck"></h6>
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
            name="rePwd"
            onChange={(event) => handleRePasswordChange(event)}
            required
          />
          <span className="placeholder">Re-Enter Password</span>
          <h6 id="re-passwordCheck"></h6>
          {rePwdError && (
            <div className="error-msg">
              <FiAlertCircle />
              <h1>Password is not the same.</h1>
            </div>
          )}
        </motion.label>

        <div className="toggle-c">
          <motion.label
            variants={inputFieldEmailVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="toggle"
            htmlFor="uniqueID"
          >
            <input
              type="checkbox"
              ref={isAdminRef}
              className="toggle__input"
              id="uniqueID"
              onChange={(event) => handleIsAdminChange(event)}
            />
            <span className="toggle-track">
              <span className="toggle-indicator">
                <span className="checkMark">
                  <svg
                    viewBox="0 0 24 24"
                    id="ghq-svg-check"
                    role="presentation"
                    aria-hidden="true"
                  >
                    <path d="M9.86 18a1 1 0 01-.73-.32l-4.86-5.17a1.001 1.001 0 011.46-1.37l4.12 4.39 8.41-9.2a1 1 0 111.48 1.34l-9.14 10a1 1 0 01-.73.33h-.01z"></path>
                  </svg>
                </span>
              </span>
            </span>
            Is Admin ?
          </motion.label>
        </div>

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
