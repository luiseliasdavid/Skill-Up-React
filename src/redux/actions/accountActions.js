import fetchWalletApi from "../../api/fetchWalletApi";
import { ACCOUNT_REQUEST, ACCOUNT_FAILURE, ACCOUNT_CREATE, ACCOUNT_GET_DETAIL, ACCOUNT_GET_ALL } from "../types/userTypes";

const userRequest = () => ({
    type: ACCOUNT_REQUEST,
});

const userSuccess = (type, data) => ({
    type,
    payload: data,
});

const userFailure = (errorInfo) => ({
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
    try {
        
        const accountData = {
            creationDate: `${getCurrentDate()}`,
            money: 0,
            isBlocked: false,
            userId: response?.data?.id,
        };

        const account = await fetchWalletApi.post(`/accounts`, accountData);
        console.log(account);
        /* const deposit = {
            type: "topup",
            concept: "initial",
            amount: 0,
        };

        const initialTopup = await fetchWalletApi.post(
            `/accounts/${account.data.id}`,
            deposit
        );

        const userDetail = await fetchWalletApi.get(`/auth/me`);
        const accountDetail = await fetchWalletApi.get(
            `/accounts/${account.data.id}`
        );

        return dispatch({
            type: POST_ACCOUNT,
            payload: {
                user: userDetail.data,
                account: accountDetail.data,
            },
            status: { status: 200, message: 'OK' }
        }); */
    } catch (error) {
        console.log(error.response?.data);
    }
};

export const addMoneyToAccount = (amount, id) => {
    return async function (dispatch) {
        try {
            const deposit = {
                type: "topup",
                concept: "Add money",
                amount: amount,
            };

            const info = await fetchWalletApi.post(`/accounts/${id}`, deposit);

            const detailAccount = await fetchWalletApi.get(`/accounts/${id}`);

            return dispatch({
                type: POST_ADD_CASH,
                payload: detailAccount.data,
                status: { status: 200, message: 'OK' }
            });
        } catch (e) {
            console.log(e)
            return dispatch({
                type: POST_ADD_CASH,
                payload: {},
                status: { status: e.response.data.status, message: e.response.data.error }
            });
        }
    };
};