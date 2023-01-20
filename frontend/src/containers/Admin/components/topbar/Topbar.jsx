import React from "react";
import { Link } from "react-router-dom";
import "./topbar.css";
import { Settings } from "@material-ui/icons";

export default function Topbar() {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <Link to={"/"} style={{ all: "unset" }}>
            <span className="logo">SMIS Admin Dashboard</span>
          </Link>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <Settings />
          </div>
        </div>
      </div>
    </div>
  );
}
