
import { USER_REQUEST, USER_FAILURE, USER_CREATE, USER_GET_DETAIL, USER_DELETE } from "../types/userTypes";

const initialState = {
    loading: false,
    userData: {},
    errorInfo: {},
    userList: []
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_REQUEST: {
            return {
                ...state,
                loading: true,
            }
        }
        case USER_FAILURE: {
            return {
                loading: false,
                userData: {},
                errorInfo: action.payload,
                userList: []
            }
        }
        case USER_CREATE: {
            return {
                loading: false,
                userData: action.payload,
                errorInfo: {},
                userList: []
            }
        }
        case USER_GET_DETAIL: {
            return {
                ...state,
                loading: false,
            }
        }
        case USER_DELETE: {
            return {
                loading: false,
                userData: {},
                errorInfo: {},
                userList: []
            }
        }
        default:
            return state;
    }
}