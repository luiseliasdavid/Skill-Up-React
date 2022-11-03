import axios from 'axios';

export const POST_NEW_USER = 'POST_NEW_USER';
export const GET_USER_LIST = 'GET_USER_LIST';
export const LOGIN = 'LOGIN';
export const DELETE_USER = 'DELETE_USER';

const API_SWAGGER= 'http://wallet-main.eba-ccwdurgr.us-east-1.elasticbeanstalk.com'

export const createUser = ( user ) => {
    return async function( dispatch ) {
        try {
            
            const response = await axios.post( `${API_SWAGGER}/users`, user );
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
            let info= await axios.get( `${API_SWAGGER}/auth/me`,
             {headers: { Authorization: `Bearer ${response.data.accessToken}`} })
            localStorage.setItem( 'user', user.password )
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

export const logout = ( id ) => {
    return async function( dispatch ) {
        const api = `http://wallet-main.eba-ccwdurgr.us-east-1.elasticbeanstalk.com/users/${ id }`
        const response = await axios.delete( api );
        localStorage.clear()
        return dispatch({
            type: DELETE_USER,
        });
    }
}

