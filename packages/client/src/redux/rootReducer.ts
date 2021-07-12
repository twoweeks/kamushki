import { combineReducers } from '@reduxjs/toolkit';

import appReducer from '../Components/App/AppReduxSlice';

const rootReducer = combineReducers({
    app: appReducer,
});

type RootReducerType = typeof rootReducer;
export type RootStateType = ReturnType<RootReducerType>;

export default rootReducer;
