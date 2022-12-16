import React from 'react';
import "./SideNavBar.css";

const SideNavBar = () => {
    const [isExpended, setExpendState] = useState(false);
    const menuItems = [
        {
            text: "Dashboard",
            icon: "icons/grid.svg",
        },
        {
            text: "Admin Profile",
            icon: "icons/user.svg",
        },
        {
            text: "Messages",
            icon: "icons/message.svg",
        },
        {
            text: "Analytics",
            icon: "icons/pie-chart.svg",
        },
        {
            text: "Settings",
            icon: "icons/settings.svg",
        },
    ];
    return (
        <div className={isExpended ? "side-nav-container" : "side-nav-container side-nav-container-NX"}>
            <div className="nav-upper">
                <div className="nav-heading">
                    {isExpended && (<div className="nav-brand">
                        <img src="icons/Logo.svg" alt="nav brand" />
                        <h2>SMIS</h2>
                    </div>
                    )}
                    <button
                        className={
                            isExpended ? "hamburger hamburger-in" : "hamburger hamburger-out"
                        }
                        onClick={() => setExpendState(!isExpended)}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
                <div className="nav-menu">{menuItems.map(({ text, icon }) => <a href="#" className={isExpended ? "menu-item" : "menu-item menu-item-NX"}>
                    <img src={icon} alt="" srcset="" />
                    {isExpended && <p>{text}</p>}
                    {!isExpended && <div className="tooltip">{text}</div>}
                </a>
                )}
                </div>
            </div>
            <div className="nav-footer">
                {isExpended && (<div className="nav-details">
                    <img src="icons/admin-avatar.svg" alt="" srcset="" />
                    <div className="nav-footer-info">
                        <p className="nav-footer-user-name">SMIS</p>
                        <p className="nav-footer-user-position">Teacher</p>
                    </div>
                </div>)}
                <img className="logout-icon" src="icons/logout.svg" alt="" srcset="" />
            </div>
        </div >
    );
};

export default SideNavBar;