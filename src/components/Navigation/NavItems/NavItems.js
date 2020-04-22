import React from 'react';
import './NavItems.css';
import NavItem from './NavItem/NavItem';
import {connect} from 'react-redux';
import Aux from '../../../hoc/Auxilliary';

const navItems = (props) => {
	return (<ul className="NavItems">
		
		{!props.authenticated ? 
			<Aux>
			<NavItem link="/search">Search</NavItem>
			<NavItem link="/auth">Login/SignUp</NavItem>
			</Aux>

		 : 	<Aux>
				 <NavItem link="/user">My Account</NavItem>
				<NavItem link="/add">Add New Recipe</NavItem>
				<NavItem link="/search">Search</NavItem>
				<NavItem link="/logout">Logout</NavItem>
			</Aux>}
			
			</ul>)
};

const mapStateToProps = state => {
	return{authenticated: state.auth.idToken !== null}
}

export default connect(mapStateToProps)(navItems);