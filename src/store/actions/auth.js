import * as actionTypes from "./actionTypes";
import axios from "axios";

export const auth = (userData, isSignUp) => {
	return (dispatch) => {
		dispatch(authStart());
		let defaultURL =
			`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`;
		if (!isSignUp) {
			defaultURL =
				`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`;
		}
		axios
			.post(defaultURL, userData)
			.then((result) => {
				if(isSignUp){
					dispatch(newUser())
				}
				const expDate = new Date(
					new Date().getTime() + result.data.expiresIn * 1000
				);
				localStorage.setItem("localId", result.data.localId);
				localStorage.setItem("idToken", result.data.idToken);
				localStorage.setItem("expDate", expDate);
				dispatch(authSuccess(result.data));
				dispatch(startAuthTimeout(result.data.expiresIn));
				
			})
			.catch((error) => {
				dispatch(authFailed(error.response.data.error));
			});
	};
};

export const startAuthTimeout = (expTimeSeconds) => {
	return (dispatch) =>
		setTimeout(() => {
			dispatch(logout());
		}, expTimeSeconds * 1000);
};

export const initAuthCheck = () => {
	return (dispatch) => {
		const idToken = localStorage.getItem("idToken");
		if (!idToken) {
			dispatch(logout());
		}
		const expDate = new Date(localStorage.getItem("expDate"));
		if (expDate <= new Date()) {
			dispatch(logout());
		} else {
			const expiresIn = expDate.getTime() - new Date().getTime();
			const localId = localStorage.getItem("localId");
			dispatch(startAuthTimeout(expiresIn / 1000));
			dispatch(authSuccess({ localId: localId, idToken: idToken }));
		}
	};
};

export const authStart = () => {
	return { type: actionTypes.AUTH_START };
};

const newUser = () => {
	return {type:actionTypes.NEW_USER}
}

export const authSuccess = (userData) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		userId: userData.localId,
		idToken: userData.idToken,
	};
};

export const authFailed = (error) => {
	return { type: actionTypes.AUTH_FAILED, error: error };
};

export const logout = () => {
	localStorage.removeItem("idToken");
	localStorage.removeItem("localId");
	localStorage.removeItem("expDate");
	return { type: actionTypes.LOGOUT };
};
