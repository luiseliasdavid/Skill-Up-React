import axios from 'axios';

export const POST_NEW_USER = 'POST_NEW_USER';
export const POST_ACCOUNT = 'POST_ACCOUNT';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const POST_ADD_CASH = 'POST_ADD_CASH';
export const GET_BALANCE = 'GET_BALANCE';
export const GET_USER_DATA = 'GET_USER_DATA';


let date = new Date();
    let dateStr = date.getFullYear() + "-" +
    ("00" + (date.getMonth() + 1)).slice(-2) + "-" +
    ("00" + date.getDate()).slice(-2)  + " " +
    
    ("00" + date.getHours()).slice(-2) + ":" +
    ("00" + date.getMinutes()).slice(-2) + ":" +
    ("00" + date.getSeconds()).slice(-2);

const API_SWAGGER= 'http://wallet-main.eba-ccwdurgr.us-east-1.elasticbeanstalk.com'

export const createUser = ( user ) => {
    return async function( dispatch ) {
        try {
            //create the user
             const response = await axios.post( `${API_SWAGGER}/users`, user );
             
            
             //login the user
            const emailAndPasword = {
                email: user.email,
                password: user.password
            }
            /* dispatch( login(emailAndPasword) ) */


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


export const createAccount = ( id, emailAndPasword ) => {
    return async function( dispatch ) {
        // obtener la fecha de hoy en formato `yyyy-mm-dd 00:00:00`
        console.log("estamos en account")
        
         // get jwt from api
         const authLogin = await axios.post( `${API_SWAGGER}/auth/login`, emailAndPasword );
         localStorage.setItem( 'token', authLogin.data.accessToken )

        const data = {
            creationDate: `${dateStr}`,
            money: 0,
            isBlocked: false,
            userId: id
        }
        
        let token = localStorage.getItem('token');
        console.log(token);
        let tokenBody = { headers: { Authorization: `Bearer ${token}` }}
        
        console.log(tokenBody);
        //create the account whit this date
        let account = await axios.post( `${API_SWAGGER}/accounts`, data, tokenBody )
        console.log("respuesta del account");

        const deposit = {
            type: 'topup',
            concept: 'initial',
            amount: 0
        }

        const initialTopup = await axios.post( `${API_SWAGGER}/accounts/${account.data.id}`, deposit, tokenBody )
        
        const userDetail = await axios.get( `${API_SWAGGER}/auth/me`, tokenBody )
        const accountDetail = await axios.get( `${API_SWAGGER}/accounts/${ account.data.id }`, tokenBody )

        return dispatch({
            type: POST_ACCOUNT,
            payload: { user: userDetail.data, account: accountDetail.data, active: true }
        });

    }
};

export const login = ( user ) => {
    return async function( dispatch ) {
        try {
            // get jwt from api
            const response = await axios.post( `${API_SWAGGER}/auth/login`, user );
            localStorage.setItem( 'token', response.data.accessToken )

            // get the user data and set on localsatorage
            let tokenBody = { headers: { Authorization: `Bearer ${response.data.accessToken}` }}

            let info = await axios.get( `${API_SWAGGER}/auth/me`, tokenBody )
            
             //set info in local starage
             const userDataStorage = { 
                first_name: info.data.first_name,
                last_name: info.data.last_name,
                email: info.data.email,
                roleId: info.data.roleId,
                id: info.data.id
            }
            localStorage.setItem( 'user', JSON.stringify( userDataStorage ) )

            const transactionsUser = await axios.get( `${API_SWAGGER}/transactions`, tokenBody )

            const initialTopup = transactionsUser.data.data.find( transactions => 
                transactions.concept === 'initial' && transactions.type === 'topup' )
            
            const idAccount = initialTopup.accountId;
            const account = await axios.get( `${API_SWAGGER}/accounts/${idAccount}`, tokenBody )

            
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

export const logout = () => {
        localStorage.clear()
        return ({
            type: LOGOUT,
        });
}

export const addMoneyToAccount = ( amount, id ) => {
    return async function( dispatch ) {
        const deposit = {
            type: 'topup',
            concept: 'Add money',
            amount: amount
        }

        const token = localStorage.getItem('token');
        const tokenBody = { headers: { Authorization: `Bearer ${token}`} };

        const info = await axios.post( `${API_SWAGGER}/accounts/${ id }`, deposit, tokenBody)

        const detailAccount = await axios.get(`${API_SWAGGER}/accounts/${ id }`, tokenBody )

        return dispatch({
            type: POST_ADD_CASH,
            payload: detailAccount.data
        });
    }
};

export const balance = () => {
    return async function( dispatch ) {
        const token = localStorage.getItem('token');
        const tokenBody = { headers: { Authorization: `Bearer ${token}`} };

        const dataTransactions = await axios.get( `${API_SWAGGER}/transactions`, tokenBody );
        console.log(dataTransactions);
        const topup = dataTransactions.data.data.filter( transaction => transaction.type === 'topup' );
        const payment = dataTransactions.data.data.filter( transaction => transaction.type === 'payment' );

        const initialValue = 0;
        const balanceTopup = topup.reduce(
        (previousAmount, currentAmount) => Number(currentAmount.amount) + Number(previousAmount),
        initialValue
        );
        
        const balancePayment = payment.reduce(
            (previousAmount, currentAmount) => Number(currentAmount.amount) + Number(previousAmount),
            initialValue
            );
        
        const totalBalance = balanceTopup - balancePayment;

        return dispatch({
            type: GET_BALANCE,
            payload: { topup: balanceTopup, payments: balancePayment, totalBalance },
            topupList: topup,
            paymentsList: payment
        });
    }
}


export const userData = () => {
    return async function( dispatch ) {

        const token = localStorage.getItem('token');
        const tokenBody = { headers: { Authorization: `Bearer ${token}`} };

        const userDetail = await axios.get( `${API_SWAGGER}/auth/me`, tokenBody );

        
        const transactionsUser = await axios.get( `${API_SWAGGER}/transactions`, tokenBody );

        const initialTopup = transactionsUser.data.data.find( transactions => 
            transactions.concept === 'initial' && transactions.type === 'topup' )
        
        const idAccount = initialTopup.accountId;
        const account = await axios.get( `${API_SWAGGER}/accounts/${idAccount}`, tokenBody )


        
        return dispatch({
            type: GET_USER_DATA,
            payload: { user: userDetail.data, account: account.data }
        });
    }
} 
