import React from 'react';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Sidepanel from '../../components/Navigation/Sidepanel/Sidepanel';
import './Layout.css';
class Layout extends React.Component {

	state={showSideBar:false}

	handleSidebarToggler = () =>{
		this.setState(prevState=>{
			return{showSideBar:!prevState.showSideBar}
		})
	}
	
	handleCloseSidePanel = () => {
		this.setState({showSideBar:false})
	}

	render(){
		return (<div>
					<Toolbar toggleSideBar={this.handleSidebarToggler}/>
					<Sidepanel show={this.state.showSideBar} clicked={this.handleCloseSidePanel} closeSidePanel={this.handleCloseSidePanel}/>
					<main className="Main container-fluid">
						{this.props.children}
					</main>
				</div>
		)
	}

}

export default Layout;