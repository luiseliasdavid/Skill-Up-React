import { combineReducers } from "redux";

import { authReducer } from "./authReducer";
import { userReducer } from "./userReducer";
import { accountReducer } from "./accountReducer";
import { transactionReducer } from "./transactionReducer";

const rootReducer = combineReducers({
    authReducer,
    userReducer,
    accountReducer,
    transactionReducer
})

export default rootReducer;
