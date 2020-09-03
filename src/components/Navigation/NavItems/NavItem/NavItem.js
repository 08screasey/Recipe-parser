import React from "react";
import "./NavItem.css";
import { NavLink } from "react-router-dom";

const NavItem = (props) => {
	return (
		<li className="NavItem">
			<NavLink exact activeClassName={"ActiveNavItem"} to={props.link}>
				{props.children}
			</NavLink>
		</li>
	);
};

export default NavItem;
