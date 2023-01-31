import React from "react";
import { Typography } from "../../../components";
import {
    TEXT_COLOR_VARIATION,
    TEXT_FONT_WEIGHT,
    TEXT_VARIATION,
  } from "../../../components/Typography/typography_enums";
import "./MyStudents.scss";

import { DataGrid } from "@material-ui/data-grid";
import useGetStudent from "../../../api/Student/useGetStudent";
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import Chatbot from "../../../components/Chatbot/Chatbot";

function MyStudents() {

  let studentsBackgroundImage =
    "https://t3.ftcdn.net/jpg/03/86/34/70/360_F_386347095_e1ykRa7RsPqyzKZG2ivG5MiLJovNRDvv.jpg";

    const { loading,  response: getStudentDataRes } = useGetStudent();

 
    const columns = [
      {
        field: "id",
        headerName: "ID",
        width: 200,
        renderCell: (params) => {
          <div className="userListUser">{params.row.id}</div>;
        },
      },
      {
        field: "fullName",
        headerName: "Full Name",
        width: 200,
        renderCell: (params) => {
          <div className="userListUser">{params.row.fullName}</div>;
        },
      },
      {
        field: "gender",
        headerName: "Gender",
        width: 200,
        renderCell: (params) => {
          return <div className="userListUser">{params.row.gender}</div>;
        },
      },
      {
        field: "dateOfBirth",
        headerName: "Date Of Birth",
        width: 200,
        renderCell: (params) => {
          return <div className="userListUser">{params.row.dateOfBirth}</div>;
        },
      },
      {
        field: "phone",
        headerName: "Phone",
        width: 200,
        renderCell: (params) => {
          return <div className="userListUser">{params.row.phone}</div>;
        },
      },
    ];
    if (loading === true) {
        return (
            <div className="userList app__flex">
            </div>
        );
      }
      if (getStudentDataRes === undefined || getStudentDataRes === {}) {
        return (
            <div className="userList">No data</div>
        );
      }

  return (
    <div className="app__students">
      <header
        className="app__students-header"
        style={{
          backgroundImage: `url(${studentsBackgroundImage})`,
        }}
      >
        <Typography
            variant={TEXT_VARIATION.h1}
            fontWeight={TEXT_FONT_WEIGHT.w300}
            color={TEXT_COLOR_VARIATION.white}
            className="app__students__header-title"
          >
            STUDENTS
          </Typography>
      </header>
      <div className="app__students__content">
     <Box sx={{ height: "300px", width: '80%'}}>
      <DataGrid
        rows={getStudentDataRes}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
    </div>

    <Chatbot />
      
    </div>
  );
}

export default MyStudents;
