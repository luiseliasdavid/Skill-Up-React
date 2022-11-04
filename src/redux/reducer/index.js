// import actions
import { POST_NEW_USER, GET_USER_LIST, LOGIN,
     LOGOUT, POST_ACCOUNT } from "../actions";


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
                createUser: action.payload,
            }
        case GET_USER_LIST:
            return {
                ...state,
                userList: action.payload
            }
        case LOGIN: 
            return {
                ...state,
                userActive: action.payload[0],
                userData: { ...state.userData, ...action.payload[1] }
            }
        case LOGOUT:
            return {
                ...state,
                userActive: false,
                userData: {}
            }
        case POST_ACCOUNT: 
        return {
            ...state,
            userData: { ...state.userData, account: action.payload }
        }      
        default:
            return state;
    }       
    }
    
    
    export default rootReducer;