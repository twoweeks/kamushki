import { API } from '../..';

import type { ContestsQueryResponseType } from './types';
import type { EntriesQueryParamsType, EntriesQueryResponseType } from './types';
import type { EditEntryInfoQueryParamsType } from './types';
import type { DeleteEntriesQueryParamsType } from './types';

const Controller = 'games';

export const GamesAPI = {
    getContests: async (): Promise<ContestsQueryResponseType> => {
        return await API.get(`${Controller}/get-contests`).json();
    },

    getEntries: async (params?: EntriesQueryParamsType): Promise<EntriesQueryResponseType> => {
        return await API.get(`${Controller}/get-entries`, { searchParams: params }).json();
    },

    editEntryInfo: async (params: EditEntryInfoQueryParamsType): Promise<EditEntryInfoQueryParamsType> => {
        return await API.patch(`${Controller}/edit-entry-info`, { json: params }).json();
    },

    deleteEntries: async (params: DeleteEntriesQueryParamsType): Promise<DeleteEntriesQueryParamsType> => {
        return await API.delete(`${Controller}/delete-entries`, { json: params }).json();
    },
};

export default GamesAPI;
