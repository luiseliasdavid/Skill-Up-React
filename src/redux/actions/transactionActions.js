import fetchWalletApi from "../../api/fetchWalletApi";
import { TRANSACTION_REQUEST, TRANSACTION_FAILURE, TRANSACTION_CREATE, TRANSACTION_GET_DETAIL, TRANSACTION_GET_LIST, TRANSACTION_GET_ALL } from "../types/transactionTypes";

const transactionRequest = () => ({
    type: TRANSACTION_REQUEST,
});

const transactionSuccess = (type, data) => ({
    type,
    payload: data,
});

const transactionFailure = (errorInfo) => ({
    type: TRANSACTION_FAILURE,
    payload: errorInfo,
});

export const getMovements = (pageNumber = 1) => async (dispatch) => {
    dispatch(transactionRequest());

    try {
        const transactions = await fetchWalletApi.get(`/transactions/?pages=${pageNumber}`);
        return dispatch(transactionSuccess(TRANSACTION_GET_LIST, transactions?.data?.data)).payload;
    } catch (error) {
        return dispatch(transactionFailure(error.response?.data)).payload;
    }
}

export const getAllMovements = () => async (dispatch) => {
    dispatch(transactionRequest());

    try {
        const transactionList = [];
        let nextPage = null;
        let pageNumber = 1;

        do {
            const dataTransactions = await fetchWalletApi.get(`/transactions/?page=${pageNumber}`);
            transactionList.push(...dataTransactions.data.data);

            nextPage = dataTransactions?.data?.nextPage ? true : false;
            pageNumber++;
        } while (nextPage);

        // Sort transactions before doing anything
        transactionList.sort((d1, d2) => new Date(d2.date) - new Date(d1.date));

        const topupList = transactionList.filter(
            (transaction) => transaction.type === "topup"
        );

        const paymentList = transactionList.filter(
            (transaction) => transaction.type === "payment"
        );

        const topupBalance = topupList.reduce((ac, { amount }) => Number(amount) + ac, 0);
        const paymentBalance = paymentList.reduce((ac, { amount }) => Number(amount) + ac, 0);

        const totalBalance = topupBalance - paymentBalance;

        const transactionData = {
            balanceData: {
                topupBalance,
                paymentBalance,
                totalBalance
            },
            paymentList,
            topupList,
            transactionList
        }

        return dispatch(transactionSuccess(TRANSACTION_GET_ALL, transactionData)).payload;
    } catch (error) {
        return dispatch(transactionFailure(error.response?.data)).payload;
    }
};

export const updateSpentConcept = (idTransaction, spentDetails) => async (dispatch) => {
    dispatch(transactionRequest());

    try {
        const spentUpdated = await fetchWalletApi.put(
            `/transactions/${idTransaction}`,
            spentDetails
        );

        // dispatch an update of the transactions
        return dispatch(getAllMovements());
    } catch (error) {
        return dispatch(transactionFailure(error.response?.data)).payload;
    }
};