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
             await axios.post( `${API_SWAGGER}/users`, user )
             
            
             //login the user
            const emailAndPasword = {
                email: user.email,
                password: user.password
            }
            dispatch (login(emailAndPasword))
           console.log("holaaaaaaaaaaaaaaaaaaaaaaaaa")
            //create the account
            const account = dispatch (createAccount(localStorage.getItem(JSON.parse(localStorage.getItem("user")).id)))
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

export const createAccount = (id)=> {
    return async function( dispatch ) {
// obtener la fecha de hoy en formato `yyyy-mm-dd 00:00:00`
console.log("estamos en account")
var date = new Date();
var dateStr = date.getFullYear() + "-" +
("00" + (date.getMonth() + 1)).slice(-2) + "-" +
("00" + date.getDate()).slice(-2)  + " " +
  
  ("00" + date.getHours()).slice(-2) + ":" +
  ("00" + date.getMinutes()).slice(-2) + ":" +
  ("00" + date.getSeconds()).slice(-2);

let data = {
    creationDate: `${dateStr}`,
    money: 150,
    isBlocked: false,
    userId: id
  }
console.log(data)
let token ={ headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6NjM0LCJyb2xlSWQiOjJ9LCJpYXQiOjE2Njc1NzYwMTIsImV4cCI6MTY2NzY2MjQxMn0.oC-sa76Abbv05Z3pQ5LEN1BwUWmaznGjTUE82OxhRYg`} }
//create the account whit this date
let account = await axios.post(`${API_SWAGGER}/account`,data,token)
 console.log(account,"respuesta del account")
 return account}
}

