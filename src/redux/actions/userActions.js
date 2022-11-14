import fetchWalletApi from "../../api/fetchWalletApi";
import { USER_REQUEST, USER_FAILURE, USER_CREATE, USER_GET_DETAIL, USER_GET_ALL, USER_DELETE } from "../types/userTypes";

import { login, logout } from "./authActions";
import { createAccount, getAccountData } from "./accountActions";

const userRequest = () => ({
    type: USER_REQUEST,
});

const userSuccess = (type, data) => ({
    type,
    payload: data,
});

const userFailure = (errorInfo) => ({
    type: USER_FAILURE,
    payload: errorInfo,
});

export const createUser = (userData) => async (dispatch) => {
    dispatch(userRequest());

    try {
        // create a new user
        const response = await fetchWalletApi.post(`/users`, userData);

        // dispatch a login action to set the token in local storage
        const { email, password } = userData;
        await dispatch(login({ email, password }));

        // automatically create a new account to this user
        const accountData = await dispatch(createAccount(response?.data?.id))
        const { status, error } = accountData;
        if (!error) {
            return dispatch(userSuccess(USER_CREATE, response?.data)).payload;
        } else {
            // if there's an error with the creation of the account, delete the user (it's a user that won't work properly)
            await dispatch(deleteUser(response?.data?.id));

            // and the login state setted must be erased
            await dispatch(logout());

            return dispatch(userFailure({ error, status })).payload;
        }
    } catch (error) {
        return dispatch(userFailure(error.response?.data)).payload;
    }
};

export const getUserDetail = (userId) => async (dispatch) => {
    try {
        const response = await fetchWalletApi.get(`/users/${userId}`);
        return dispatch(userSuccess(USER_GET_DETAIL, response?.data)).payload;
    } catch (error) {
        return dispatch(userFailure(error.response?.data)).payload;
    }
}

export const deleteUser = (userId) => async (dispatch) => {
    try {
        const response = await fetchWalletApi.delete(`/users`, userId);
        return dispatch(userSuccess(USER_DELETE, response?.data)).payload;
    } catch (error) {
        return dispatch(userFailure(error.response?.data)).payload;
    }
}

export const getUserFromAccount = (accountId) => async (dispatch) => {
    try {
        const accountData = await fetchWalletApi.get(`/accounts/${accountId}`);
        const { userId } = accountData?.data;

        const userData = await fetchWalletApi.get(`/users/${userId}`);
        
        return userData?.data;

    } catch (error) {
        return dispatch(userFailure(error.response?.data)).payload;
    }
}