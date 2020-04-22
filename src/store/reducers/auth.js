import * as actionTypes from '../actions/actionTypes';

const initialState = {idToken:null,
userId:null,
error:null,
loading:false}

const reducer = (state=initialState, action) => {
	switch (action.type){
		case actionTypes.LOGOUT:
			return {...state, userId:null, error:null, idToken:null, loading:false};
		case actionTypes.AUTH_START:
			return {...state, loading:true, error:null};
		case actionTypes.AUTH_SUCCESS:
		 	return {...state, loading:false, error:null, userId:action.userId, idToken:action.idToken}
		 case actionTypes.AUTH_FAILED:
		 	return {...state, loading:false, error:action.error}
		default:
			return state}
}

export default reducer;