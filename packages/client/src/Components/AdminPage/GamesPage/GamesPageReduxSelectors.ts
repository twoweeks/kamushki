import { createSelector } from '@reduxjs/toolkit';

import type { RootStateType } from '../../../redux/rootReducer';
import type { AdminGamesPageStateType, GamesCountObjectType } from './GamesPageTypes';

export const getContestsData = createSelector<
    RootStateType,
    AdminGamesPageStateType['Data']['ContestsData'],
    AdminGamesPageStateType['Data']['ContestsData']
>(
    state => state.adminGamesPage.Data.ContestsData,
    ContestsData => ContestsData
);

export const getIsContestsDataPending = createSelector<
    RootStateType,
    AdminGamesPageStateType['Data']['IsContestsDataPending'],
    AdminGamesPageStateType['Data']['IsContestsDataPending']
>(
    state => state.adminGamesPage.Data.IsContestsDataPending,
    IsContestsDataPending => IsContestsDataPending
);

export const getEntriesData = createSelector<
    RootStateType,
    AdminGamesPageStateType['Data']['EntriesData'],
    AdminGamesPageStateType['Data']['EntriesData']
>(
    state => state.adminGamesPage.Data.EntriesData,
    EntriesData => EntriesData
);

export const getIsEntriesDataPending = createSelector<
    RootStateType,
    AdminGamesPageStateType['Data']['IsEntriesDataPending'],
    AdminGamesPageStateType['Data']['IsEntriesDataPending']
>(
    state => state.adminGamesPage.Data.IsEntriesDataPending,
    IsEntriesDataPending => IsEntriesDataPending
);

export const getIsDataPending = createSelector<
    RootStateType,
    AdminGamesPageStateType['Data']['IsContestsDataPending'],
    AdminGamesPageStateType['Data']['IsEntriesDataPending'],
    boolean
>(getIsContestsDataPending, getIsEntriesDataPending, (IsContestsDataPending, IsEntriesDataPending) => IsContestsDataPending || IsEntriesDataPending);

export const getEntriesCount = createSelector<RootStateType, AdminGamesPageStateType['Data']['EntriesData'], GamesCountObjectType>(
    getEntriesData,
    EntriesData => {
        const DemoEntries = EntriesData.filter(EntryData => EntryData.stage === 'demo');

        return {
            all: EntriesData.length,
            demo: DemoEntries.length,
            final: EntriesData.length - DemoEntries.length,
        };
    }
);

export const getSortedEntriesData = createSelector<
    RootStateType,
    AdminGamesPageStateType['Data']['EntriesData'],
    AdminGamesPageStateType['Data']['EntriesData']
>(getEntriesData, EntriesData => {
    return [...EntriesData].sort((a, b) => +new Date(b.date) - +new Date(a.date));
});

export const getStageFilterValue = createSelector<
    RootStateType,
    AdminGamesPageStateType['Filters']['Stage'],
    AdminGamesPageStateType['Filters']['Stage']
>(
    state => state.adminGamesPage.Filters.Stage,
    StageFilterValue => StageFilterValue
);

export const getFiltredEntriesData = createSelector<
    RootStateType,
    AdminGamesPageStateType['Data']['EntriesData'],
    AdminGamesPageStateType['Filters']['Stage'],
    AdminGamesPageStateType['Data']['EntriesData']
>(getSortedEntriesData, getStageFilterValue, (EntriesData, StageFilterValue) => {
    switch (StageFilterValue) {
        case 'demo':
        case 'final':
            return EntriesData.filter(EntryData => EntryData.stage === StageFilterValue);
        default:
            return EntriesData;
    }
});

export const getEditableEntryID = createSelector<
    RootStateType,
    AdminGamesPageStateType['EditableEntryID'],
    AdminGamesPageStateType['EditableEntryID']
>(
    state => state.adminGamesPage.EditableEntryID,
    EditableGameID => EditableGameID
);

export const getEditableEntryData = createSelector<
    RootStateType,
    AdminGamesPageStateType['Data']['EntriesData'],
    AdminGamesPageStateType['EditableEntryID'],
    AdminGamesPageStateType['Data']['EntriesData'][0] | undefined
>(getEntriesData, getEditableEntryID, (EntriesData, EditableEntryID) => EntriesData.find(EntryData => EntryData._id === EditableEntryID));
