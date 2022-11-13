import fetchWalletApi from "../../api/fetchWalletApi";
import { USER_REQUEST, USER_FAILURE, USER_CREATE, USER_GET_DETAIL, USER_GET_ALL } from "../types/userTypes";

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
        console.log(response?.data?.id,);
        // automatically create a new account to this user
        console.log(account);

        /* // get user data
        return dispatch(userSuccess(userData.data)).payload; */
    } catch (error) {
        console.log(error.response?.data);
        /* return dispatch(userFailure(error.response?.data)).payload; */
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
