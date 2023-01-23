import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CustomSpinner } from "../../../components";
import useLogin from "../../../api/Auth/useLogin";
import { useAuthContext } from "../../../lib/context/AuthContext/AuthContext";

import {
  h1Variant,
  inputFieldEmailVariant,
  inputFieldPasswordVariant,
  btnVariant,
  h6Variant,
} from "../framer_variants/loginPageVariants";

function LoginForm({ isPopupOpen, setIsPopupOpen }) {
  const [errorMsg, setErrorMsg] = useState("");
  const uidRef = useRef(null);
  const pwdRef = useRef(null);
  const [uid, setUid] = useState("");
  const [pwd, setPwd] = useState("");
  const auth = useAuthContext();

  const [initRegister, setInitRegister] = useState(false);

  const [requestBody, setRequestBody] = useState({
    username: uid,
    password: pwd,
  });

  const clearAllInputFields = () => {
    clearUid();
    clearPwd();
  };

  const clearUid = () => {
    uidRef.current.value = "";
  };

  const clearPwd = () => {
    pwdRef.current.value = "";
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const { loading, error, response } = useLogin(requestBody, initRegister, [
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
    if (response !== undefined) {
      setErrorMsg();
      clearAllInputFields();
      auth.login(response.token);
    }
  }, [response]);

  const handleUidChange = (e) => {
    setUid(e.target.value);
  };
  const handlePwdChange = (e) => {
    setPwd(e.target.value);
  };
  const handleSubmit = () => {
    if (uid.length <= 6) {
      setErrorMsg("Username has to be at least 6 character.");
      return;
    } else {
      setErrorMsg("");
    }

    setRequestBody({
      username: uid,
      password: pwd,
    });

    initRegister === false && setInitRegister(true);

  };

  return (
    <div className="right-login">
      <motion.h1
        variants={h1Variant}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        Login
      </motion.h1>

      <motion.label
        className="custom-field"
        variants={inputFieldEmailVariant}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <input
          type="username"
          required
          ref={uidRef}
          onChange={(event) => handleUidChange(event)}
        />
        <span className="placeholder">Enter username</span>
      </motion.label>

      <motion.label
        className="custom-field password"
        variants={inputFieldPasswordVariant}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <input
          type="password"
          id="password"
          required
          ref={pwdRef}
          onChange={(event) => handlePwdChange(event)}
        />
        <span className="placeholder">Enter Password</span>
      </motion.label>

      <motion.div
        className="btnWrapper"
        variants={btnVariant}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <button
          className="loginBtn"
          onClick={() => {
            handleSubmit();
          }}
        >
          {loading ? <CustomSpinner size={20} /> : "Login!"}
        </button>
      </motion.div>

      <motion.h6
        variants={h6Variant}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        Forgot Password?
        <p className="auth_links" onClick={() => togglePopup()}>
          {" "}
          Recover Password
        </p>
      </motion.h6>

      <motion.h6
        variants={h6Variant}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        Dont have an account?
        <Link to="/register" className="auth_links">
          {" "}
          Register here
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
  );
}

export default LoginForm;
