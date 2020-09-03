import React from "react";
import { connect } from "react-redux";
import "./UserAccountInfo.css";
import Input from "../../../components/UI/Input/Input";
import Button from "../../../components/UI/Buttons/Buttons";
import * as actions from "../../../store/actions/index";
import Aux from "../../../hoc/Auxilliary";

class UserAccountInfo extends React.Component {
	state = {
		name: "",
		recipeTags: [],
		editMode: false,
		addTag: false,
		newTag: "",
	}

	componentDidMount() {
		this.setState((prevState) => {
			return { ...prevState, ...this.props.userData };
		});
	}

	switchModeHandler = () => {
		this.setState((prevState) => {
			return { editMode: !prevState.editMode };
		});
	}

	handleFormSubmit = (e) => {
		e.preventDefault();
		const userData = {
			name: this.state.name,
			recipeTags: this.state.recipeTags,
		};
		this.props.onUpdateUserData(
			this.props.userId,
			this.props.idToken,
			userData
		);
	}

	removeTagHandler = (index) => {
		const tagCopy = [...this.state.recipeTags];
		tagCopy.splice(index, 1);
		this.setState({ recipeTags: tagCopy });
	}

	handleInputChange = (e, identifier) => {
		const updatedState = { ...this.state };
		updatedState[identifier] = e.target.value;
		this.setState(updatedState);
	}

	handleTagToggler = () => {
		this.setState((prevState) => {
			return { addTag: !prevState.addTag };
		});
	}

	handleAddTag = () => {
		if (this.state.newTag.length > 0) {
			const newTags = this.state.recipeTags.concat(this.state.newTag);
			this.setState({ addTag: false, newTag: "", recipeTags: newTags });
		}
	}

	render() {
		let content = (
			<div className="UserData position-relative">
				<div className="position-absolute UserDataEdit">
					<i
						className="fas fa-pencil-alt pencil-green"
						onClick={this.switchModeHandler}
					></i>
				</div>
				<p>
					{" "}
					<span className="Green">Username:</span> {this.state.name}
				</p>
				<ul className="Tags">
					{this.state.recipeTags.map((tag) => {
						return (
							<li
								className={
									this.props.tagClasses.indexOf(tag) !== -1
										? "Selected Tag"
										: "Default Tag"
								}
								onClick={() => this.props.tagFilter(tag)}
								key={tag}
							>
								{tag}
							</li>
						);
					})}
				</ul>
			</div>
		);

		if (this.state.editMode) {
			content = (
				<div className="UserData position-relative">
					<div className="position-absolute UserDataEdit">
						<i
							className="fas fa-times-circle pencil-red"
							onClick={this.switchModeHandler}
						></i>
					</div>
					<form onSubmit={this.handleFormSubmit}>
						<Input
							value={this.state.name}
							label="Username:"
							inputConfig={{ type: "text", required: true }}
							changed={(event) =>
								this.handleInputChange(event, "name")
							}
						/>
						<div className="row">
							<div className="col-md-12">
								<ul className="Tags Remove" style={{padding:"20px"}}>
									{this.state.recipeTags.map((tag, index) => {
										return (
											<li key={tag + index} className="Tag">
												
													
												
												<span onClick={() =>
														this.removeTagHandler(
															index
														)
													} className="RemoveTagHandler">
					<i className="fas fa-times-circle"></i>
				</span>
												{" "}
												{tag}
											</li>
										);
									})}
									<li className="Tag">
									<div className="d-flex align-items-center h-100 newTag ">
										<input
													value={this.state.newTag}
													
														type="text"
														placeholder="New Tag"
											
													onChange={(event) =>
														this.handleInputChange(
															event,
															"newTag"
														)
													}
												/>
												<i class="fas ml-1 fa-plus-circle" style={{fontSize:"22px", cursor:"pointer", color:"hsla(112, 44%, 42%, 1)"}} onClick={()=>this.handleAddTag()}></i>
									</div>
									</li>
								</ul>
							</div>
						</div>

						<div className="d-flex mt-2 justify-content-center">
							<Button btnType="green">Save Changes</Button>
						</div>
					</form>
				</div>
			);
		}

		return content;
	}
}

const mapStateToProps = (state) => {
	return {
		userData: state.user.userData,
		idToken: state.auth.idToken,
		userId: state.auth.userId,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onUpdateUserData: (userId, idToken, userData) =>
			dispatch(actions.updateUserData(userId, idToken, userData)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserAccountInfo);
