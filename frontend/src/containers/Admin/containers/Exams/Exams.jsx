
import { DataGrid } from "@material-ui/data-grid";
import { Link } from "react-router-dom";
import DashboardWrapper from "../../DashboardWrapper";
import useGetExam from "../../../../api/Exams/useGetExam";
import { CustomSpinner } from "../../../../components";

export default function Exams() {
  const { loading, response: getExamDataRes } = useGetExam();

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
      field: "subjectId",
      headerName: "Subject ID",
      width: 200,
      renderCell: (params) => {
        <div className="userListUser">{params.row.subjectId}</div>;
      },
    },
    {
      field: "teacherId",
      headerName: "Teacher ID",
      width: 200,
      renderCell: (params) => {
        return <div className="userListUser">{params.row.teacherId}</div>;
      },
    },
    {
      field: "date",
      headerName: "Date",
      width: 200,
      renderCell: (params) => {
        return <div className="userListUser">{params.row.date}</div>;
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 120,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/admin-dashboard/exams/" + params.row.id}>
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
  if (getExamDataRes === undefined || getExamDataRes === {}) {
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
              <span>Exams</span>
              <Link to={"/admin-dashboard/create-exam"}>
                <button>Create</button>
              </Link>
            </header>
            <DataGrid
              rows={getExamDataRes}
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
