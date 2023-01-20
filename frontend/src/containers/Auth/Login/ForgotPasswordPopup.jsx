import React from "react";
import { motion } from "framer-motion";

import "./Login.scss";

function ForgotPasswordPopup({ isPopupOpen, setPopupOpen }) {
  return (
    <>
      {isPopupOpen && (
        <motion.div
          className="popup_container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            key="modal"
            className="popup"
            initial={{ y: "-100vh", opacity: 0, scale: 0 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 47.5 }}
            exit={{ y: "-100vh", opacity: 0, scale: 0 }}
          >
            <h1>Recover your account !</h1>
            <input
              className="popup-input"
              type="email"
              name="email"
              placeholder="Enter your email"
            />
            <button className="popup-btn" onClick={() => setPopupOpen(false)}>
              Close popup!
            </button>
          </motion.div>
        </motion.div>
      )}{" "}
    </>
  );
}

export default ForgotPasswordPopup;
