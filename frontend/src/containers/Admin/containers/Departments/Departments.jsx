import "./Departments.scss";
import { DataGrid } from "@material-ui/data-grid";
import { Link } from "react-router-dom";
import DashboardWrapper from "../../DashboardWrapper";
import useGetDepartment from "../../../../api/Department/useGetDepartment";
import { CustomSpinner } from "../../../../components";

export default function Departments() {
  const { loading, response: getDepartmentDataRes } = useGetDepartment();

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
      field: "departmentName",
      headerName: "Department Name",
      width: 200,
      renderCell: (params) => {
        <div className="userListUser">{params.row.departmentName}</div>;
      },
    },
    {
      field: "departmentHead",
      headerName: "Department Head",
      width: 200,
      renderCell: (params) => {
        return <div className="userListUser">{params.row.departmentHead}</div>;
      },
    },
    {
      field: "startDate",
      headerName: "Start Date",
      width: 200,
      renderCell: (params) => {
        return <div className="userListUser">{params.row.startDate}</div>;
      },
    },
    {
      field: "numberOfStudents",
      headerName: "Number Of Students",
      width: 210,
      renderCell: (params) => {
        return <div className="userListUser">{params.row.numberOfStudents}</div>;
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 120,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/admin-dashboard/departments/" + params.row.id}>
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
  if (getDepartmentDataRes === undefined || getDepartmentDataRes === {}) {
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
              <span>Departments</span>
              <Link to={"/admin-dashboard/create-department"}>
                <button>Create</button>
              </Link>
            </header>
            <DataGrid
              rows={getDepartmentDataRes}
              disableSelectionOnClick
              columns={columns}
              pageSize={8}
              rowsPerPageOptions={[8, 16, 24, 32, 40]}
              checkboxSelection
            />
          </>
        )}
      </div>
    </DashboardWrapper>
  );
}
