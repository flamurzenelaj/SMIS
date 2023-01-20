import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./Login.scss";
import { containerVariants } from "../framer_variants/loginPageVariants";
import LoginForm from "./LoginForm";
import ForgotPasswordPopup from "./ForgotPasswordPopup";
import loginPhoto from "../assets/loginPhoto.png";
import { useAuthContext } from "../../../lib/context/AuthContext/AuthContext";
import { useNavigate } from "react-router";

function LoginPage() {
  const [popupOpen, setPopupOpen] = useState(false);
  const isAuth = useAuthContext().isAuthenticated;
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      navigate("/admin-dashboard");
    }
  }, []);

  return (
    <div className="login-page">
      <AnimatePresence exitBeforeEnter>
        {popupOpen && (
          <ForgotPasswordPopup
            isPopupOpen={popupOpen}
            setPopupOpen={setPopupOpen}
          />
        )}
      </AnimatePresence>
      <motion.div
        className="left-login"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <img src={loginPhoto} alt="manAndBook" />
      </motion.div>

      <LoginForm isPopupOpen={popupOpen} setIsPopupOpen={setPopupOpen} />
    </div>
  );
}

export default LoginPage;
