import { combineReducers } from "redux";

import { authReducer } from "./authReducer";
import { userReducer } from "./userReducer";
import { accountReducer } from "./accountReducer";

const rootReducer = combineReducers({
    authReducer,
    userReducer,
    accountReducer
})

export default rootReducer;
