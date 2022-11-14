import fetchWalletApi from "../../api/fetchWalletApi";
import { ACCOUNT_REQUEST, ACCOUNT_FAILURE, ACCOUNT_CREATE, ACCOUNT_GET_DATA, ACCOUNT_GET_DETAIL } from "../types/accountTypes";

const accountRequest = () => ({
    type: ACCOUNT_REQUEST,
});

const accountSuccess = (type, data) => ({
    type,
    payload: data,
});

const accountFailure = (errorInfo) => ({
    type: ACCOUNT_FAILURE,
    payload: errorInfo,
});

const getCurrentDate = () => {
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

    return dateStr;
}

export const createAccount = (userId) => async (dispatch) => {
    dispatch(accountRequest());

    try {
        // create a new account to this user
        const accountData = {
            creationDate: getCurrentDate(),
            money: 0,
            isBlocked: false,
            userId
        }

        const account = await fetchWalletApi.post(`/accounts`, accountData);
        return dispatch(accountSuccess(ACCOUNT_CREATE, account?.data)).payload;
    } catch (error) {
        return dispatch(accountFailure(error.response?.data)).payload;
    }
};

export const getUserAccount = () => async (dispatch) => {
    dispatch(accountRequest());

    try {
        const account = await fetchWalletApi.get(`/accounts/me`);
        return dispatch(accountSuccess(ACCOUNT_GET_DATA, account?.data[0])).payload;
    } catch (error) {
        return dispatch(accountFailure(error.response?.data)).payload;
    }
}

export const accountDeposit = (amount, accountId) => async (dispatch) => {
    dispatch(accountRequest());

    try {
        const deposit = {
            type: "topup",
            concept: "Add money",
            amount: amount,
        };

        const response = await fetchWalletApi.post(`/accounts/${accountId}`, deposit);

        // dispatch an update of the account
        return dispatch(getUserAccount());
    } catch (error) {
        return dispatch(accountFailure(error.response?.data)).payload;
    }
};

export const getAccountData = (accountId) => async (dispatch) => {
    dispatch(accountRequest());

    try {
        const response = await fetchWalletApi.get(`/accounts/${accountId}`);
        // dispatch an update of the account
        return dispatch(accountSuccess(ACCOUNT_GET_DETAIL)).payload;
    } catch (error) {
        return dispatch(accountFailure(error.response?.data)).payload;
    }
};

export const sendMoneyToUser = ({ toAccountId, amount, concept }) => async (dispatch) => {
    dispatch(accountRequest());
    try {
        let paymentBody = {
            type: "payment",
            concept: concept,
            amount: amount
        }
        const response = await fetchWalletApi.post(`/accounts/${toAccountId}`, paymentBody);
        return dispatch(getUserAccount());
    }
    catch (error) {
        return dispatch(accountFailure(error.response?.data)).payload;
    }
};