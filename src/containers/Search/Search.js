import React, {Component} from 'react';
import RecipeList from  '../../components/RecipeList/RecipeList';
import './Search.css';
import Aux from '../../hoc/Auxilliary';
import RecipeDetails from '../RecipeDetails/RecipeDetails';
import Modal from '../../components/UI/Modal/Modal';
import {connect} from 'react-redux';
import * as actionCreators from '../../store/actions/index';
import Loader from '../../components/UI/Loader/Loader';
import Button from '../../components/UI/Buttons/Buttons';
import {Waypoint} from 'react-waypoint';


class Search extends Component{
	
	state={
		recipeSelected:false,
		selectedIndex:null,
		searchQuery:"",
		offset:0,
		endOfList:false,
		currentlySearching:false
		}
	
	componentDidMount(){
		this.props.onResetSearchRecipes();
	}

	handleFormSubmit = (e) => {
		e.preventDefault();
		this.props.onFetchSearchRecipes(this.state.searchQuery)
		this.setState({currentlySearching:true, endOfList:false})
	}

	handleInputChange = event => {
		this.setState({searchQuery:event.target.value, currentlySearching:false})
	}
	

	handleSelectedRecipe = (id) => {
		this.props.onFetchSearchRecipe(this.props.recipes[id].id, id);
		this.setState({selectedIndex:id,
			recipeSelected:true})
	}
	
	handleCloseRecipeDetails = () => {
		this.setState({selectedIndex:null,
			recipeSelected:false})
	}

	handleFetchMoreRecipes = () => {
		if(this.props.recipes.length<this.state.offset+20 || !this.state.currentlySearching){
			this.setState({endOfList:true})
		}else{
			const offset = this.props.recipes.length;
				
			this.props.onFetchMoreSearchRecipes(this.state.searchQuery, offset);
			this.setState({offset:offset})
		}
	}
	
	render(){
		return (<Aux>
			<div className="Search" >
				
				<form onSubmit={this.handleFormSubmit} style={{maxWidth:'600px', margin:'auto'}}>
					<div className="row align-content-center mx-auto w-100 justify-content-center">
					<div className="col-8">
					<div className="input-group ">
					 <div className="input-group-prepend">
          				<div className="input-group-text"><i className="fas fa-search"></i></div>
       				 </div>

					<input type="text" onChange={(e)=>this.handleInputChange(e)} placeholder="Search Here" value={this.state.addRecipeUrl} className="form-control pl-3"/>
					</div>
					</div>
					<div className="col-4">
				<Button btnType="green" block>Submit</Button>
				</div>
				</div>
				</form>
				<div className="SearchRecipesContainer">
					<h3 className={this.props.recipes && this.props.recipes.length > 0 ? "Visible" : null}>{this.props.recipes && this.props.recipes.length < 1 ? "No Search Results" : "Search Results"}</h3>
					{this.props.recipes ? <RecipeList clicked={(id)=>this.handleSelectedRecipe(id)} recipes={this.props.recipes}/> : null}
				</div>
			</div>
			{this.props.loading ? <Loader />
			 :	this.state.endOfList ? <p className="text-center Green">End of SearchList</p> : this.props.recipes ? <Waypoint onEnter={this.handleFetchMoreRecipes} /> : null}
			<Modal closeModal={this.handleCloseRecipeDetails} showModal={this.state.recipeSelected}>
			{this.props.loading ? <Loader /> : this.state.recipeSelected ? <RecipeDetails
				recipe={this.props.recipes[this.state.selectedIndex]}
				id={this.state.selectedIndex}/> : null}
				</Modal>
			</Aux>)
	}
};

const mapStateToProps = state => {
	return {
		recipes:state.search.recipes,
		loading:state.search.loading
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onFetchSearchRecipes: (recipes) => dispatch(actionCreators.fetchSearchRecipes(recipes)),
		onFetchMoreSearchRecipes: (recipes, offset) => dispatch(actionCreators.fetchMoreSearchRecipes(recipes, offset)),
		onFetchSearchRecipe:(id, index)=>dispatch(actionCreators.fetchSearchRecipe(id, index)),
		onResetSearchRecipes: () => dispatch(actionCreators.resetSearchRecipes())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);