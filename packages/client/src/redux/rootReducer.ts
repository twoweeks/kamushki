import { combineReducers } from '@reduxjs/toolkit';

import sendPageReducer from '../Components/SendPage/SendPageReduxSlice';
import adminLoginReducer from '../Components/AdminLogin/AdminLoginReduxSlice';
import adminGamesPageReducer from '../Components/AdminPage/GamesPage/GamesPageReduxSlice';

const rootReducer = combineReducers({
    sendPage: sendPageReducer,
    adminLogin: adminLoginReducer,
    adminGamesPage: adminGamesPageReducer,
});

type RootReducerType = typeof rootReducer;
export type RootStateType = ReturnType<RootReducerType>;

export default rootReducer;
