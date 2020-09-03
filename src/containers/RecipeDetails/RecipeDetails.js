import React from "react";
import RecipePreview from "../../components/Recipe/RecipePreview/RecipePreview";
import RecipeEdit from "./RecipeEdit/RecipeEdit";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/index";
import axios from "axios";
import Loader from "../../components/UI/Loader/Loader";
import { Redirect, withRouter } from "react-router-dom";
import ErrorAlert from "../../components/UI/Error/Error";
class RecipeDetails extends React.Component {
	state = {
		viewMode: "preview",
		recipe: {
			title: "",
			readyInMinutes: "",
			servings: "",
			imageURL: "",
			sourceUrl: "",
			instructions: [],
			ingredients: [],
			tags: [],
			notes: null,
		},
		loading: false,
		servingsModifier: 0,
		error: null,
	}

	handleChangeMode = () => {
		this.setState((prevstate) => {
			return {
				viewMode: prevstate.viewMode === "preview" ? "edit" : "preview",
				error: null,
			};
		});
	}
	deleteRecipeHandler = () => {
		this.setState({ loading: true, error: null });
		axios
			.delete(
				`https://react-recipe-project-87fc0.firebaseio.com/recipes/${this.state.recipe.id}.json?auth=${this.props.idToken}`
			)
			.then((result) => {
				this.setState({ loading: false });
				this.props.onDeleteRecipe(this.props.id);
				this.props.deleteRecipe();
				this.props.history.push("/user");
			})
			.catch((error) => {
				this.setState({ error: error, loading: false });
			});
	}
	componentDidMount() {
		let initRecipe = { ...this.state.recipe };
		this.setState({
			recipe: {
				...initRecipe,
				...this.props.recipe,
				userId: this.props.userId,
			},
		});
	}

	handleInputChange = (event, identifier) => {
		let updatedRecipe = { ...this.state.recipe };
		updatedRecipe[identifier] = event.target.value;
		this.setState({ recipe: updatedRecipe });
	}

	handleFormSubmit = () => {
		if (this.props.savedRecipe) {
			this.setState({ loading: true, error: null });
			axios
				.put(
					`https://react-recipe-project-87fc0.firebaseio.com/recipes/${this.state.recipe.id}.json?auth=${this.props.idToken}`,
					this.state.recipe
				)
				.then((result) => {
					this.handleChangeMode();
					this.setState({ loading: false });
					this.props.onUpdateRecipe(this.props.id, this.state.recipe);
				})
				.catch((err) => {
					this.setState({ error: err });
				});
		} else {
			this.handleChangeMode();
		}
	}

	handleIngredientsChange = (event, identifier, index) => {
		let updatedRecipe = { ...this.state.recipe };
		let updatedIngredients = [...this.state.recipe.ingredients];
		updatedIngredients[+index][identifier] = event.target.value;
		updatedRecipe.ingredients = updatedIngredients;
		this.setState({ recipe: updatedRecipe });
	}

	handleInstructionsChange = (event) => {
		let updatedRecipe = { ...this.state.recipe };
		let updatedInstructions = event.target.value.split("\n");
		updatedRecipe.instructions = updatedInstructions;
		this.setState({ recipe: updatedRecipe });
	}

	handleAddInstructions = () => {
		let updatedRecipe = { ...this.state.recipe };
		let updatedInstructions = [""];
		updatedRecipe.instructions = updatedInstructions;
		this.setState({ recipe: updatedRecipe });
	}

	handleAddIngredient = () => {
		let updatedRecipe = { ...this.state.recipe };
		let updatedIngredients = this.state.recipe.ingredients.concat({
			amount: "",
			unit: "",
			originalName: "",
		});
		updatedRecipe.ingredients = updatedIngredients;
		this.setState({ recipe: updatedRecipe });
	}

	handleRemoveIngredient = (id) => {
		let updatedRecipe = { ...this.state.recipe };
		let updatedIngredients = [...this.state.recipe.ingredients];
		updatedIngredients.splice(id, 1);
		updatedRecipe.ingredients = updatedIngredients;
		this.setState({ recipe: updatedRecipe });
	}

	handleOnAddRecipe = () => {
		this.props.onAddCustomRecipe(this.state.recipe, this.props.idToken);
	}

	handleServingsChange = (num) => {
		this.setState((prevstate) => {
			return { servingsModifier: prevstate.servingsModifier + num };
		});
	}

	tagToggleHandler = (tag) => {
		if (this.props.authenticated) {
			const newRecipe = { ...this.state.recipe };
			const newRecipeTags = [...newRecipe.tags];
			const tagIndex = newRecipeTags.indexOf(tag);
			if (tagIndex === -1) {
				newRecipeTags.push(tag);
			} else {
				newRecipeTags.splice(tagIndex, 1);
			}
			newRecipe.tags = newRecipeTags;
			this.setState({ recipe: newRecipe });
		}
	}

	handleUnAuthenticated = () => {
		this.props.history.push("/auth");
	}
	removeNotesHandler = () => {
		let updatedRecipe = { ...this.state.recipe };
		updatedRecipe.notes = null;
		this.setState({ recipe: updatedRecipe });
	}
	handleNotesChange = (event) => {
		let updatedRecipe = { ...this.state.recipe };
		if (!event || !event.target.value) {
			updatedRecipe.notes = [""];
			this.setState({ recipe: updatedRecipe });
		} else {
			updatedRecipe.notes = event.target.value.split("\n");
			this.setState({ recipe: updatedRecipe });
		}
	}

	render() {
		let content = (
			<RecipePreview
				unAuthenticated={this.handleUnAuthenticated}
				servings={
					+this.state.recipe.servings + this.state.servingsModifier
				}
				changeServings={(num) => this.handleServingsChange(num)}
				saved={this.props.savedRecipe}
				saveRecipe={this.handleOnAddRecipe}
				changeMode={this.handleChangeMode}
				recipe={this.state.recipe}
			/>
		);
		if (this.state.viewMode === "edit") {
			content = (
				<RecipeEdit
					recipe={this.state.recipe}
					isSaved={this.props.savedRecipe}
					deleteRecipe={this.deleteRecipeHandler}
					tagToggleSelect={(tag) => this.tagToggleHandler(tag)}
					instructionsChange={(event) =>
						this.handleInstructionsChange(event)
					}
					ingredientsChange={(event, identifier, index) =>
						this.handleIngredientsChange(event, identifier, index)
					}
					inputChange={(event, identifier) =>
						this.handleInputChange(event, identifier)
					}
					addInstructions={this.handleAddInstructions}
					addNotes={(e) => this.handleNotesChange()}
					notesChange={(event) => this.handleNotesChange(event)}
					formSubmit={this.handleFormSubmit}
					addIngredient={this.handleAddIngredient}
					removeIngredient={(id) => this.handleRemoveIngredient(id)}
					removeNotes={this.removeNotesHandler}
				/>
			);
		}
		if (this.props.submitted) {
			content = <Redirect to="/user" />;
		}
		return (
			<div className="RecipeDetails">
				{this.state.error !== null ? (
					<ErrorAlert
						error={{
							code: "400",
							message:
								"There was trouble trying to process your request",
						}}
					/>
				) : this.state.loading ? (
					<Loader />
				) : (
					content
				)}
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onUpdateRecipe: (recipe, id, idToken) =>
			dispatch(actionCreators.updateRecipe(recipe, id, idToken)),
		onAddCustomRecipe: (recipe, authToken) =>
			dispatch(actionCreators.addCustomRecipe(recipe, authToken)),
		onDeleteRecipe: (id) => dispatch(actionCreators.deleteRecipe(id)),
	};
};

const mapStateToProps = (state) => {
	return {
		submitted: state.user.submitted,
		idToken: state.auth.idToken,
		userId: state.auth.userId,
		authenticated: state.auth.idToken !== null,
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(RecipeDetails));
