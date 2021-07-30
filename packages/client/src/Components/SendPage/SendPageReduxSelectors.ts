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

export const getSendedEntryStatus = createSelector<RootStateType, SendPageStateType['SendedEntryStatus'], SendPageStateType['SendedEntryStatus']>(
    state => state.sendPage.SendedEntryStatus,
    SendedEntryStatus => SendedEntryStatus
);

export const getIsSendEntryPending = createSelector<RootStateType, SendPageStateType['IsSendEntryPending'], SendPageStateType['IsSendEntryPending']>(
    state => state.sendPage.IsSendEntryPending,
    IsSendEntryPending => IsSendEntryPending
);
