import * as actionTypes from '../actions/actionTypes';

const initialState={
	loading:false,
	recipes:null,
	addCustomRecipe:null,
	submitted:false,
	error:null,
	dataLoading:false,
	userData:{
		
		name:'',
		recipeTags:["Sauces","Dips","Breakfast", "Lunch", "Dinner", "Sides", "Dessert"]
	},
	fetchError:null,
	dataError:null
}

const updateRecipe = (state, action) => {
	let updatedRecipes = [...state.recipes]
	updatedRecipes.splice(action.id, 1, action.recipe);
	return {...state, recipes:updatedRecipes}
};

const deleteRecipe = (state, action)=>{
	let updatedRecipes=[...state.recipes];
	updatedRecipes.splice(action.id, 1);
	return {...state, recipes:updatedRecipes}
}

const reducer = (state=initialState, action)=>{
	switch(action.type){
		case actionTypes.FETCH_CUSTOM_RECIPE_SUCCESS:
			return {...state,
				addCustomRecipe:action.recipe,
				loading:false,
				error:null};
		case actionTypes.FETCH_CUSTOM_RECIPE_FAILED:
			return{...state, loading:false, error:action.error}
		case actionTypes.FETCH_CUSTOM_RECIPE_START:
			return {...state, loading:true, error:null};
		case actionTypes.FETCH_SEARCH_RECIPES_FAILED:
		return {...state, loading:false};
		case actionTypes.CLEAR_ADD_FORM:
			return {...state, addCustomRecipe:null, error:null};
		case actionTypes.ADD_CUSTOM_RECIPE_START:
			return {...state, loading:true, error:null};
		case actionTypes.ADD_CUSTOM_RECIPE_SUCCESS:
			return {...state, submitted:true, error:null};
		case actionTypes.ADD_CUSTOM_RECIPE_FAILED:
			return {...state, error:action.error};
		case actionTypes.FETCH_USER_DATA_START:
			return {...state, dataLoading:true, dataError:null, addCustomRecipe:null};
		case actionTypes.FETCH_USER_DATA_SUCCESS:
			const updatedData = {...state.userData, ...action.userData};
			return {...state, dataLoading:false, userData:updatedData};
		case actionTypes.FETCH_USER_DATA_FAILED:
			return {...state, dataLoading:false, dataError:action.error};
		case actionTypes.UPDATE_USER_DATA_START:
			return {...state, dataLoading:true, error:null};
		case actionTypes.UPDATE_USER_DATA_SUCCESS:
			return {...state, userData:action.userData, error:null, dataLoading:false};
		case action.UPDATE_USER_DATA_FAILED:
			return {...state, dataLoading:false, error:action.error}
		case actionTypes.FETCH_USER_RECIPES_START:
			return {...state, loading:true, submitted:false, fetchError:null};
		case actionTypes.FETCH_USER_RECIPES_SUCCESS:
			return {...state, loading:false, recipes:action.recipes};
		case actionTypes.FETCH_USER_RECIPES_FAILED:
			return {...state, loading:false, fetchError:action.error};
		case actionTypes.UPDATE_RECIPE:
			return updateRecipe(state, action);
		case actionTypes.DELETE_RECIPE:
			return deleteRecipe(state, action);
		default:
		return state
	}
}

export default reducer;