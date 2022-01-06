import { createSelector } from '@reduxjs/toolkit';

import type { RootStateType } from '../../../redux/rootReducer';
import type { GamesCountObjectType } from './GamesPageTypes';

export const getContestsData = createSelector(
    (state: RootStateType) => state.adminGamesPage.Data.ContestsData,
    ContestsData => ContestsData
);

export const getIsContestsDataPending = createSelector(
    (state: RootStateType) => state.adminGamesPage.Data.IsContestsDataPending,
    IsContestsDataPending => IsContestsDataPending
);

export const getEntriesData = createSelector(
    (state: RootStateType) => state.adminGamesPage.Data.EntriesData,
    EntriesData => EntriesData
);

export const getIsEntriesDataPending = createSelector(
    (state: RootStateType) => state.adminGamesPage.Data.IsEntriesDataPending,
    IsEntriesDataPending => IsEntriesDataPending
);

export const getIsDataPending = createSelector(
    getIsContestsDataPending,
    getIsEntriesDataPending,
    (IsContestsDataPending, IsEntriesDataPending) => IsContestsDataPending || IsEntriesDataPending
);

export const getEntriesCount = createSelector(getEntriesData, EntriesData => {
    const DemoEntries = EntriesData.filter(EntryData => EntryData.stage === 'demo');

    const EntriesCount: GamesCountObjectType = {
        all: EntriesData.length,
        demo: DemoEntries.length,
        final: EntriesData.length - DemoEntries.length,
    };

    return EntriesCount;
});

export const getSortedEntriesData = createSelector(getEntriesData, EntriesData => {
    return [...EntriesData].sort((a, b) => +new Date(b.date) - +new Date(a.date));
});

export const getStageFilterValue = createSelector(
    (state: RootStateType) => state.adminGamesPage.Filters.Stage,
    StageFilterValue => StageFilterValue
);

export const getFiltredEntriesData = createSelector(getSortedEntriesData, getStageFilterValue, (EntriesData, StageFilterValue) => {
    switch (StageFilterValue) {
        case 'demo':
        case 'final':
            return EntriesData.filter(EntryData => EntryData.stage === StageFilterValue);
        default:
            return EntriesData;
    }
});

export const getEditableEntryID = createSelector(
    (state: RootStateType) => state.adminGamesPage.EditableEntryID,
    EditableGameID => EditableGameID
);

export const getEditableEntryData = createSelector(getEntriesData, getEditableEntryID, (EntriesData, EditableEntryID) => {
    return EntriesData.find(EntryData => EntryData._id === EditableEntryID);
});
