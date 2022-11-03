// import actions
import { POST_NEW_USER, GET_USER_LIST, LOGIN,
     LOGOUT } from "../actions";


const initialState = {
    userActive: false,
    createUser: false,
    userData: {},
    userList: [],
    };
    
    
    const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case POST_NEW_USER: 
            return {
                ...state,
                createUser: action.payload
            }
        case GET_USER_LIST:
            return {
                ...state,
                userList: action.payload
            }
        case LOGIN: 
            return {
                ...state,
                userActive: action.payload,
                userData: action.userData
            }
        case LOGOUT:
            return {
                ...state,
                userActive: false,
                userData: {}
            }  
        default:
            return state;
    }       
    }
    
    
    export default rootReducer;