import "./Chatbots.scss";
import { DataGrid } from "@material-ui/data-grid";
import { Link } from "react-router-dom";
import DashboardWrapper from "../../DashboardWrapper";
import useGetChatbot from "../../../../api/Chatbot/useGetChatbot";
import { CustomSpinner } from "../../../../components";

export default function Chatbots() {
  const { loading, response: getChatbotDataRes } = useGetChatbot();

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
      field: "question",
      headerName: "Question",
      width: 400,
      renderCell: (params) => {
        <div className="userListUser">{params.row.question}</div>;
      },
    },
    {
      field: "response",
      headerName: "Response",
      width: 400,
      renderCell: (params) => {
        return <div className="userListUser">{params.row.response}</div>;
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 120,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/admin-dashboard/chatbot/" + params.row.id}>
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
  if (getChatbotDataRes === undefined || getChatbotDataRes === {}) {
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
              <span>Chatbot Data</span>
              <Link to={"/admin-dashboard/create-chatbot"}>
                <button>Create</button>
              </Link>
            </header>
            <DataGrid
              rows={getChatbotDataRes}
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