import * as actionTypes from "../actions/actionTypes";

const initialState = {
	idToken: null,
	userId: null,
	error: null,
	loading: false,
	newUser:false
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.LOGOUT:
			return initialState;
		case actionTypes.AUTH_START:
			return { ...state, loading: true, error: null };
		case actionTypes.AUTH_SUCCESS:
			return {
				...state,
				loading: false,
				error: null,
				userId: action.userId,
				idToken: action.idToken,
			};
		case actionTypes.AUTH_FAILED:
			return { ...state, loading: false, error: action.error };
		case actionTypes.NEW_USER:
		console.log(state)
			return {...state, newUser:true}
		default:
			return state;
	}
};

export default reducer;
