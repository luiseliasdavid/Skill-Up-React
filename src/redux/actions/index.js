import axios from 'axios';

export const POST_NEW_USER = 'POST_NEW_USER';
export const GET_USER_LIST = 'GET_USER_LIST';



export const createUser = ( user ) => {
    return async function( dispatch ) {
        const api = 'http://wallet-main.eba-ccwdurgr.us-east-1.elasticbeanstalk.com/users'
        const response = await axios.post(api, user );
        return dispatch({
            type: POST_NEW_USER,
            payload: response.data
        });

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

