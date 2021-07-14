import { createSelector } from '@reduxjs/toolkit';

import type { RootStateType } from '../../redux/rootReducer';
import type { SendPageStateType } from './SendPageTypes';

export const getFormStatus = createSelector<RootStateType, SendPageStateType['FormStatus'], SendPageStateType['FormStatus']>(
    state => state.sendPage.FormStatus,
    FormStatus => FormStatus
);

export const getIsFormStatusPending = createSelector<
    RootStateType,
    SendPageStateType['IsFormStatusPending'],
    SendPageStateType['IsFormStatusPending']
>(
    state => state.sendPage.IsFormStatusPending,
    IsFormStatusPending => IsFormStatusPending
);

export const getSendedGameStatus = createSelector<RootStateType, SendPageStateType['SendedGameStatus'], SendPageStateType['SendedGameStatus']>(
    state => state.sendPage.SendedGameStatus,
    SendedGameStatus => SendedGameStatus
);

export const getIsSendGamePending = createSelector<RootStateType, SendPageStateType['IsSendGamePending'], SendPageStateType['IsSendGamePending']>(
    state => state.sendPage.IsSendGamePending,
    IsSendGamePending => IsSendGamePending
);
