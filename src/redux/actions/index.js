import axios from 'axios';

export const POST_NEW_USER = 'POST_NEW_USER';
export const GET_USER_LIST = 'GET_USER_LIST';
export const LOGIN = 'LOGIN';
export const DELETE_USER = 'DELETE_USER';


export const createUser = ( user ) => {
    return async function( dispatch ) {
        try {
            const api = 'http://wallet-main.eba-ccwdurgr.us-east-1.elasticbeanstalk.com/users'
            const response = await axios.post(api, user );
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
            const api = 'http://wallet-main.eba-ccwdurgr.us-east-1.elasticbeanstalk.com/auth/login'
            const response = await axios.get( api, user );
            localStorage.setItem( 'email', user.email )
            localStorage.setItem( 'password', user.password )
            localStorage.setItem( 'token', response.data.accessToken )
            
            const apiDetail = 'http://wallet-main.eba-ccwdurgr.us-east-1.elasticbeanstalk.com/auth/me'
            const info = await axios.get( apiDetail, response.data )
            localStorage.setItem( 'first_name', info.data.first_name )
            localStorage.setItem( 'last_name', info.data.last_name )

            return dispatch({
                type: LOGIN,
                payload: true,
                userData: info.data
            });
        } catch (e) {
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

