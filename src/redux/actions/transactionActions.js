export const balance = () => {
    return async function (dispatch) {
        try {

            let numberTransactionsPage = 1;
            let condicionTransactions = true;

            let transactionsArray = [];

            do {
                let dataTransactions = await fetchWalletApi.get(
                    `/transactions/?page=${numberTransactionsPage}`
                );
                transactionsArray.push(...dataTransactions.data.data);
                dataTransactions.data.nextPage ? condicionTransactions = true : condicionTransactions = false;
                numberTransactionsPage++;
            } while (condicionTransactions);


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
    };
};

export const getAllMovements = (numberPage) => {
    return async function (dispatch) {
        try {

            const dataMovements = await fetchWalletApi.get(
                `/transactions/?page=${numberPage}`
            );

            return dispatch({
                type: GET_ALL_MOVEMENTS,
                payload: dataMovements.data,
                status: { status: 200, message: 'OK' }
            });
        } catch (e) {
            return dispatch({
                type: GET_ALL_MOVEMENTS,
                status: { status: e.response.data.status, message: e.response.data.error }
            });
        }
    }
}

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
};