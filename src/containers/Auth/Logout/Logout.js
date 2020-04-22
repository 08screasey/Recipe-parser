import React from 'react';
import * as actions from '../../../store/actions/index';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux'

class logout extends React.Component{
	componentWillMount(){
		this.props.onLogout()
	}
	render(){return <Redirect to="/auth" />}
}
const mapDispatchToProps = dispatch => {
	return {
		onLogout: () => dispatch(actions.logout())
	}
}

export default connect(null,mapDispatchToProps)(logout);