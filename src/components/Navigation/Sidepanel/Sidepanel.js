import React from "react";
import "./Sidepanel.css";
import NavItems from "../NavItems/NavItems";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../hoc/Auxilliary";

const Sidepanel = (props) => {
	let styleClasses = ["Sidepanel", "Sidepanel-Closed"];
	if (props.show) {
		styleClasses = ["Sidepanel", "Sidepanel-Open"];
	}

	return (
		<Aux>
			<Backdrop show={props.show} clicked={props.closeSidePanel} />
			<div className={styleClasses.join(" ")} onClick={props.clicked}>
				<h1 className="Green">Recipe Finder</h1>
				<NavItems />
			</div>
		</Aux>
	);
};

export default Sidepanel;
