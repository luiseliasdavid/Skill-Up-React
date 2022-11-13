export const createAccount = (id, emailAndPasword) => {
    return async function (dispatch) {
        try {
            // obtener la fecha de hoy en formato `yyyy-mm-dd 00:00:00`
            console.log("estamos en account");

            // get jwt from api
            const authLogin = await fetchWalletApi.post(
                `/auth/login`,
                emailAndPasword
            );
            localStorage.setItem("token", authLogin.data.accessToken);

            let info = await fetchWalletApi.get(`/auth/me`);
            const userDataStorage = {
                first_name: info.data.first_name,
                last_name: info.data.last_name,
                email: info.data.email,
                roleId: info.data.roleId,
                id: info.data.id,
            };
            localStorage.setItem("user", JSON.stringify(userDataStorage));

            const data = {
                creationDate: `${dateStr}`,
                money: 0,
                isBlocked: false,
                userId: id,
            };

            //create the account whit this date
            let account = await fetchWalletApi.post(`/accounts`, data);
            console.log([account.data]);

            const deposit = {
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
            });
        } catch (e) {
            return dispatch({
                type: POST_ACCOUNT,
                payload: {
                    user: {},
                    account: {},
                },
                status: { status: e.response.data.status, message: e.response.data.error },
            });
        }
    };
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