import { combineReducers } from '@reduxjs/toolkit';

import appReducer from '../Components/App/AppReduxSlice';
import sendPageReducer from '../Components/SendPage/SendPageReduxSlice';
import adminLoginReducer from '../Components/AdminLogin/AdminLoginReduxSlice';

const rootReducer = combineReducers({
    app: appReducer,
    sendPage: sendPageReducer,
    adminLogin: adminLoginReducer,
});

type RootReducerType = typeof rootReducer;
export type RootStateType = ReturnType<RootReducerType>;

export default rootReducer;
