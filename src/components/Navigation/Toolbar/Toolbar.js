import React from "react";
import "./Toolbar.css";
import NavItems from "../NavItems/NavItems";
import Logo from "../../UI/Logo/Logo";
import DrawerToggle from "./DrawerToggle/DrawerToggle";

const Toolbar = (props) => {
	return (
		<header className="Toolbar d-flex  justify-content-between align-items-center px-3">
			<Logo height="80%" className="DesktopOnly" />
			<DrawerToggle clicked={props.toggleSideBar} />
			<nav className="DesktopOnly">
				<NavItems />
			</nav>
		</header>
	);
};

export default Toolbar;
