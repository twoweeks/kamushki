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

export const getGamesData = createSelector<RootStateType, AdminGamesPageStateType['Data']['GamesData'], AdminGamesPageStateType['Data']['GamesData']>(
    state => state.adminGamesPage.Data.GamesData,
    GamesData => GamesData
);

export const getIsGamesDataPending = createSelector<
    RootStateType,
    AdminGamesPageStateType['Data']['IsGamesDataPending'],
    AdminGamesPageStateType['Data']['IsGamesDataPending']
>(
    state => state.adminGamesPage.Data.IsGamesDataPending,
    IsGamesDataPending => IsGamesDataPending
);

export const getIsDataPending = createSelector<
    RootStateType,
    AdminGamesPageStateType['Data']['IsContestsDataPending'],
    AdminGamesPageStateType['Data']['IsGamesDataPending'],
    boolean
>(getIsContestsDataPending, getIsGamesDataPending, (IsContestsDataPending, IsGamesDataPending) => IsContestsDataPending || IsGamesDataPending);

export const getGamesCount = createSelector<RootStateType, AdminGamesPageStateType['Data']['GamesData'], GamesCountObjectType>(
    getGamesData,
    GamesData => {
        const DemoGames = GamesData.filter(GameInfo => GameInfo.stage === 'demo');

        return {
            all: GamesData.length,
            demo: DemoGames.length,
            final: GamesData.length - DemoGames.length,
        };
    }
);

export const getSortedGamesData = createSelector<
    RootStateType,
    AdminGamesPageStateType['Data']['GamesData'],
    AdminGamesPageStateType['Data']['GamesData']
>(getGamesData, GamesData => {
    return [...GamesData].sort((a, b) => +new Date(b.date) - +new Date(a.date));
});

export const getStageFilterValue = createSelector<
    RootStateType,
    AdminGamesPageStateType['Filters']['Stage'],
    AdminGamesPageStateType['Filters']['Stage']
>(
    state => state.adminGamesPage.Filters.Stage,
    StageFilterValue => StageFilterValue
);

export const getFiltredGamesData = createSelector<
    RootStateType,
    AdminGamesPageStateType['Data']['GamesData'],
    AdminGamesPageStateType['Filters']['Stage'],
    AdminGamesPageStateType['Data']['GamesData']
>(getSortedGamesData, getStageFilterValue, (GamesData, StageFilterValue) => {
    switch (StageFilterValue) {
        case 'demo':
        case 'final':
            return GamesData.filter(GameInfo => GameInfo.stage === StageFilterValue);
        default:
            return GamesData;
    }
});
