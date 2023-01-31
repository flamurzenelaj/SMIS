import "./Teachers.scss";
import { DataGrid } from "@material-ui/data-grid";
import { Link } from "react-router-dom";
import DashboardWrapper from "../../DashboardWrapper";
import useGetTeacher from "../../../../api/Teacher/useGetTeacher";
import { CustomSpinner } from "../../../../components";

export default function Teachers() {
  const { loading, response: getTeacherDataRes } = useGetTeacher();

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 100,
      renderCell: (params) => {
        <div className="userListUser">{params.row.id}</div>;
      },
    },
    {
      field: "fullName",
      headerName: "FullName",
      width: 200,
      renderCell: (params) => {
        <div className="userListUser">{params.row.fullName}</div>;
      },
    },
   
    {
      field: "phoneNumber",
      headerName: "PhoneNumber",
      width: 200,
      renderCell: (params) => {
        return <div className="userListUser">{params.row.phoneNumber}</div>;
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
      field: "action",
      headerName: "Action",
      width: 120,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/admin-dashboard/teachers/" + params.row.id}>
              <button className="userListEdit">Edit</button>
            </Link>
          </>
        );
      },
    },
  ];
  if (loading === true) {
    return (
      <DashboardWrapper>
        <div className="userList app__flex">
          <CustomSpinner />
        </div>
      </DashboardWrapper>
    );
  }
  if (getTeacherDataRes === undefined || getTeacherDataRes === {}) {
    return (
      <DashboardWrapper>
        <div className="userList">No data</div>
      </DashboardWrapper>
    );
  }
  return (
    <DashboardWrapper>
      <div className="userList">
        {loading ? (
          <div className="app__flex">
            <CustomSpinner />
          </div>
        ) : (
          <>
            <header>
              <span>Teachers</span>
              <Link to={"/admin-dashboard/create-teacher"}>
                <button>Create</button>
              </Link>
            </header>
            <DataGrid
              rows={getTeacherDataRes}
              disableSelectionOnClick
              columns={columns}
              pageSize={8}
              checkboxSelection
              rowsPerPageOptions={[8, 16, 24, 32, 40]}
            />
          </>
        )}
      </div>
    </DashboardWrapper>
  );
}
