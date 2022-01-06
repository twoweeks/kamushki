import { createSelector } from '@reduxjs/toolkit';

import type { RootStateType } from '../../redux/rootReducer';

export const getFormStatus = createSelector(
    (state: RootStateType) => state.sendPage.FormStatus,
    FormStatus => FormStatus
);

export const getIsFormStatusPending = createSelector(
    (state: RootStateType) => state.sendPage.IsFormStatusPending,
    IsFormStatusPending => IsFormStatusPending
);

export const getSendedEntryStatus = createSelector(
    (state: RootStateType) => state.sendPage.SendedEntryStatus,
    SendedEntryStatus => SendedEntryStatus
);

export const getIsSendEntryPending = createSelector(
    (state: RootStateType) => state.sendPage.IsSendEntryPending,
    IsSendEntryPending => IsSendEntryPending
);
