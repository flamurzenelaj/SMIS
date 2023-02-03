import "./sidebar.css";
import { LineStyle  } from "@material-ui/icons";
import GroupIcon from '@mui/icons-material/Group';
import Groups2Icon from '@mui/icons-material/Groups2';
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import ChatIcon from '@material-ui/icons/Chat';
import { Link, useLocation } from "react-router-dom";
import cs from "classnames";

export default function Sidebar() {
  const location = useLocation();

  const home = {
    title: "Home",
    icon: <LineStyle className="sidebarIcon" />,
    path: "/admin-dashboard",
  };

  const list = [
    {
      title: "Users",
      icon: <GroupIcon className="sidebarIcon" />,
      path: "users",
    },
    {
      title: "Departments",
      icon: <TravelExploreIcon className="sidebarIcon" />,
      path: "departments",
    },
    {
      title: "Students",
      icon: <Groups2Icon className="sidebarIcon" />,
      path: "students",
    },
    {
      title: "Teachers",
      icon: <AccessibilityNewIcon className="sidebarIcon" />,
      path: "teachers",
    },
    {
      title: "Subjects",
      icon: <MenuBookIcon className="sidebarIcon" />,
      path: "subjects",
    },
    {
      title: "Chatbot Data",
      icon: <ChatIcon className="sidebarIcon" />,
      path: "chatbot",
    },
    {
      title: "Exams",
      icon: <ChatIcon className="sidebarIcon" />,
      path: "exams",
    },
  ];
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to={home.path} className="link">
              <li
                className={cs({
                  ["sidebarListItem"]: true,
                  ["active"]: location.pathname === home.path,
                })}
              >
                {home.icon}
                {home.title}
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            {list.map((item, index) => (
              <Link
                key={`${item.title}-key-${index}`}
                to={`/admin-dashboard/${item.path}`}
                className="link"
              >
                <li
                  className={cs({
                    ["sidebarListItem"]: true,
                    ["active"]: location.pathname.includes(item.path),
                  })}
                >
                  {item.icon}
                  {item.title}
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
