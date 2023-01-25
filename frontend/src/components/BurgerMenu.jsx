import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuthContext } from "../lib/context/AuthContext/AuthContext";

const BurgerMenu = ({ setBurgerMenu }) => {
  const auth = useAuthContext();
  const isAuthenticated = auth.isAuthenticated;
  return (
    <motion.div
      className="app__burgerMenu"
      initial={{ y: "-100vh" }}
      animate={{ y: 0 }}
      exit={{ y: "-100vh" }}
      transition={{ stiffness: 50, duration: 0.5 }}
    >
      <ul>
        <motion.li
          initial={{ y: "-5vh", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 + 0 / 10 }}
        >
          {isAuthenticated ? (
            <Link
              to={`#`}
              onClick={() => {
                setBurgerMenu(false);
                auth.logout();
              }}
            >
              Logout
            </Link>
          ) : (
            <Link to={`/login`} onClick={() => setBurgerMenu(false)}>
              Login
            </Link>
          )}
        </motion.li>
        {isAuthenticated && auth.user.role === "Admin" && (
          <motion.li
            key="1"
            initial={{ y: "-5vh", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 + 0 / 10 }}
          >
            <p onClick={() => setBurgerMenu(false)}>
              <Link to="/admin-dashboard">Dashboard</Link>
            </p>
          </motion.li>
        )}
        {isAuthenticated && auth.user.role === "Student" && (
          <motion.li
            key="2"
            initial={{ y: "-5vh", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 + 0 / 10 }}
          >
            <p onClick={() => setBurgerMenu(false)}>
              <Link to="/transcript">Transcript</Link>
            </p>
          </motion.li>
        )}{" "}
        {isAuthenticated && auth.user.role === "Student" && (
          <motion.li
            key="3"
            initial={{ y: "-5vh", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 + 0 / 10 }}
          >
            <p onClick={() => setBurgerMenu(false)}>
              <Link to="/exams">My Exams</Link>
            </p>
          </motion.li>
        )}
        {isAuthenticated && auth.user.role === "Student" && (
          <motion.li
            key="4"
            initial={{ y: "-5vh", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 + 0 / 10 }}
          >
            <p onClick={() => setBurgerMenu(false)}>
              <Link to="/apply-exam">Apply Exam</Link>
            </p>
          </motion.li>
        )}
        {isAuthenticated && auth.user.role === "Teacher" && (
          <motion.li
            key="5"
            initial={{ y: "-5vh", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 + 0 / 10 }}
          >
            <Link onClick={() => setBurgerMenu(false)} to="/subjects">
              My Subjects
            </Link>
          </motion.li>
        )}
        {isAuthenticated && auth.user.role === "Teacher" && (
          <motion.li
            key="6"
            initial={{ y: "-5vh", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 + 0 / 10 }}
          >
            <Link onClick={() => setBurgerMenu(false)} to="/students">
              My Students
            </Link>
          </motion.li>
        )}
        {["HOME", "CONTACT US"].map((item, index) => {
          const link = item.replace(" ", "-").toLowerCase();

          return (
            <motion.li
              key={index}
              initial={{ y: "-5vh", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 + index / 10 }}
            >
              <Link to={`/${link}`} onClick={() => setBurgerMenu(false)}>
                {item}
              </Link>
            </motion.li>
          );
        })}
      </ul>
    </motion.div>
  );
};

export default BurgerMenu;
