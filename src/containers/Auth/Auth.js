import React, {Component} from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Buttons/Buttons';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import {Redirect} from 'react-router-dom';
import ErrorAlert from '../../components/UI/Error/Error';
import Loader from '../../components/UI/Loader/Loader';
import './Auth.css'

class Auth extends Component{

	state={controls:{email:{
		type:'email',
		placeholder: 'Enter Your Email',
		valid:false,
		touched:false,
		validation:{required:true,
			email:true},
		value:''
	},password:{
		type:'password',
		placeholder: 'Enter Your Password',
		valid:false,
		touched:false,
		validation:{required:true,
			minLength:6},
		value:''
	}},
	formValid:false,
isSignUp:false,
}


	checkValidity(value, rules){
		let valid = true;
		if(rules.required && valid){
			valid = value.trim() !== ""
			}
		if (rules.minLength && valid){
		
			valid = value.length >= rules.minLength 	
		}	
		if (rules.email && valid){
			 var re = /\S+@\S+\.\S+/;
        valid =  re.test(value);
		}
		return valid

	}
	
	handleInputChange(event, identifier){
		const newStateControls = {...this.state.controls};
		const newControl = {...this.state.controls[identifier]};
		newControl.value = event.target.value;
		newControl.touched = true;
		newControl.valid = this.checkValidity(event.target.value, newControl.validation);
		newStateControls[identifier] = newControl;
		let formValid = true;
		for (let key in newStateControls){
			if(formValid){
				formValid = newStateControls[key].valid;	
			}
		}
		this.setState({controls:newStateControls,formValid:formValid})
	}
		
	handleSwitchMode = () => {
		this.setState(prevState=>{
			return{
				isSignUp: !prevState.isSignUp
			}})
	}	

	
	handleAuthFormSubmit = (e) => {
		e.preventDefault();
		const userData = {password:this.state.controls.password.value,
			email:this.state.controls.email.value,
			returnSecureToken:true}
	 this.props.onAuth(userData, this.state.isSignUp)
	
	}

	render(){
		let redirection = null;
		if(this.props.authenticated){
			redirection = <Redirect to='/user' />
		}
		
		return (
			<div
			 className="Auth">
			{redirection}
			{this.props.error? <ErrorAlert error={this.props.error}/>: null}
			{this.props.loading ? <Loader /> :
			<form onSubmit={(e)=>this.handleAuthFormSubmit(e)} autoComplete="on">
				<Input value={this.state.controls.email.value} 
			label="Email:" 
			inputConfig={{type:this.state.controls.email.type,
				placeholder	:this.state.controls.email.placeholder}}
			invalid={!this.state.controls.email.valid}
			reqValidation 
			touched = {this.state.controls.email.touched}
			changed={(event)=>this.handleInputChange(event, 'email')}/>
			<Input value={this.state.controls.password.value} 
			label={this.state.isSignUp ? "Password (min-length 6 characters):" : "Password:" } 
			inputConfig={{type:this.state.controls.password.type,
				placeholder	:this.state.controls.password.placeholder}}
			invalid={!this.state.controls.password.valid}
			reqValidation 
			touched={this.state.controls.password.touched}
			changed={(event)=>this.handleInputChange(event, 'password')}/>
			<div className="d-flex justify-content-center w-100 mt-3">	
						<Button btnType="green" block disabled={!this.state.formValid}>{this.state.isSignUp ? "Signup" : "Login"}</Button>
			</div>
			<small className="mt-2 d-block text-center" style={{color:"rgba(40,90,200,0.7)", textDecoration:"underline"}} onClick={this.handleSwitchMode}>{this.state.isSignUp ? "Already Registered? Switch to Login" : "Not Registered? Click to Signup"}</small>
			</form>}
		</div>
		)
	}
};

const mapDispatchToProps = dispatch => {
	return {
		onAuth: (userData, isSignUp) => dispatch(actions.auth(userData, isSignUp))
	}
}

const mapStateToProps = state  => {
	return {authenticated: state.auth.idToken !== null,
		error:state.auth.error,
		loading:state.auth.loading}
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);