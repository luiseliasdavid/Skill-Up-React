import fetchWalletApi from "../../api/fetchWalletApi";
import { AUTH_REQUEST, AUTH_FAILURE, AUTH_LOGIN, AUTH_LOGOUT } from "../types/authTypes";

const authRequest = () => ({
    type: AUTH_REQUEST,
})

const authSuccess = (type, data) => ({
    type,
    payload: data,
})

const authFailure = errorInfo => ({
    type: AUTH_FAILURE,
    payload: errorInfo,
})

export const authUser = () => async dispatch => {
    dispatch(authRequest());

    try {
        // get user data
        const userData = await fetchWalletApi.get(`/auth/me`);
        return dispatch(authSuccess(AUTH_LOGIN, userData.data)).payload;
    } catch (error) {
        return dispatch(authFailure(error.response?.data)).payload;
    }
}

export const login = ({ email, password }) => async dispatch => {
    dispatch(authRequest());

    try {
        // get jwt from api, save it in local storage and then dispatch the action
        const response = await fetchWalletApi.post(`/auth/login`, { email, password });
        localStorage.setItem('token', response?.data?.accessToken);

        // get user data
        const userData = await fetchWalletApi.get(`/auth/me`);
        return dispatch(authSuccess(AUTH_LOGIN, userData.data)).payload;
    } catch (error) {
        // If any error happens, remove the token from local storage
        localStorage.removeItem('token');
        return dispatch(authFailure(error.response?.data)).payload;
    }
}

export const logout = () => async dispatch => {
    // send a failure with an empty error and clear the store
    localStorage.clear();
    dispatch(authSuccess(AUTH_LOGOUT, {}));
}