import "./Subjects.scss";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import DashboardWrapper from "../../DashboardWrapper";
import useGetSubject from "../../../../api/Subject/useGetSubject";
import { CustomSpinner } from "../../../../components";

export default function Subjects() {
  const { loading, error, response: getSubjectDataRes } = useGetSubject();

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
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/admin-dashboard/subject/" + params.row.id}>
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
  if (getSubjectDataRes === undefined || getSubjectDataRes === {}) {
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
              <span>Subjects</span>
              <Link to={"/admin-dashboard/create-subject"}>
                <button>Create</button>
              </Link>
            </header>
            <DataGrid
              rows={getSubjectDataRes}
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
