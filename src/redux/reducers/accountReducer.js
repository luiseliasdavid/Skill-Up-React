import { ACCOUNT_REQUEST, ACCOUNT_FAILURE, ACCOUNT_CREATE, ACCOUNT_GET_DATA, ACCOUNT_GET_DETAIL, ACCOUNT_GET_ALL, ACCOUNT_DEPOSIT } from "../types/accountTypes";

const initialState = {
    loading: false,
    accountData: {},
    errorInfo: {},
    accountsList: []
}

export const accountReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACCOUNT_REQUEST: {
            return {
                ...state,
                loading: true,
            }
        }
        case ACCOUNT_FAILURE: {
            return {
                loading: false,
                accountData: {},
                errorInfo: action.payload,
                accountsList: []
            }
        }
        case ACCOUNT_CREATE:
        case ACCOUNT_GET_DATA: {
            return {
                loading: false,
                accountData: action.payload,
                errorInfo: {},
                accountList: []
            }
        }
        case ACCOUNT_GET_DETAIL: {
            return {
                ...state,
                loading: false
            }
        }
        case ACCOUNT_GET_ALL: {
            return {
                loading: false,
                accountData: {},
                errorInfo: {},
                accountList: action.payload
            }
        }
        case ACCOUNT_DEPOSIT: {
            return {
                ...state,
                loading: false,
                accountData: action.payload,
            }
        }
        default:
            return state;
    }
}