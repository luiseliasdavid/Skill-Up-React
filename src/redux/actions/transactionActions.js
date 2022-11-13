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

/* export const getAllMovements = () => async (dispatch) => {
       try {
           let nextPage = null;
           const transactions = [];

           do {
               const dataTransactions = await fetchWalletApi.get(
                   `/transactions/?page=${numberTransactionsPage}`
               );
               transactionsArray.push(...dataTransactions.data.data);
               dataTransactions.data.nextPage ? condicionTransactions = true : condicionTransactions = false;
               numberTransactionsPage++;
           } while (nextPage);


           const topup = transactionsArray.filter(
               (transaction) => transaction.type === "topup"
           );
           const payment = transactionsArray.filter(
               (transaction) => transaction.type === "payment"
           );

           const initialValue = 0;
           const balanceTopup = topup.reduce(
               (previousAmount, currentAmount) =>
                   Number(currentAmount.amount) + Number(previousAmount),
               initialValue
           );

           const balancePayment = payment.reduce(
               (previousAmount, currentAmount) =>
                   Number(currentAmount.amount) + Number(previousAmount),
               initialValue
           );

           const totalBalance = balanceTopup - balancePayment;

           return dispatch({
               type: GET_BALANCE,
               payload: {
                   topup: balanceTopup,
                   payments: balancePayment,
                   totalBalance,
               },
               topupList: topup,
               paymentsList: payment,
               status: { status: 200, message: 'OK' },
           });

       } catch (e) {
           return dispatch({
               type: GET_BALANCE,
               status: { status: e.response.data.status, message: e.response.data.error }
           });
       }
}; */
/*
export const sendMoneyToUser = (destinyAccountId, amountToSend, concept, moneyInMyAccount, idOfMyAccont, idMyUser) => {

    return async function (dispatch) {
        if (amountToSend > moneyInMyAccount) {
            return dispatch({
                type: SEND_MONEY,
                status: { status: 500, message: 'Fondos insuficientes' },
            });
        }
        try {
            let paymentBody = {
                type: "payment",
                concept: concept,
                amount: amountToSend
            }

            let response = await fetchWalletApi.post(`/accounts/${destinyAccountId}`, paymentBody);

        }
        catch (e) {

            return dispatch({
                type: SEND_MONEY,
                status: { status: e.response.data.status, message: e.response.data.error },
            });
        }
        try {
            let NewAmount = Number(moneyInMyAccount) - Number(amountToSend)

            let putNewAmount = {
                creationDate: dateStr,
                money: NewAmount,
                isBlocked: false,
                userId: idMyUser
            }

            let responsePut = await fetchWalletApi.put(`/accounts/${idOfMyAccont}`, putNewAmount);

            const userDetail = await fetchWalletApi.get(`/auth/me`);

            const transactionsUser = await fetchWalletApi.get(`/transactions`);

            const initialTopup = transactionsUser.data.data[0]

            const idAccount = initialTopup.accountId;
            const account = await fetchWalletApi.get(`/accounts/${idAccount}`);
            console.log(responsePut)
            return dispatch({
                type: SEND_MONEY,
                payload: { user: userDetail.data, account: account.data },
                status: { status: 200, message: 'OK' }
            });

        } catch (e) {

            return dispatch({
                type: SEND_MONEY,
                status: { status: e.response.data.status, message: e.response.data.error },
            });
        }
    };
};

export const updateSpentConcept = (idTransaction, spentDetails) => {
    return async function (dispatch) {
        try {
            const spendtUpdated = await fetchWalletApi.put(
                `/transactions/${idTransaction}`,
                spentDetails
            );

            let numberTransactionsPage = 1;
            let condicionTransactions = true;

            let transactionsArray = [];

            do {
                let dataTransactions = await fetchWalletApi.get(
                    `/transactions/?page=${numberTransactionsPage}`
                );
                transactionsArray.push(...dataTransactions.data.data);
                dataTransactions.data.nextPage
                    ? (condicionTransactions = true)
                    : (condicionTransactions = false);
                numberTransactionsPage++;
            } while (condicionTransactions);
            const payments = transactionsArray.filter(
                (transaction) => transaction.type === "payment"
            );

            return dispatch({
                type: UPLOAD_CONCEPT_TRANSACTION,
                payload: payments,
                status: { status: 200, message: "OK" },
            });
        } catch (e) {
            dispatch({
                type: UPLOAD_CONCEPT_TRANSACTION,
                status: {
                    status: e.response.data.status,
                    message: e.response.data.error,
                },
            });
        }
    };
}; */