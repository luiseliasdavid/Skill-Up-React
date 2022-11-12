import fetchWalletApi from "../../api/fetchWalletApi";

export const POST_NEW_USER = "POST_NEW_USER";
export const POST_ACCOUNT = "POST_ACCOUNT";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const CLEAN_STATUS_REQUEST = "CLEAN_STATUS_REQUEST";
export const CLEAN_STORE = "CLEAN_STORE";
export const POST_ADD_CASH = "POST_ADD_CASH";
export const SEND_MONEY = "SEND_MONEY";
export const GET_BALANCE = "GET_BALANCE";
export const GET_ALL_MOVEMENTS = "GET_ALL_MOVEMENTS";
export const GET_USER_DATA = "GET_USER_DATA";
export const GET_USER_DATA_DATA = "GET_USER_DATA_DATA";
export const GET_ALL_USERS_WITH_ACCOUNT = "GET_ALL_USERS_WITH_ACCOUNT";
export const UPLOAD_CONCEPT_TRANSACTION = "UPLOAD_CONCEPT_TRANSACTION";

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

export const createUser = (user) => {
   return async function (dispatch) {
      try {
         //create the user
         const response = await fetchWalletApi.post(`/users`, user);

         //login the user
         const emailAndPasword = {
            email: user.email,
            password: user.password,
         };

         //create the account
         dispatch(createAccount(response.data.id, emailAndPasword));

         return dispatch({
            type: POST_NEW_USER,
            payload: { status: 200, message: "OK" },
         });
      } catch (e) {
         return dispatch({
            type: POST_NEW_USER,
            payload: {
               status: e.response.data.status,
               message: e.response.data.error,
            },
         });
      }
   };
};

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
            status: { status: 200, message: "OK" },
         });
      } catch (e) {
         return dispatch({
            type: POST_ACCOUNT,
            payload: {
               user: {},
               account: {},
            },
            status: {
               status: e.response.data.status,
               message: e.response.data.error,
            },
         });
      }
   };
};

export const login = (user) => {
   return async function (dispatch) {
      try {
         // get jwt from api
         const response = await fetchWalletApi.post(`/auth/login`, user);
         localStorage.setItem("token", response.data.accessToken);

         let info = await fetchWalletApi.get(`/auth/me`);
         console.log(info);
         //set info in local starage
         const userDataStorage = {
            first_name: info.data.first_name,
            last_name: info.data.last_name,
            email: info.data.email,
            roleId: info.data.roleId,
            id: info.data.id,
         };
         localStorage.setItem("user", JSON.stringify(userDataStorage));

         const transactionsUser = await fetchWalletApi.get(`/transactions`);

         const initialTopup = transactionsUser.data.data[0];

         console.log(initialTopup);
         const idAccount = initialTopup.accountId;
         const account = await fetchWalletApi.get(`/accounts/${idAccount}`);

         return dispatch({
            type: LOGIN,
            payload: { user: info.data, account: account.data },
            status: { status: 200, message: "OK" },
         });
      } catch (e) {
         console.log(e);
         return dispatch({
            type: LOGIN,
            payload: { user: {}, account: {} },
            status: {
               status: e.response.data.status,
               message: e.response.data.error,
            },
         });
      }
   };
};

export const logout = () => {
   localStorage.clear();
   return {
      type: LOGOUT,
   };
};

export const cleanStatusRequest = () => {
   return {
      type: CLEAN_STATUS_REQUEST,
   };
};

export const cleanStore = () => {
   return {
      type: CLEAN_STORE,
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
            status: { status: 200, message: "OK" },
         });
      } catch (e) {
         console.log(e);
         return dispatch({
            type: POST_ADD_CASH,
            payload: {},
            status: {
               status: e.response.data.status,
               message: e.response.data.error,
            },
         });
      }
   };
};

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
            dataTransactions.data.nextPage
               ? (condicionTransactions = true)
               : (condicionTransactions = false);
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
            status: { status: 200, message: "OK" },
         });
      } catch (e) {
         return dispatch({
            type: GET_BALANCE,
            status: {
               status: e.response.data.status,
               message: e.response.data.error,
            },
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
            status: { status: 200, message: "OK" },
         });
      } catch (e) {
         return dispatch({
            type: GET_ALL_MOVEMENTS,
            status: {
               status: e.response.data.status,
               message: e.response.data.error,
            },
         });
      }
   };
};

export const userData = () => {
   return async function (dispatch) {
      try {
         const userDetail = await fetchWalletApi.get(`/auth/me`);

         const transactionsUser = await fetchWalletApi.get(`/transactions`);

         const initialTopup = transactionsUser.data.data[0];

         const idAccount = initialTopup.accountId;
         const account = await fetchWalletApi.get(`/accounts/${idAccount}`);

         return dispatch({
            type: GET_USER_DATA,
            payload: { user: userDetail.data, account: account.data },
            status: { status: 200, message: "OK" },
         });
      } catch (e) {
         return dispatch({
            type: GET_USER_DATA,
            status: {
               status: e.response.data.status,
               message: e.response.data.error,
            },
         });
      }
   };
};

export const userDataData = () => {
   return async function (dispatch) {
      try {
         const userDetail = await fetchWalletApi.get(`/auth/me`);

         const transactionsUser = await fetchWalletApi.get(`/transactions`);

         const initialTopup = transactionsUser.data.data[0];

         const idAccount = initialTopup.accountId;
         const account = await fetchWalletApi.get(`/accounts/${idAccount}`);

         return dispatch({
            type: GET_USER_DATA_DATA,
            payload: { user: userDetail.data, account: account.data },
            status: { status: 201, message: "OK" },
         });
      } catch (e) {
         return dispatch({
            type: GET_USER_DATA_DATA,
            status: {
               status: e.response.data.status,
               message: e.response.data.error,
            },
         });
      }
   };
};

export const getAllUsersWithAccount = () => {
   return async function (dispatch) {
      try {
         let numberAccountPage = 20;
         let accountArray = [];

         /*  let condicionAccount = true; */

         do {
            let accountsLists = await fetchWalletApi.get(
               `/accounts/?page=${numberAccountPage}`
            );
            accountArray.push(...accountsLists.data.data);
            /*  accountsLists.data.nextPage ? condicionAccount=true : condicionAccount=false; */
            numberAccountPage++;
         } while (numberAccountPage <= 22);

         accountArray = accountArray.filter(
            (account) =>
               account.money !== null &&
               account.isBlocked !== true &&
               account.isBlocked !== null
         );

         accountArray = accountArray.flat();
         console.log(accountArray);

         let arrayUsers = [];

         for (const acc of accountArray) {
            const resultado = await fetchWalletApi.get(`/users/${acc.userId}`);
            resultado.data.accountId = acc.id;
            arrayUsers.push(resultado.data);
         }

         const setObj = new Set(); // creamos pares de clave y array

         const unicos = arrayUsers.reduce((acc, user) => {
            if (!setObj.has(user.id)) {
               setObj.add(user.id, user);
               acc.push(user);
            }
            return acc;
         }, []);

         return dispatch({
            type: GET_ALL_USERS_WITH_ACCOUNT,
            payload: unicos,
            status: { status: 200, message: "OK" },
         });
      } catch (e) {
         return dispatch({
            type: GET_ALL_USERS_WITH_ACCOUNT,
            status: {
               status: e.response.data.status,
               message: e.response.data.error,
            },
         });
      }
   };
};

export const sendMoneyToUser = (
   destinyAccountId,
   amountToSend,
   concept,
   moneyInMyAccount,
   idOfMyAccont,
   idMyUser
) => {
   return async function (dispatch) {
      if (amountToSend > moneyInMyAccount) {
         return dispatch({
            type: SEND_MONEY,
            status: { status: 500, message: "Fondos insuficientes" },
         });
      }
      try {
         let paymentBody = {
            type: "payment",
            concept: concept,
            amount: amountToSend,
         };

         let response = await fetchWalletApi.post(
            `/accounts/${destinyAccountId}`,
            paymentBody
         );
      } catch (e) {
         return dispatch({
            type: SEND_MONEY,
            status: {
               status: e.response.data.status,
               message: e.response.data.error,
            },
         });
      }
      try {
         let NewAmount = Number(moneyInMyAccount) - Number(amountToSend);

         let putNewAmount = {
            creationDate: dateStr,
            money: NewAmount,
            isBlocked: false,
            userId: idMyUser,
         };

         let responsePut = await fetchWalletApi.put(
            `/accounts/${idOfMyAccont}`,
            putNewAmount
         );

         const userDetail = await fetchWalletApi.get(`/auth/me`);

         const transactionsUser = await fetchWalletApi.get(`/transactions`);

         const initialTopup = transactionsUser.data.data[0];

         const idAccount = initialTopup.accountId;
         const account = await fetchWalletApi.get(`/accounts/${idAccount}`);
         console.log(responsePut);
         return dispatch({
            type: SEND_MONEY,
            payload: { user: userDetail.data, account: account.data },
            status: { status: 200, message: "OK" },
         });
      } catch (e) {
         return dispatch({
            type: SEND_MONEY,
            status: {
               status: e.response.data.status,
               message: e.response.data.error,
            },
         });
      }
   };
};

export const updateSpentConcept = (idTransaction, spentDetails) => {
   return async function (dispatch) {
      /*
            {
              "amount": 500,
              "concept": "Pago de honorarios",
              "date": "2022-10-26 15:00:00",
              "type": "topup|payment",
              "accountId": 1,
              "userId": 4,
              "to_account_id": 5
            }
        */

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
