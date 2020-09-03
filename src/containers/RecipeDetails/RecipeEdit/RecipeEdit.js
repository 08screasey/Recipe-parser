import React from "react";
import Input from "../../../components/UI/Input/Input";
import Button from "../../../components/UI/Buttons/Buttons";
import "./RecipeEdit.css";
import { connect } from "react-redux";
import Aux from "../../../hoc/Auxilliary";

class RecipeEdit extends React.Component {
	state = { removeIngredient: false }

	handleRemoveIngredientToggler = () => {
		this.setState((prevState) => {
			return { removeIngredient: !prevState.removeIngredient };
		});
	}

	handleFormSubmission = (e) => {
		e.preventDefault();
		this.props.formSubmit();
	};

	render() {
		let variableCol = "col-7";
		let formIngredients = null;

		if (this.state.removeIngredient) {
			variableCol = "col-5";
		}

		if (this.props.recipe.ingredients) {
			formIngredients = this.props.recipe.ingredients.map(
				(ingredient, index) => {
					return (
						<div
							className="form-row Ingredients"
							key={"div" + index}
						>
							<div className="col-2" key={ingredient.amount}>
								<Input
									value={ingredient.amount.toString()}
									label="Qty"
									inputConfig={{
										type: "text",
										inputMode: "decimal",
										required: true,
									}}
									changed={(event) =>
										this.props.ingredientsChange(
											event,
											"amount",
											index
										)
									}
								/>
							</div>
							<div className="col-3">
								<Input
									value={ingredient.unit}
									label="Unit"
									inputConfig={{ type: "text" }}
									changed={(event) =>
										this.props.ingredientsChange(
											event,
											"unit",
											index
										)
									}
								/>
							</div>
							<div className={variableCol}>
								<Input
									value={ingredient.originalName}
									label="Ing"
									inputConfig={{
										type: "text",
										required: true,
									}}
									changed={(event) =>
										this.props.ingredientsChange(
											event,
											"originalName",
											index
										)
									}
								/>
							</div>
							{this.state.removeIngredient ? (
								<div
									className="col-auto d-flex align-items-center pt-4"
									key={"button" + index}
								>
									<i
										className="fas fa-times-circle InstructionRemover toggler"
										onClick={() =>
											this.props.removeIngredient(index)
										}
									></i>
								</div>
							) : null}
						</div>
					);
				}
			);
		}

		return (
			<form onSubmit={(e) => this.handleFormSubmission(e)}>
				<Input
					value={this.props.recipe.title}
					label="Title:"
					inputConfig={{ type: "text" }}
					changed={(event) => this.handleInputChange(event, "title")}
				/>
				<div className="form-row">
					<div className="col-6">
						<Input
							value={
								this.props.recipe.servings > 0
									? this.props.recipe.servings.toString()
									: "0"
							}
							label="Servings:"
							inputType="input"
							inputConfig={{ type: "number" }}
							changed={(event) =>
								this.props.inputChange(event, "servings")
							}
						/>
					</div>
					<div className="col-6">
						<Input
							value={
								this.props.recipe.readyInMinutes > 0
									? this.props.recipe.readyInMinutes.toString()
									: "0"
							}
							label="Ready in:"
							inputType="input"
							inputConfig={{ type: "number", step: "5" }}
							changed={(event) =>
								this.props.inputChange(event, "readyInMinutes")
							}
						/>
					</div>
				</div>
				<Input
					value={this.props.recipe.imageURL}
					label="Image URL:"
					inputType="input"
					inputConfig={{ type: "text" }}
					changed={(event) =>
						this.props.inputChange(event, "imageURL")
					}
				/>
				<img
					src={this.props.recipe.imageURL}
					alt=""
					width="150px"
					className="mt-3 mx-auto d-block"
				/>
				<hr />
				<div className="d-flex justify-content-around align-items-center">
					<p style={{ margin: "0" }}>Ingredients:</p>
					<i
						className="fas fa-plus greenButton toggler"
						onClick={this.props.addIngredient}
					></i>
					<i
						className="fas fa-times-circle redButton toggler"
						onClick={this.handleRemoveIngredientToggler}
					></i>
				</div>

				{formIngredients}
				<hr />
				<div className="Instructions">
					{this.props.recipe.instructions ? (
						<Input
							fontSize="14px"
							value={this.props.recipe.instructions.join("\n")}
							label="Instructions:"
							inputType="textarea"
							inputConfig={{ rows: "10" }}
							changed={(event) =>
								this.props.instructionsChange(event)
							}
						/>
					) : (
						<Button
							btnType="dark-green-small"
							btn="Button"
							clicked={this.props.addInstructions}
						>
							Add Instructions +
						</Button>
					)}
					<hr />
					{this.props.recipe.notes ? (
						<Aux>
							<i
								className="fas fa-times-circle position-absolute pencil-red"
								style={{ right: "20px" }}
								onClick={this.props.removeNotes}
							></i>
							<Input
								fontSize="14px"
								value={this.props.recipe.notes.join("\n")}
								label="My Notes:"
								inputType="textarea"
								inputConfig={{ rows: "6" }}
								changed={(event) =>
									this.props.notesChange(event)
								}
							/>
						</Aux>
					) : (
						<Button
							btnType="dark-green-small"
							btn="Button"
							clicked={this.props.addNotes}
						>
							Add Notes +
						</Button>
					)}

					<ul className="d-flex flex-wrap Tags">
						{this.props.authenticated ? (
							this.props.tags.map((tag, index) => {
								return (
									<li
										onClick={() =>
											this.props.tagToggleSelect(tag)
										}
										className={
											this.props.recipe.tags.indexOf(
												tag
											) > -1
												? "SelectedTag"
												: "DefaultTag"
										}
										key={tag + index}
									>
										{tag}
									</li>
								);
							})
						) : (
							<p>Sign in to add tags</p>
						)}
					</ul>
					<div className="d-flex justify-content-around mt-2">
						{this.props.authenticated && this.props.isSaved ? (
							<Button
								btnType="red"
								btn="button"
								clicked={this.props.deleteRecipe}
							>
								Delete Recipe
							</Button>
						) : null}
						<Button btnType="green">Submit</Button>
					</div>
				</div>
			</form>
		);
	}
}

const mapStatetoProps = (state) => {
	return {
		tags: state.user.userData.recipeTags,
		authenticated: state.auth.idToken !== null,
	};
};

export default connect(mapStatetoProps)(RecipeEdit);
