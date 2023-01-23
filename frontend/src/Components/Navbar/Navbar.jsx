import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../lib/context/AuthContext/AuthContext";
import "./Navbar.scss";

const Navbar = ({ burgerMenu, setBurgerMenu }) => {
  const auth = useAuthContext();

  return (
    <div className="app__navbar app__flex">
      <h2 className="logo">SMIS</h2>
      <ul>
        {["Home", "About Us", "Contact us"].map((item, index) => {
          const link = item.replace(" ", "-").toLowerCase();
          return (
            <li key={`navbar-link-${index}`}>
              <Link to={`/${link}`}>{item}</Link>
            </li>
          );
        })}
        {auth.isAuthenticated ? (
          <li key={`navbar-link-logout`}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
              }}
            >
              {auth.user.role === "Admin" ? <p><Link to="/admin-dashboard">Dashboard</Link></p> : ""}
              <p
                style={{
                  display: "inline-block",
                  height: "2rem",
                  width: "2px",
                  backgroundColor: "#C69A50",
                  margin: "0 1rem",
                }}
              />
              {`${auth.user.name[0]},`}
              <p onClick={() => auth.logout()}>
                <Link to={`#`}> LOGOUT</Link>
              </p>
            </div>
          </li>
        ) : (
          <li key={`navbar-link-login`}>
            <Link to={`/login`}>LOGIN</Link>
          </li>
        )}
      </ul>

      <svg
        className={
          !burgerMenu ? "ham hamRotate ham1" : "ham hamRotate ham1 active"
        }
        id="ham-svg"
        viewBox="0 0 100 100"
        width="80"
        onClick={() => setBurgerMenu(!burgerMenu)}
      >
        <path
          className="line top"
          d="m 30,33 h 40 c 0,0 9.044436,-0.654587 9.044436,-8.508902 0,-7.854315 -8.024349,-11.958003 -14.89975,-10.85914 -6.875401,1.098863 -13.637059,4.171617 -13.637059,16.368042 v 40"
        />
        <path className="line middle" d="m 30,50 h 40" />
        <path
          className="line bottom"
          d="m 30,67 h 40 c 12.796276,0 15.357889,-11.717785 15.357889,-26.851538 0,-15.133752 -4.786586,-27.274118 -16.667516,-27.274118 -11.88093,0 -18.499247,6.994427 -18.435284,17.125656 l 0.252538,40"
        />
      </svg>
    </div>
  );
};

export default Navbar;
