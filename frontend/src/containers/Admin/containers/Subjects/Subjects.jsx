import "./Subjects.scss";
import { DataGrid } from "@material-ui/data-grid";
import { Link } from "react-router-dom";
import DashboardWrapper from "../../DashboardWrapper";
import useGetSubject from "../../../../api/Subject/useGetSubject";
import { CustomSpinner } from "../../../../components";

export default function Subjects() {
  const { loading, response: getSubjectDataRes } = useGetSubject();

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
      field: "name",
      headerName: "Name",
      width: 200,
      renderCell: (params) => {
        <div className="userListUser">{params.row.name}</div>;
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
      width: 120,
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
              rowsPerPageOptions={[8, 16, 24, 32, 40]}  
            />
          </>
        )}
      </div>
    </DashboardWrapper>
  );
}
