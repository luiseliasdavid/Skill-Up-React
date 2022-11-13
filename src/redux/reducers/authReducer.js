import { AUTH_REQUEST, AUTH_SUCCESS, AUTH_FAILURE } from "../types/authTypes"

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
        case AUTH_SUCCESS: {
            return {
                loading: false,
                errorInfo: {},
                userData: action.payload,
                isLogged: true
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
        default:
            return state;
    }
}