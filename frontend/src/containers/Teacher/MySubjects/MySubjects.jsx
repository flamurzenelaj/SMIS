import React from "react";
import { Typography } from "../../../components";
import {
    TEXT_COLOR_VARIATION,
    TEXT_FONT_WEIGHT,
    TEXT_VARIATION,
  } from "../../../components/Typography/typography_enums";
import "./MySubjects.scss";

import { DataGrid } from "@material-ui/data-grid";
import useGetSubject from "../../../api/Subject/useGetSubject";
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import Chatbot from "../../../components/Chatbot/Chatbot";

function MySubjects() {
    let subjectsBackgroundImage =
    "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8Ym9va3N8ZW58MHx8MHx8&w=1000&q=80";

    const { loading, response: getSubjectDataRes } = useGetSubject();

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
        field: "name",
        headerName: "Name",
        width: 200,
        renderCell: (params) => {
          <div className="userListUser">{params.row.name}</div>;
        },
      },
      {
        field: "clas",
        headerName: "Class",
        width: 200,
        renderCell: (params) => {
          return <div className="userListUser">{params.row.clas}</div>;
        },
      },
      {
        field: "ects",
        headerName: "ECTS",
        width: 200,
        renderCell: (params) => {
          return <div className="userListUser">{params.row.ects}</div>;
        },
      },
     
    ];
    if (loading === true) {
        return (
            <div className="userList app__flex">
            </div>
        );
      }
      if (getSubjectDataRes === undefined || getSubjectDataRes === {}) {
        return (
            <div className="userList">No data</div>
        );
      }
  return (
    <div className="app__subjects">
      <header
        className="app__subjects-header"
        style={{
          backgroundImage: `url(${subjectsBackgroundImage})`,
        }}
      >
        <Typography
            variant={TEXT_VARIATION.h1}
            fontWeight={TEXT_FONT_WEIGHT.w300}
            color={TEXT_COLOR_VARIATION.white}
            className="app__subjects__header-title"
          >
            SUBJECTS
          </Typography>
      </header>
      <div className="app__subjects__content">
     <Box sx={{ height: "300px", width: '80%' }}>
      <DataGrid
        rows={getSubjectDataRes}
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
  )
}

export default MySubjects