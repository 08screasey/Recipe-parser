import React from "react";

const errorAlert = (props) => {
	return (
		<div className="alert mt-3 alert-danger fade show" role="alert">
			<strong>ERROR {props.error.code}: </strong>{" "}
			{props.error.message.error
				? props.error.message.error
				: props.error.message
				? props.error.message
				: "Something Went Wrong"}
		</div>
	);
};

export default errorAlert;
