import React, { Component } from "react";
import { connect } from "react-redux";
import RecipeDetails from "../RecipeDetails/RecipeDetails";
import "./Add.css";
import * as actionCreators from "../../store/actions/index";
import Button from "../../components/UI/Buttons/Buttons";
import Loader from "../../components/UI/Loader/Loader";
import { Redirect } from "react-router-dom";
import ErrorAlert from "../../components/UI/Error/Error";

class Add extends Component {
	state = { recipe: null, addRecipeUrl: "" }

	handleFormSubmit = (e) => {
		e.preventDefault();
		this.props.onFetchCustomRecipe(this.state.addRecipeUrl);
	}

	handleInputChange = (event) => {
		this.setState({ addRecipeUrl: event.target.value });
	}

	componentWillUnmount() {
		this.props.onClearAddForm();
	}

	render() {
		let content = this.props.submitted ? (
			<Redirect to="/user" />
		) : this.props.loading ? (
			<Loader />
		) : this.props.error ? (
			<ErrorAlert error={this.props.error} />
		) : this.props.recipe ? (
			<div className="Preview">
				<RecipeDetails recipe={this.props.recipe} />
			</div>
		) : null;

		return (
			<div className={this.props.recipe ? "Add Result" : "Add"}>
				<div className="row">
					<div
						className="col-12 d-flex justify-content-center"
						style={{ height: "40px" }}
					>
						<form onSubmit={(e) => this.handleFormSubmit(e)}>
							<div className="d-flex align-content-center">
								<input
									type="text"
									onChange={(e) => this.handleInputChange(e)}
									placeholder="Paste Your URL here"
									value={this.state.addRecipeUrl}
									className="mr-2 URL"
								/>
								<Button btnType="green" disabled={false}>
									Submit
								</Button>
							</div>
						</form>
					</div>
				</div>

				{content}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		recipe: state.user.addCustomRecipe,
		loading: state.user.loading,
		submitted: state.user.submitted,
		error: state.user.error,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onFetchCustomRecipe: (url) =>
			dispatch(actionCreators.fetchCustomRecipe(url)),
		onAddCustomRecipe: (recipe) =>
			dispatch(actionCreators.addCustomRecipe(recipe)),
		onClearAddForm: () => dispatch(actionCreators.clearAddForm()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Add);
