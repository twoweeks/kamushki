import { ContestsQueryResponseType, GamesQueryResponseType } from '../../../api/types/gamesTypes';

export type AdminGamesPageStateType = {
    Data: {
        ContestsData: ContestsQueryResponseType;
        IsContestsDataPending: boolean;
        GamesData: GamesQueryResponseType;
        IsGamesDataPending: boolean;
    };
    Filters: {
        Stage: 'all' | 'demo' | 'final';
    };
};

export type GamesCountObjectType = {
    all: number;
    demo: number;
    final: number;
};
