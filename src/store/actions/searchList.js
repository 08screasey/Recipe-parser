import * as actionTypes from './actionTypes';
import axios from 'axios';

export const fetchSearchRecipes = (params) => {
	return dispatch => {
		dispatch(fetchSearchRecipesStart());
		axios.get(`https://api.spoonacular.com/recipes/search?query=${params}&number=20&diet=vegan&instructionsRequired=true&apiKey=6ff3037d879049c4b88e75c67eed0bb1`)
		.then(result=>{
			let recipes = [];
			result.data.results.forEach(recipe=>{
				recipes.push({title:recipe.title,
					readyInMinutes:recipe.readyInMinutes,
					servings:recipe.servings,
					imageURL:result.data.baseUri + recipe.image,
					sourceUrl:"",
					instructions:[],
					ingredients:[],
					id:recipe.id
				})
			})
			dispatch(fetchSearchRecipesSuccess(recipes))})
		.catch(err=>{
			dispatch(fetchSearchRecipesFailed(err))})
	}
}

export const fetchSearchRecipesStart = () => {
	return{type:actionTypes.FETCH_SEARCH_RECIPES_START}
}

export const fetchSearchRecipesSuccess = (recipes) => {
	return {type:actionTypes.FETCH_SEARCH_RECIPES_SUCCESS,
		recipes:recipes}
}

export const fetchSearchRecipesFailed = (error) => {
	return {type:actionTypes.FETCH_SEARCH_RECIPES_FAILED,
		error:error}
}

//concat searchRecipeList

export const fetchMoreSearchRecipes = (params, offset) => {
	return dispatch => {
		dispatch(fetchMoreSearchRecipesStart());
		axios.get(`https://api.spoonacular.com/recipes/search?query=${params}&offset=${offset}&number=20&diet=vegan&instructionsRequired=true&apiKey=6ff3037d879049c4b88e75c67eed0bb1`)
		.then(result=>{
			let recipes = [];
			result.data.results.forEach(recipe=>{
				recipes.push({title:recipe.title,
					readyInMinutes:recipe.readyInMinutes,
					servings:recipe.servings,
					imageURL:result.data.baseUri + recipe.image,
					sourceUrl:"",
					instructions:[],
					ingredients:[],
					id:recipe.id
				})
			})
			dispatch(fetchMoreSearchRecipesSuccess(recipes))})
		.catch(err=>{
			dispatch(fetchMoreSearchRecipesFailed(err))})
	}
}

export const fetchMoreSearchRecipesStart = () => {
	return{type:actionTypes.FETCH_MORE_SEARCH_RECIPES_START}
}

export const fetchMoreSearchRecipesSuccess = (recipes) => {
	return {type:actionTypes.FETCH_MORE_SEARCH_RECIPES_SUCCESS,
		recipes:recipes}
}

export const fetchMoreSearchRecipesFailed = (error) => {
	return {type:actionTypes.FETCH_MORE_SEARCH_RECIPES_FAILED,
		error:error}
}

//Add Full details to one recipe

export const fetchSearchRecipe = (id, index) => {
	return dispatch => {
		dispatch(fetchSearchRecipeStart());
		axios.get(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=6ff3037d879049c4b88e75c67eed0bb1`)
		.then(result=>{
			let recipe = {title:result.data.title,
				sourceUrl:result.data.sourceUrl,
				servings:result.data.servings,
				readyInMinutes:result.data.readyInMinutes,
				imageURL:result.data.image,
				instructions:[],
				ingredients:[]};
				result.data.extendedIngredients.forEach((ingredient)=>{
				recipe.ingredients.push({amount:ingredient.amount,
					unit:ingredient.unit,
					originalName:ingredient.originalName})
			});
			let analyzedInstructions = [];
			result.data.analyzedInstructions.forEach(instructionGroup=>{
				instructionGroup.steps.forEach(instruction=>{
					const analyzedInstruction = instruction.step;
					analyzedInstructions = analyzedInstructions.concat(analyzedInstruction);
				})
			});
			recipe.instructions=analyzedInstructions;
			dispatch(fetchSearchRecipeSuccess(recipe, index))})
		.catch(err=>{
			dispatch(fetchSearchRecipeFailed(err))})
	}
}

export const fetchSearchRecipeStart = () => {
	return{type:actionTypes.FETCH_SEARCH_RECIPE_START}
}

export const fetchSearchRecipeSuccess = (recipe, id) => {
	return {type:actionTypes.FETCH_SEARCH_RECIPE_SUCCESS,
		recipe:recipe,
		id:id}
}

export const fetchSearchRecipeFailed = (error) => {
	return {type:actionTypes.FETCH_SEARCH_RECIPE_FAILED,
		error:error}
}

// Reset Search Fields

export const resetSearchRecipes = () => {
	return {
		type:actionTypes.RESET_SEARCH_RECIPES
	}
}