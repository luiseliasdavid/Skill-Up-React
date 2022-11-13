import { USER_REQUEST, USER_SUCCESS, USER_FAILURE } from "../types/userTypes";

const initialState = {
    loading: false,
    userData: {},
    errorInfo: {},
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_REQUEST: {
            return {
                ...state,
                loading: true,
            }
        }
        case USER_SUCCESS: {
            return {
                loading: false,
                errorInfo: {},
                userData: action.payload,
            }
        }
        case USER_FAILURE: {
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