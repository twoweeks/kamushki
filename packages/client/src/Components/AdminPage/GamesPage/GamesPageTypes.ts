import { ContestsQueryResponseType, EntriesQueryResponseType } from '../../../api/services/gamesService/types';

export type AdminGamesPageStateType = {
    Data: {
        ContestsData: ContestsQueryResponseType;
        IsContestsDataPending: boolean;
        EntriesData: EntriesQueryResponseType;
        IsEntriesDataPending: boolean;
    };
    Filters: {
        Stage: 'all' | 'demo' | 'final';
    };
    EditableEntryID: string;
};

export type GamesCountObjectType = {
    all: number;
    demo: number;
    final: number;
};
