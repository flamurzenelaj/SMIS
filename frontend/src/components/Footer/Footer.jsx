import React from "react";
import { useLocation } from "react-router-dom";
import "./Footer.scss";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

function Footer() {
  const location = useLocation();

  if (location.pathname.includes("/admin-dashboard")) {
    return <></>;
  }
  return (
    <div className="footer">
      <div className="socialMedia">
        <FaInstagram /> <FaFacebook /> <FaTwitter /> <FaLinkedin />
      </div>
      <a href="/" className="subscribe">
      UBT - Higher Education Institution
      </a>
      <p>&copy; 2023 ALL RIGHTS RESERVED.</p>
    </div>
  );
}

export default Footer;
