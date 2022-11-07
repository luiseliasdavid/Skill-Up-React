import axios from "axios";
import fetchWalletApi from "../../api/fetchWalletApi";

export const POST_NEW_USER = 'POST_NEW_USER';
export const POST_ACCOUNT = 'POST_ACCOUNT';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const POST_ADD_CASH = 'POST_ADD_CASH';
export const GET_BALANCE = 'GET_BALANCE';
export const GET_USER_DATA = 'GET_USER_DATA';

let date = new Date();
let dateStr =
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


const API_SWAGGER =
   "http://wallet-main.eba-ccwdurgr.us-east-1.elasticbeanstalk.com";


// * Function to create an user on Register Form.
export const createUser = ( user ) => {
    return async function( dispatch ) {
        try {
            //create the user
             const response = axios.post(`${API_SWAGGER}/users`, user );
             
             //login the user
            const emailAndPasword = {
                email: user.email,
                password: user.password
            }
            /* dispatch( login(emailAndPasword) ) */


            console.log('se crea el usuario con id ' + response.data.id)
            //create the account
            console.log(response.data.id);
            dispatch( createAccount( response.data.id, emailAndPasword ));
            
            return dispatch({
                type: POST_NEW_USER,
                payload: true
            });
        } catch (e) {
            return dispatch({
                type: POST_NEW_USER,
                payload: false
            });
        }

    }
};


// * Function to create a new and unique account when an user register first time.
export const createAccount = ( id, emailAndPasword ) => {
    return async function( dispatch ) {
        // obtener la fecha de hoy en formato `yyyy-mm-dd 00:00:00`
        
        // get jwt from api
        const authLogin = await axios.post( `${API_SWAGGER}/auth/login`,
            emailAndPasword 
        );

        localStorage.setItem( 'token', authLogin.data.accessToken )

        const data = {
            creationDate: `${dateStr}`,
            money: 0,
            isBlocked: false,
            userId: id
        }
        
        /* let token = localStorage.getItem('token');
        console.log(token);
        let tokenBody = { headers: { Authorization: `Bearer ${token}` }}
        
        console.log(tokenBody); */

        //create the account whit this date
        const account = await fetchWalletApi.post( "/accounts", data )
        console.log("respuesta del account");

        const deposit = {
            type: 'topup',
            concept: 'initial',
            amount: 0
        }

        const initialTopup = await fetchWalletApi.post(
            `/accounts/${ account.data.id }`,
            deposit
        )
        
        const userDetail = await fetchWalletApi.get( '/auth/me' )
        const accountDetail = await fetchWalletApi.get( `/accounts/${ account.data.id }` )

        return dispatch({
            type: POST_ACCOUNT,
            payload: { 
                user: userDetail.data,
                account: accountDetail.data,
                active: true
            }
        });

    }
};


// * Function to login an user
export const login = ( user ) => {
    return async function( dispatch ) {
        try {
            // get jwt from api
            const response = await fetchWalletApi.post("/auth/login", user);
            localStorage.setItem( 'token', response.data.accessToken )

            let info = await fetchWalletApi.get( '/auth/me' )
            
             //set info in local starage
             const userDataStorage = { 
                first_name: info.data.first_name,
                last_name: info.data.last_name,
                email: info.data.email,
                roleId: info.data.roleId,
                id: info.data.id
            }
            localStorage.setItem( 'user', JSON.stringify( userDataStorage ) )

            const transactionsUser = await fetchWalletApi.get( '/transactions' )

            const initialTopup = transactionsUser.data.data.find( transactions => 
                transactions.concept === 'initial' && transactions.type === 'topup' )
            
            const idAccount = initialTopup.accountId;
            const account = await fetchWalletApi.get( `/accounts/${ idAccount }` )

            
            // set de user data on redux
            return dispatch({
                type: LOGIN,
                payload: { active: true, user: info.data, account: account.data }
            });
        } catch (e) {
            console.log(e)
            return dispatch({
                type: LOGIN,
                payload: { active: false, user: {}, account: {} }
            });
        }
    }
};

// * logout from the app. This will clear all data in localStorage
export const logout = () => {
    localStorage.clear()
    return ({
        type: LOGOUT,
    });
}

// * Function to add money to the account user.
export const addMoneyToAccount = ( amount, id ) => {
    return async function( dispatch ) {
        const deposit = {
            type: 'topup',
            concept: 'Add money',
            amount: amount
        }

        /* const token = localStorage.getItem('token');
        const tokenBody = { headers: { Authorization: `Bearer ${token}`} }; */

        const depositMoneyToOwnUserAccount = await fetchWalletApi.post(
            `/accounts/${ id }`,
            deposit 
        );

        const detailAccount = await fetchWalletApi.get(`/accounts/${ id }` )

        return dispatch({
            type: POST_ADD_CASH,
            payload: detailAccount.data
        });
    }
};


// * This balance function will get all data we need in "Movientos" and "Balance" views
export const balance = () => {
    return async function( dispatch ) {
       /*  const token = localStorage.getItem('token');
        const tokenBody = { headers: { Authorization: `Bearer ${token}`} }; */

        const dataTransactions = await fetchWalletApi.get(
            "/transactions"
            // tokenBody
        );
     
        const topup = dataTransactions.data.data.filter(
            (transaction) => transaction.type === "topup"
        );

        const payment = dataTransactions.data.data.filter(
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
                totalBalance 
            },
            topupList: topup,
            paymentsList: payment
        });
    }
};

export const userData = () => {
    return async function( dispatch ) {

        /* const token = localStorage.getItem('token');
        const tokenBody = { headers: { Authorization: `Bearer ${token}`} }; */

        const userDetail = await fetchWalletApi.get( '/auth/me' );

        
        const transactionsUser = await fetchWalletApi.get( '/transactions' );

        const initialTopup = transactionsUser.data.data.find( transactions => 
            transactions.concept === 'initial' && transactions.type === 'topup' )
        
        const idAccount = initialTopup.accountId;
        const account = await fetchWalletApi.get( `/accounts/${idAccount}` )

        
        return dispatch({
            type: GET_USER_DATA,
            payload: { user: userDetail.data, account: account.data }
        });
    }
};