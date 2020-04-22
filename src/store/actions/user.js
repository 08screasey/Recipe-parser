import axios from 'axios';
import * as actionTypes from './actionTypes'

//Fetching recipe from custom URL

export const fetchCustomRecipe = (recipeURL) => {
	return dispatch => {
		dispatch(fetchCustomRecipeStart());
		axios.get(`https://api.spoonacular.com/recipes/extract?url=${recipeURL}&apiKey=6ff3037d879049c4b88e75c67eed0bb1`)
		.then(result=>{
			const recipe = {title:result.data.title,
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
			dispatch(fetchCustomRecipeSuccess(recipe))
		})
		.catch(error=>{
			dispatch(fetchCustomRecipeFailed({code:400, message:"We're Sorry, this recipe could not be found"}))})
	}
}

export const fetchCustomRecipeSuccess = (recipe) => {
	return {type:actionTypes.FETCH_CUSTOM_RECIPE_SUCCESS,
		recipe:recipe}
}

export const fetchCustomRecipeFailed = (error) => {
	return {type:actionTypes.FETCH_CUSTOM_RECIPE_FAILED,
		error:error}
}

export const fetchCustomRecipeStart = () => {
	return{type:actionTypes.FETCH_CUSTOM_RECIPE_START}}

//Used for sending recipe to database	

export const addCustomRecipe = (recipe, authToken) => {
	return dispatch => {
		dispatch(addCustomRecipeStart());
		axios.post("https://react-recipe-project-87fc0.firebaseio.com/recipes.json?auth="+authToken, recipe)
		.then(result=>{
			dispatch(clearAddForm())
			dispatch(addCustomRecipeSuccess())})
		.catch(err=>{dispatch(addCustomRecipeFailed(err.response.data.error))})
	}
}

export const addCustomRecipeStart = () => {
return {type:actionTypes.ADD_CUSTOM_RECIPE_START}
}

export const addCustomRecipeSuccess = (result) => {
return {type:actionTypes.ADD_CUSTOM_RECIPE_SUCCESS}
}

export const addCustomRecipeFailed = (error) => {
return {type:actionTypes.ADD_CUSTOM_RECIPE_FAILED,
error:error}
}

//Fetching User Recipes from Database

export const fetchUserRecipes = (authToken, userId) => {
	return dispatch => {
		dispatch(fetchUserRecipesStart());
		const queryParams='?auth='+authToken+'&orderBy="userId"&equalTo="' + userId + '"';

		axios.get("https://react-recipe-project-87fc0.firebaseio.com/recipes.json"+queryParams)
		.then(result=>{
			let recipes = [];
			for(let key in result.data){
				recipes.push({...result.data[key], id:key})
			}
			dispatch(fetchUserRecipesSuccess(recipes))})
		.catch(err=>{
			dispatch(fetchUserRecipesFailed(err.response))})
	}
}

export const fetchUserRecipesStart = () => {
	return{type:actionTypes.FETCH_USER_RECIPES_START}
}

export const fetchUserRecipesSuccess = (recipes) => {
	return {type:actionTypes.FETCH_USER_RECIPES_SUCCESS,
		recipes:recipes}
}

export const fetchUserRecipesFailed = (error) => {
	return {type:actionTypes.FETCH_USER_RECIPES_FAILED,
		error:error}
}

//updating redux state after submission

export const updateRecipe = (id, recipe) => {

	return{type:actionTypes.UPDATE_RECIPE,
		recipe:recipe,
		id:id}
}

export const deleteRecipe = (id) => {
	return{type:actionTypes.DELETE_RECIPE,
		id:id}
}

//User Profile Data 

export const fetchUserData = (idToken,userId) => {
	return dispatch => {
		dispatch(fetchUserDataStart());
		axios.get(`https://react-recipe-project-87fc0.firebaseio.com/users/${userId}.json?auth=${idToken}`)
		.then(response=>{
			dispatch(fetchUserDataSuccess(response.data))})
		.catch(error=>{
			dispatch(fetchUserDataFailed(error.response))})

	}
}

export const fetchUserDataStart = () => {
	return {type:actionTypes.FETCH_USER_DATA_START}
}

export const fetchUserDataSuccess = (data) => {
	return {type:actionTypes.FETCH_USER_DATA_SUCCESS,
		userData:data}
}

export const fetchUserDataFailed = (error) => {
	return {type:actionTypes.FETCH_USER_DATA_FAILED,
		error:error}
}

//updateUserData

export const updateUserData = (userId, idToken, userData) => {
	return dispatch => {
		dispatch(updateUserDataStart());
		axios.put(`https://react-recipe-project-87fc0.firebaseio.com/users/${userId}.json?auth=${idToken}`, userData)
		.then(result=>{
			dispatch(updateUserDataSuccess(result.data))
		})
		.catch(error=>{
			dispatch(updateUserDataFailed(error.response.data.error))
		})
	}
}

export const updateUserDataStart = () => {
	return {type:actionTypes.UPDATE_USER_DATA_START}
}

export const updateUserDataSuccess = (data) => {
	return {type:actionTypes.UPDATE_USER_DATA_SUCCESS,
		userData:data}
}

export const updateUserDataFailed = (error) => {
	return {type:actionTypes.UPDATE_USER_DATA_FAILED,
		error:error}
}

export const clearAddForm = () => {
	return {type:actionTypes.CLEAR_ADD_FORM}
}