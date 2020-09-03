import React from "react";
import Backdrop from "../Backdrop/Backdrop";
import "./Modal.css";
import Aux from "../../../hoc/Auxilliary";

const modal = (props) => {
	return (
		<Aux>
			<Backdrop show={props.showModal} clicked={props.closeModal} />
			<div
				className="Modal"
				style={{
					transform: props.showModal
						? "translateY(0)"
						: "translateY(-120%)",
					...props.styles,
				}}
			>
				<button onClick={props.closeModal} className="ModalCloseBtn">
					<i className="fas fa-times-circle"></i>
				</button>
				{props.children}
			</div>
		</Aux>
	);
};
export default modal;
