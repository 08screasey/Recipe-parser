import * as actionTypes from "../actions/actionTypes";

const initialState = {
	loading: false,
	recipes: null,
	submitted: false,
};

const updateRecipe = (state, action) => {
	let updatedRecipes = [...state.recipes];
	updatedRecipes.splice(action.id, 1, action.recipe);
	return { ...state, recipes: updatedRecipes, loading: false };
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.FETCH_SEARCH_RECIPES_START:
			return { ...state, loading: true, submitted: false };
		case actionTypes.FETCH_SEARCH_RECIPES_SUCCESS:
			return { ...state, loading: false, recipes: action.recipes };
		case actionTypes.FETCH_SEARCH_RECIPES_FAILED:
			return { ...state, loading: false };
		case actionTypes.FETCH_MORE_SEARCH_RECIPES_START:
			return { ...state, loading: true, submitted: false };
		case actionTypes.FETCH_MORE_SEARCH_RECIPES_SUCCESS:
			return {
				...state,
				loading: false,
				recipes: state.recipes.concat(action.recipes),
			};
		case actionTypes.FETCH_MORE_SEARCH_RECIPES_FAILED:
			return { ...state, loading: false };
		case actionTypes.FETCH_SEARCH_RECIPE_START:
			return { ...state, loading: true, submitted: false };
		case actionTypes.FETCH_SEARCH_RECIPE_SUCCESS:
			return updateRecipe(state, action);
		case actionTypes.FETCH_SEARCH_RECIPE_FAILED:
			return { ...state, loading: false };
		case actionTypes.RESET_SEARCH_RECIPES:
			return {
				...state,
				recipes: null,
				submitted: false,
				loading: false,
			};
		default:
			return state;
	}
};

export default reducer;
