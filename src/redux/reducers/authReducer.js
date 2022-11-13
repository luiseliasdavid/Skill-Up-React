import { AUTH_REQUEST, AUTH_FAILURE, AUTH_LOGIN, AUTH_LOGOUT } from "../types/authTypes";

const initialState = {
    loading: false,
    userData: {},
    errorInfo: {},
    isLogged: false
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_REQUEST: {
            return {
                ...state,
                loading: true,
            }
        }
        case AUTH_FAILURE: {
            return {
                loading: false,
                errorInfo: action.payload,
                userData: {},
                isLogged: false
            }
        }
        case AUTH_LOGIN: {
            return {
                loading: false,
                errorInfo: {},
                userData: action.payload,
                isLogged: true
            }
        }
        case AUTH_LOGOUT: {
            return {
                loading: false,
                errorInfo: {},
                userData: {},
                isLogged: false
            }
        }
        default:
            return state;
    }
}