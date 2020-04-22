import React from'react';

import Aux from '../Auxilliary';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
	return class extends React.Component {

		state = { error: null}

		componentWillMount(){

			this.reqInterceptor = axios.interceptors.request.use(req=>{
				this.setState({error:null});
				return req
			});
			this.resInterceptor = axios.interceptors.response.use(res => res,error => {
				console.log(error)
			this.setState({error:error})
			});
		}

		errorConfirmedHandler = () => {
			this.setState({error:null})
		}

		componentWillUnmount = () => {
			axios.interceptors.request.eject(this.reqInterceptor);
			axios.interceptors.response.eject(this.resInterceptor)
		}

		render(){
		return(<Aux>
			<Modal styles={{height:'80px',
			top:'40%','opacity': this.state.error ? '1':'0'}}
			showModal={this.state.error}
			closeModal={this.errorConfirmedHandler}>
			{this.state.error ? this.state.error.message : null}</Modal>
		 <WrappedComponent {...this.props} />
		 </Aux>)}
	}
}

export default withErrorHandler;