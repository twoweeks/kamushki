import { API } from '../';

import type { ContestsQueryResponseType } from '../types/gamesTypes';
import type { GamesQueryParamsType, GamesQueryResponseType } from '../types/gamesTypes';

const Controller = 'games';

export const GamesAPI = {
    getContests: async (): Promise<ContestsQueryResponseType> => {
        return await API.get(`${Controller}/get-contests`).json();
    },

    getGames: async (params: GamesQueryParamsType): Promise<GamesQueryResponseType> => {
        return await API.put(`${Controller}/getGames`, { searchParams: params }).json();
    },
};

export default GamesAPI;
