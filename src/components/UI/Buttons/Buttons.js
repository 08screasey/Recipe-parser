import React from "react";
import "./Buttons.css";

const button = (props) => {
	let buttonClasses = ["btn"];

	switch (props.btnType) {
		case "green":
			buttonClasses = ["btn", "btnGreen"];
			break;
		case "dark-green-small":
			buttonClasses = ["btn", "btnDarkGreen", "btn-sm"];
			break;
		case "red":
			buttonClasses = ["btn", "btnRed"];
			break;
		default:
			return;
	}

	if (props.block) {
		buttonClasses.push("btn-block");
	}

	return (
		<button
			disabled={props.disabled}
			onClick={props.clicked}
			type={props.btn}
			className={buttonClasses.join(" ")}
		>
			{props.children}
		</button>
	);
};

export default button;
