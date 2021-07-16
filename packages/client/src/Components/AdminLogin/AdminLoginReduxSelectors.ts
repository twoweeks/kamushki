import { createSelector } from '@reduxjs/toolkit';

import type { RootStateType } from '../../redux/rootReducer';
import type { AdminLoginStateType } from './AdminLoginTypes';

export const getIsAuth = createSelector<RootStateType, AdminLoginStateType['IsAuth'], AdminLoginStateType['IsAuth']>(
    state => state.adminLogin.IsAuth,
    IsAuth => IsAuth
);

export const getIsLoginPending = createSelector<RootStateType, AdminLoginStateType['IsLoginPending'], AdminLoginStateType['IsLoginPending']>(
    state => state.adminLogin.IsLoginPending,
    IsLoginPending => IsLoginPending
);

export const getIsLogihError = createSelector<RootStateType, AdminLoginStateType['IsLogihError'], AdminLoginStateType['IsLogihError']>(
    state => state.adminLogin.IsLogihError,
    IsLogihError => IsLogihError
);

export const getIsAuthCheckComplete = createSelector<
    RootStateType,
    AdminLoginStateType['IsAuthCheckComplete'],
    AdminLoginStateType['IsAuthCheckComplete']
>(
    state => state.adminLogin.IsAuthCheckComplete,
    IsAuthCheckComplete => IsAuthCheckComplete
);
