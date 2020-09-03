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
				<ul>
					{this.state.recipeTags.map((tag) => {
						return (
							<li
								className={
									this.props.tagClasses.indexOf(tag) !== -1
										? "Selected"
										: "Default"
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
							<div className="col-md-7">
								<ul>
									{this.state.recipeTags.map((tag, index) => {
										return (
											<li key={tag + index}>
												<span
													className="RemoveTagHandler"
													onClick={() =>
														this.removeTagHandler(
															index
														)
													}
												>
													X
												</span>{" "}
												{tag}
											</li>
										);
									})}
								</ul>
							</div>
							<div className="col-md-4 d-flex align-items-center justify-content-center">
								<div className="row justify-content-center mt-2 align-items-center">
									<div className="col d-flex justify-content-center align-items-center align-self-center">
										{this.state.addTag ? (
											<Aux>
												<Input
													value={this.state.newTag}
													inputConfig={{
														type: "text",
														required: true,
													}}
													changed={(event) =>
														this.handleInputChange(
															event,
															"newTag"
														)
													}
												/>
												<button
													onClick={this.handleAddTag}
													className="btn btn-addTag ml-2 mt-2"
												>
													+
												</button>
											</Aux>
										) : (
											<Button
												clicked={this.handleTagToggler}
												btnType="dark-green-small"
											>
												New Tag
											</Button>
										)}
									</div>
								</div>
							</div>
						</div>

						<div className="d-flex mt-2 justify-content-center">
							<Button btnType="green">Save</Button>
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
