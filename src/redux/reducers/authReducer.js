import { AUTH_REQUEST, AUTH_SUCCESS, AUTH_FAILURE } from "../types/authTypes"

const initialState = {
    loading: false,
    userData: {},
    errorInfo: {},
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
            }
        }
        case AUTH_FAILURE: {
            return {
                loading: false,
                errorInfo: action.payload,
                userData: {},
            }
        }
        default:
            return state;
    }
}
