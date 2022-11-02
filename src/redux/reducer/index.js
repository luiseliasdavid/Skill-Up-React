// import actions
import { POST_NEW_USER, GET_USER_LIST } from "../actions";



const initialState = {
    userActive: [],
    userList: [],
    };
    
    
    const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case POST_NEW_USER: 
            return {
                ...state
            }
        case GET_USER_LIST:
            return {
                ...state,
                userList: action.payload
            }
            
        default:
            return state;
    }       
    }
    
    
    export default rootReducer;