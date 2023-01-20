import React from "react";
import Topbar from "./components/topbar/Topbar";
import Sidebar from "./components/sidebar/Sidebar";
import "./DashboardWrapper.scss";

const DashboardWrapper = (props) => {
  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        {props.children}
      </div>
    </>
  );
};

export default DashboardWrapper;
