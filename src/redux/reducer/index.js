// import actions
import { POST_NEW_USER, GET_USER_LIST, LOGIN,
     LOGOUT, POST_ACCOUNT, POST_ADD_CASH, GET_BALANCE } from "../actions";


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
                createUser: false,
                userActive: action.payload.active,
                userData: { ...action.payload.user, account: action.payload.account }
            }
        case LOGOUT:
            return {
                ...state,
                createUser: false,
                userActive: false,
                userData: {}
            }
        case POST_ACCOUNT: 
            return {
                ...state,
                userActive: action.payload.active,
                userData: { ...action.payload.user ,account: action.payload.account }
            }
        case POST_ADD_CASH: 
            return {
                ...state,
                userData: { ...state.userData, account: action.payload }
            }
        case GET_BALANCE: 
            return {
                ...state,
                userData: { ...state.userData, balance: action.payload, 
                            transactions: { topup: action.topupList, payments: action.paymentsList } 
                    }
            }         
        default:
            return state;
    }       
    }
    
    
    export default rootReducer;