import fetchWalletApi from "../../api/fetchWalletApi";
import { USER_REQUEST, USER_SUCCESS, USER_FAILURE } from "../types/userTypes";

const date = new Date();
const dateStr =
    date.getFullYear() +
    "-" +
    ("00" + (date.getMonth() + 1)).slice(-2) +
    "-" +
    ("00" + date.getDate()).slice(-2) +
    " " +
    ("00" + date.getHours()).slice(-2) +
    ":" +
    ("00" + date.getMinutes()).slice(-2) +
    ":" +
    ("00" + date.getSeconds()).slice(-2);

const userRequest = () => ({
    type: USER_REQUEST,
});

const userSuccess = (data) => ({
    type: USER_SUCCESS,
    payload: data,
});

const userFailure = (errorInfo) => ({
    type: USER_FAILURE,
    payload: errorInfo,
});

export const createUser = (userData) => async (dispatch) => {
    dispatch(userRequest());

    try {
        const response = await fetchWalletApi.post(`/users`, userData);
        localStorage.setItem("token", response?.data?.accessToken);

        // get user data
        const userData = await fetchWalletApi.get(`/user/me`);
        return dispatch(userSuccess(userData.data)).payload;
    } catch (error) {
        return dispatch(userFailure(error.response?.data)).payload;
    }
};

export const creaateUser = (user) => {
    return async function (dispatch) {
        try {
            //create the user
            const response = await fetchWalletApi.post(`/users`, user);
            console.log(response);

            //create the account
            /* dispatch(createAccount(response.data.id, emailAndPasword)); */

            /* return dispatch({
                type: POST_NEW_USER,
                payload: { status: 200, message: 'OK' }
            }) */;
        } catch (e) {/* 
            return dispatch({
                type: POST_NEW_USER,
                payload: { status: e.response.data.status, message: e.response.data.error },
            }); */
        }
    };
};

export const userUser = () => async (dispatch) => {
    dispatch(userRequest());

    try {
        // get user data
        const userData = await fetchWalletApi.get(`/user/me`);
        return dispatch(userSuccess(userData.data)).payload;
    } catch (error) {
        return dispatch(userFailure(error.response?.data)).payload;
    }
};
