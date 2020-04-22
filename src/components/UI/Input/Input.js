import React from 'react';
import './Input.css';

const input = (props) => {
	
	const inputClasses = ["Input", "form-control"];
	let small = null

	if(props.invalid && props.touched && props.reqValidation){
		inputClasses.push("Invalid")
		small = <small>Please enter a valid {props.inputConfig.type}</small>
	}	

	let input = null;

	switch (props.inputType){
		case 'input':
		input = <input 
		className={inputClasses.join(" ")}
		onChange={props.changed}
		value={props.value}
		style={{width:props.width + 'px'}}
		{...props.inputConfig}
		/>;
		break;
		case 'textarea':
		input = <textarea
		className={inputClasses.join(" ")}
		onChange={props.changed}
		value={props.value}
		{...props.inputConfig}
		style={{width:props.width + 'px',
		fontSize:props.fontSize}}
		/>;
		break;
		default:
		input = <input 
		className={inputClasses.join(" ")}
		onChange={props.changed}
		value={props.value}
		{...props.inputConfig}
		style={{width:props.width + 'px'}}
		/>;
		break;
	}

	return (<div className="mt-2 InputGroup">
			{props.label? <label>{props.label}</label> : null}
			{input}
			{small}
			</div>)

}

export default input;