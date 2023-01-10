import React from 'react';
import { useState } from 'react';
import "./Sidebar.css";
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const [isExpended, setExpendState] = useState(false);
    const menuItems = [
        {
            text: "Dashboard",
            icon: "icons/grid.svg",
            link: "/",
            alt: "dashboard",
        },
        {
            text: "Students",
            icon: "icons/user-graduate.svg",
            link: "/students",
            alt: "students",
        },
        {
            text: "Teachers",
            icon: "icons/teacher.svg",
            link: "/teachers",
            alt: "teachers",
        },
        {
            text: "Departments",
            icon: "icons/departments.svg",
            link: "/departments",
            alt: "departments",
        },
        {
            text: "Subjects",
            icon: "icons/subjects.svg",
            link: "/subjects",
            alt: "subjects",
        },
        {
            text: "Account",
            icon: "icons/signup.svg",
            link: "/registrationform",
            alt: "registrationform",
        },
    ];
    return (
        <div className={isExpended ? "sidebar-relative" : "sidebar-relative sidebar-relative-NX"}>
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
                    <div className="nav-menu">{menuItems.map(({ text, icon, link, alt }) => <Link key={text} to={link} className={isExpended ? "menu-item" : "menu-item menu-item-NX"}>
                        <img src={icon} alt={alt} />
                        {isExpended && <p>{text}</p>}
                        {!isExpended && <div className="tooltip">{text}</div>}
                    </Link>
                    )}
                    </div>
                </div>
            </div >
        </div>
    );
};

export default Sidebar;