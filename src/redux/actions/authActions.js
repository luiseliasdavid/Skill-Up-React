import fetchWalletApi from "../../api/fetchWalletApi"
import { AUTH_REQUEST, AUTH_SUCCESS, AUTH_FAILURE } from "../types/authTypes"

const authRequest = () => ({
    type: AUTH_REQUEST,
})

const authSuccess = data => ({
    type: AUTH_SUCCESS,
    payload: data,
})

const authFailure = errorInfo => ({
    type: AUTH_FAILURE,
    payload: errorInfo,
})

export const login = ({ email, password }) => async dispatch => {
    dispatch(authRequest());

    try {
        // get jwt from api, save it in local storage and then dispatch the action
        const response = await fetchWalletApi.post(`/auth/login`, { email, password });
        localStorage.setItem('token', response?.data?.accessToken);

        // get user data
        const userData = await fetchWalletApi.get(`/auth/me`);
        return dispatch(authSuccess(userData.data)).payload;
    } catch (error) {
        return dispatch(authFailure(error.response?.data)).payload;
    }
}

export const authUser = () => async dispatch => {
    dispatch(authRequest());

    try {
        // get user data
        const userData = await fetchWalletApi.get(`/auth/me`);
        return dispatch(authSuccess(userData.data)).payload;
    } catch (error) {
        return dispatch(authFailure(error.response?.data)).payload;
    }
}