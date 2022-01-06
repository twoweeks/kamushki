import { createSelector } from '@reduxjs/toolkit';

import type { RootStateType } from '../../redux/rootReducer';

export const getIsAuth = createSelector(
    (state: RootStateType) => state.adminLogin.IsAuth,
    IsAuth => IsAuth
);

export const getIsLoginPending = createSelector(
    (state: RootStateType) => state.adminLogin.IsLoginPending,
    IsLoginPending => IsLoginPending
);

export const getIsLogihError = createSelector(
    (state: RootStateType) => state.adminLogin.IsLogihError,
    IsLogihError => IsLogihError
);

export const getIsAuthCheckComplete = createSelector(
    (state: RootStateType) => state.adminLogin.IsAuthCheckComplete,
    IsAuthCheckComplete => IsAuthCheckComplete
);
