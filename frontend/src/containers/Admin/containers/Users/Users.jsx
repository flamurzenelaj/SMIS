import "./Users.scss";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import DashboardWrapper from "../../DashboardWrapper";
import useGetUser from "../../../../api/User/useGetUser";
import { CustomSpinner } from "../../../../components";

export default function Users() {
  const { loading, error, response: getUserDataRes } = useGetUser();

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 20,
      renderCell: (params) => {
        <div className="userListUser">{params.row.id}</div>;
      },
    },
    {
      field: "uid",
      headerName: "UID",
      width: 200,
      renderCell: (params) => {
        <div className="userListUser">{params.row.uid}</div>;
      },
    },
    {
      field: "username",
      headerName: "Username",
      width: 200,
      renderCell: (params) => {
        <div className="userListUser">{params.row.username}</div>;
      },
    },
    {
      field: "role",
      headerName: "Role",
      width: 150,
      renderCell: (params) => {
        return <div className="userListUser">{params.row.role}</div>;
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/admin-dashboard/user/" + params.row.uid}>
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
  if (getUserDataRes === undefined || getUserDataRes === {}) {
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
              <span>Users</span>
              <Link to={"/admin-dashboard/create-user"}>
                <button>Create</button>
              </Link>
            </header>
            <DataGrid
              rows={getUserDataRes.users}
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
