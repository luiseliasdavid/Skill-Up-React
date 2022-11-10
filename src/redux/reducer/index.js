// import actions
import {
   POST_NEW_USER,
   LOGIN,
   GET_USER_DATA,
   LOGOUT,
   POST_ACCOUNT,
   POST_ADD_CASH,
   SEND_MONEY,
   GET_BALANCE,
   GET_ALL_MOVEMENTS,
   GET_ALL_USERS_WITH_ACCOUNT,
   CLEAN_STATUS_REQUEST,
} from "../actions";

const initialState = {
   statusRequest: { status:'0' },
   userData: {},
   userList: [],
   movements: [],
};

const rootReducer = (state = initialState, action) => {
   switch (action.type) {
      case POST_NEW_USER:
         return {
            ...state,
            statusRequest: action.payload,
         };
      case POST_ACCOUNT:
         return {
            ...state,
            statusRequest: action.status,
            userData: {
               ...action.payload.user,
               account: action.payload.account,
            },
         };
      case GET_USER_DATA:
         if (action.status.status === 200) {
            return {
               ...state,
               statusRequest: action.status,
               userData: {
                  ...state.userData,
                  ...action.payload.user,
                  account: action.payload.account,
               },
            };
         }else {
            return {
               ...state,
               statusRequest: action.status
            }
         }
      case LOGIN:
         return {
            ...state,
            statusRequest: action.status,
           /*  userData: {
               ...action.payload.user,
               account: action.payload.account,
            }, */
         };
      case LOGOUT:
         return {
            ...state,
            userData: {},
            statusRequest: { status: '0' }
         };
      case CLEAN_STATUS_REQUEST:
         return {
            ...state,
            statusRequest: { status: '0' }
         }
      case POST_ADD_CASH:
         if( action.status.status === 200 ) {
            return {
               ...state,
               statusRequest: action.status,
               userData: { ...state.userData, account: action.payload },
            };
         }else {
            return {
               ...state,
               statusRequest: action.status
            };
         };
      case SEND_MONEY:
         if (action.status.status === 200) {
            return {
               ...state,
               statusRequest: action.status,
               userData: {
                  ...state.userData,
                  ...action.payload.user,
                  account: action.payload.account,
               },
            };
         }else {
            return {
               ...state,
               statusRequest: action.status
            }
         }
      case GET_BALANCE:
         if( action.status.status === 200 ) {
            return {
               ...state,
               userData: {
                  ...state.userData,
                  balance: action.payload,
                  transactions: {
                     topup: action.topupList,
                     payments: action.paymentsList,
                  },
               },
            };
         }else {
            return {
               ...state,
               statusRequest: action.status
            };
         };
      case GET_ALL_MOVEMENTS:
         if( action.status.status === 200 ) {
            return {
               ...state,
               statusRequest: action.status,
               movements: action.payload
            };
         } else {
            return {
               ...state,
               statusRequest: action.status
            };
         };
      case GET_ALL_USERS_WITH_ACCOUNT:
         if( action.status.status === 200 ) {
            return {
               ...state,
               userList: action.payload,
            };
         }else {
            return {
               ...state,
               statusRequest: action.status
            };
         };
      default:
         return state;
   }
};

export default rootReducer;
