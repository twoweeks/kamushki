import { combineReducers } from '@reduxjs/toolkit';

import appReducer from '../Components/App/AppReduxSlice';
import sendPageReducer from '../Components/SendPage/SendPageReduxSlice';

const rootReducer = combineReducers({
    app: appReducer,
    sendPage: sendPageReducer,
});

type RootReducerType = typeof rootReducer;
export type RootStateType = ReturnType<RootReducerType>;

export default rootReducer;
