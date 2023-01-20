import "./Students.scss";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import DashboardWrapper from "../../DashboardWrapper";
import useGetStudent from "../../../../api/Student/useGetStudent";
import { CustomSpinner } from "../../../../components";

export default function Students() {
  const { loading, error, response: getStudentDataRes } = useGetStudent();

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
      field: "surname",
      headerName: "Surname",
      width: 200,
      renderCell: (params) => {
        return <div className="userListUser">{params.row.surname}</div>;
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
      headerName: "DateOfBirth",
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
    {
      field: "group",
      headerName: "Group",
      width: 200,
      renderCell: (params) => {
        return <div className="userListUser">{params.row.group}</div>;
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/admin-dashboard/students/" + params.row.id}>
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
  if (getStudentDataRes === undefined || getStudentDataRes === {}) {
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
              <span>Students</span>
              <Link to={"/admin-dashboard/create-student"}>
                <button>Create</button>
              </Link>
            </header>
            <DataGrid
              rows={getStudentDataRes}
              disableSelectionOnClick
              columns={columns}
              pageSize={8}
              checkboxSelection
            />
          </>
        )}
      </div>
    </DashboardWrapper>
  );
}
