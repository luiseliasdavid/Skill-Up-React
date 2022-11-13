import { TRANSACTION_REQUEST, TRANSACTION_FAILURE, TRANSACTION_CREATE, TRANSACTION_GET_DETAIL, TRANSACTION_GET_LIST, TRANSACTION_GET_ALL } from "../types/transactionTypes";

const initialState = {
    loading: false,
    transactionData: {},
    errorInfo: {},
    balanceData: {},
    paymentList: [],
    topupList: [],
    transactionList: []
}

export const transactionReducer = (state = initialState, action) => {
    switch (action.type) {
        case TRANSACTION_REQUEST: {
            return {
                ...state,
                loading: true,
            }
        }
        case TRANSACTION_FAILURE: {
            return {
                loading: false,
                transactionData: {},
                errorInfo: action.payload,
                balanceData: {},
                paymentList: [],
                topupList: [],
                transactionList: []
            }
        }
        case TRANSACTION_CREATE:
        case TRANSACTION_GET_DETAIL: {
            return {
                loading: false,
                transactionData: action.payload,
                errorInfo: {},
                balanceData: {},
                paymentList: [],
                topupList: [],
                transactionList: []
            }
        }
        case TRANSACTION_GET_LIST: {
            return {
                loading: false,
                transactionData: {},
                errorInfo: {},
                balanceData: {},
                paymentList: [],
                topupList: [],
                transactionList: action.payload
            }
        }
        case TRANSACTION_GET_ALL: {
            return {
                loading: false,
                transactionData: {},
                errorInfo: {},
                balanceData: action.payload.balanceDate,
                paymentList: action.payload.paymentList,
                topupList: action.payload.topupList,
                transactionList: action.payload.transactionList
            }
        }
        default:
            return state;
    }
}