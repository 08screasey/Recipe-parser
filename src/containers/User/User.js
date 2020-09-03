import React, { Component } from "react";
import RecipeList from "../../components/RecipeList/RecipeList";
import "./User.css";
import Aux from "../../hoc/Auxilliary";
import RecipeDetails from "../RecipeDetails/RecipeDetails";
import Modal from "../../components/UI/Modal/Modal";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/index";
import Loader from "../../components/UI/Loader/Loader";
import UserAccountInfo from "./UserAccountInfo/UserAccountInfo";
import ErrorAlert from "../../components/UI/Error/Error";
import Info from "../../components/UI/Info/Info";
import { Waypoint } from "react-waypoint";
class User extends Component {
	state = {
		recipeSelected: false,
		selectedIndex: null,
		filterMode: false,
		filterTagList: [],
		filterList: null,
		searchFilter: "",
		searching: false,
		newUser:false
	}

	componentDidMount() {
		this.props.onFetchUserRecipes(this.props.idToken, this.props.userId);
		this.props.onFetchUserData(this.props.idToken, this.props.userId);
	}
	componentDidUpdate() {
		console.log(this.props.recipes);
	}

	handleSelectedRecipe = (id) => {
		console.log(id);
		this.setState({ selectedIndex: id, recipeSelected: true });
	}

	handleCloseRecipeDetails = () => {
		this.setState({ selectedIndex: null, recipeSelected: false });
	}

	handleSearchBar = (event) => {
		let searching = event.length > 0;
		let newFilterMode = false;
		let filteredRecipes = [];

		if (this.state.filterTagList.length > 0) {
			this.state.filterTagList.forEach((tag) => {
				const taggedRecipes = this.props.recipes.filter((recipe) => {
					if (recipe.tags) {
						return recipe.tags.indexOf(tag) !== -1;
					} else {
						return false;
					}
				});
				filteredRecipes = filteredRecipes.concat(taggedRecipes);
			});
			newFilterMode = true;
			filteredRecipes = this.checkForSearch(
				filteredRecipes,
				searching,
				event
			);
		} else if (searching) {
			newFilterMode = true;
			filteredRecipes = this.checkForSearch(
				this.props.recipes,
				searching,
				event
			);
		}

		this.setState({
			searchFilter: event,
			filterMode: newFilterMode,
			filterList: filteredRecipes,
			searching: searching,
		});
	}

	handleInfoToggle = () =>{
		this.setState((state)=>{return{newUser:!state.newUser}})
	}

	checkForSearch = (recipeList, searchState, searchValue) => {
		if (searchState) {
			return recipeList.filter((recipe) => {
				const searchTerm = new RegExp(searchValue, "i");
				return searchTerm.test(recipe.title);
			});
		} else {
			return recipeList;
		}
	}

	filterRecipesByTagHandler = (tag) => {
		const newFilteredTagList = [...this.state.filterTagList];
		let newFilterMode = false;
		const tagIndex = newFilteredTagList.indexOf(tag);
		if (tagIndex > -1) {
			newFilteredTagList.splice(tagIndex, 1);
		} else {
			newFilteredTagList.push(tag);
		}
		//updated taglist
		let newFilterList = [];

		if (newFilteredTagList.length > 0 || this.state.searching) {
			newFilterMode = true;

			if (newFilteredTagList.length > 0) {
				newFilteredTagList.forEach((tag) => {
					const taggedRecipes = this.props.recipes.filter(
						(recipe) => {
							if (recipe.tags) {
								return recipe.tags.indexOf(tag) !== -1;
							} else {
								return false;
							}
						}
					);
					newFilterList = newFilterList.concat(taggedRecipes);
				});
			} else {
				newFilterList = [...this.props.recipes];
			}
		}
		newFilterList = this.checkForSearch(
			newFilterList,
			this.state.searching,
			this.state.searchFilter
		);
		this.setState({
			filterList: newFilterList,
			filterTagList: newFilteredTagList,
			filterMode: newFilterMode,
		});
	}

	render() {
		return (
			<Aux>
				<div className="User">
					{this.props.dataLoading ? (
						<Loader />
					) : this.props.dataError ? (
						<ErrorAlert
							error={{
								code: this.props.dataError.status,
								message: this.props.dataError.data,
							}}
						/>
					) : (
						<UserAccountInfo
							tagClasses={this.state.filterTagList}
							tagFilter={(tag) =>
								this.filterRecipesByTagHandler(tag)
							}
						/>
					)}
					<div className="UserRecipesContainer">
						<div className="row align-content-center">
							<div className="col-md-6">
								<Waypoint
									onEnter={() =>
										this.setState({ header: true })
									}
									onLeave={() =>
										this.setState({ header: false })
									}
								>
									<h4
										className="pt-2"
										style={{
											opacity: this.state.header
												? "1"
												: "0",
											color: this.state.header
												? "hsl(122, 44%, 72%)"
												: "gray",
										}}
									>
										My Recipes
									</h4>
								</Waypoint>
							</div>
							<div className="col-md-6 d-flex align-items-center">
								<div className="d-flex align-items-center mx-auto mt-3 w-100 justify-content-center">
									<div
										className="col-auto"
										style={{ height: "50px" }}
									>
										<div className="input-group ">
											<div
												className="input-group-prepend"
												style={{
													backgroundColor:
														"hsl(112, 80%, 90%) !important",
												}}
											>
												<div className="input-group-text">
													<i className="fas fa-search"></i>
												</div>
											</div>
											<input
												type="text"
												onChange={(e) =>
													this.handleSearchBar(
														e.target.value
													)
												}
												placeholder="Search Here"
												value={this.state.searchFilter}
												className="ml-2 form-control pl-3"
											/>
										</div>
									</div>
									<div>
									<i
										className="fas fa-question-circle toggler 2x"
										style={{color:"blue"}}
										onClick={this.handleInfoToggle}></i>
										<Modal closeModal={this.handleInfoToggle} showModal={this.state.newUser}>
											<Info />
										</Modal>
									</div>
								</div>
							</div>
						</div>

						{this.props.loading ? (
							<Loader />
						) : this.props.fetchError ? (
							<ErrorAlert
								error={{
									code: this.props.fetchError.status,
									message: this.props.fetchError.data,
								}}
							/>
						) : this.props.recipes ? (
							<RecipeList
								clicked={(id) => this.handleSelectedRecipe(id)}
								recipes={
									this.state.filterMode
										? this.state.filterList
										: this.props.recipes
								}
							/>
						) : null}
					</div>
				</div>
				<Modal
					closeModal={this.handleCloseRecipeDetails}
					showModal={this.state.recipeSelected}
				>
					{this.state.recipeSelected ? (
						<RecipeDetails
							savedRecipe
							deleteRecipe={() => {
								this.setState({
									recipeSelected: false,
									selectedIndex: null,
								});
							}}
							recipe={
								this.state.filterMode
									? this.state.filterList[
											this.state.selectedIndex
									  ]
									: this.props.recipes[
											this.state.selectedIndex
									  ]
							}
							id={this.state.selectedIndex}
						/>
					) : null}
				</Modal>
			</Aux>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		recipes: state.user.recipes,
		loading: state.user.loading,
		idToken: state.auth.idToken,
		userId: state.auth.userId,
		userData: state.user.userData,
		dataLoading: state.user.dataLoading,
		fetchError: state.user.fetchError,
		dataError: state.user.dataError,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onFetchUserRecipes: (auth, id) =>
			dispatch(actionCreators.fetchUserRecipes(auth, id)),
		onFetchUserData: (idToken, userId) =>
			dispatch(actionCreators.fetchUserData(idToken, userId)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
