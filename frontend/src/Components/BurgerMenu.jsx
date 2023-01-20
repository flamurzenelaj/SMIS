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

        {["Home", "About Us", "Classes", "Teachers", "Contact us"].map((item, index) => {
          const link = item.replace(" ", "-").toLowerCase();

          return (
            <motion.li
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
