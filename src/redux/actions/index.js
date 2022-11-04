import axios from 'axios';

export const POST_NEW_USER = 'POST_NEW_USER';
export const GET_USER_LIST = 'GET_USER_LIST';
export const LOGIN = 'LOGIN';
export const LOGOUT= 'LOGOUT';

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
            dispatch ( login( emailAndPasword ) )
           console.log("holaaaaaaaaaaaaaaaaaaaaaaaaa")

            //create the account
            const account = createAccount( response.data.id );
            console.log(account,"esta es la account")
            
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

export const createAccount = ( id ) => {
    return async function( dispatch ) {
        // obtener la fecha de hoy en formato `yyyy-mm-dd 00:00:00`
        console.log("estamos en account")
        let date = new Date();
        let dateStr = date.getFullYear() + "-" +
        ("00" + (date.getMonth() + 1)).slice(-2) + "-" +
        ("00" + date.getDate()).slice(-2)  + " " +
        
        ("00" + date.getHours()).slice(-2) + ":" +
        ("00" + date.getMinutes()).slice(-2) + ":" +
        ("00" + date.getSeconds()).slice(-2);

        const data = {
            creationDate: `${dateStr}`,
            money: 230,
            isBlocked: false,
            userId: id
        }
        console.log(data)
        let token = localStorage.getItem('token');
        let tokenBody = { headers: { Authorization: `Bearer ${token}` }}
        
        //create the account whit this date
        let account = await axios.post( `${API_SWAGGER}/account`, data, tokenBody )
        console.log(account,"respuesta del account")
        return account;

    }
};

export const login = ( user ) => {
    return async function( dispatch ) {
        try {
            // get jwt from api
            const response = await axios.post( `${API_SWAGGER}/auth/login`, user );
            localStorage.setItem( 'token', response.data.accessToken )
            // get the user data and set on localsatorage
            let info = await axios.get( `${API_SWAGGER}/auth/me`,
             { headers: { Authorization: `Bearer ${response.data.accessToken}`} })
            
             //set info in local starage
             const userDataStorage = { 
                first_name: info.data.first_name,
                last_name: info.data.last_name,
                email: info.data.email,
                roleId: info.data.roleId,
                id: info.data.id
            }

            localStorage.setItem( 'user', JSON.stringify( userDataStorage ) )
            // set de user data on redux
            return dispatch({
                type: LOGIN,
                payload: true,
                userData: info.data
            });
        } catch (e) {
            console.log(e)
            return dispatch({
                type: LOGIN,
                payload: false,
                userData: {}
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

export const userList = () => {
    return async function( dispatch ) {
        const api = 'http://wallet-main.eba-ccwdurgr.us-east-1.elasticbeanstalk.com/users'
        const response = await axios.get( api );
        return dispatch({
            type: GET_USER_LIST,
            payload: response.data
        });
    }
};



