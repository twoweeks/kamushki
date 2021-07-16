import { API } from '../';

import type { ContestsQueryResponseType } from '../types/gamesTypes';
import type { GamesQueryParamsType, GamesQueryResponseType } from '../types/gamesTypes';
import type { DeleteGamesQueryParamsType } from '../types/gamesTypes';

const Controller = 'games';

export const GamesAPI = {
    getContests: async (): Promise<ContestsQueryResponseType> => {
        return await API.get(`${Controller}/get-contests`).json();
    },

    getGames: async (params?: GamesQueryParamsType): Promise<GamesQueryResponseType> => {
        return await API.get(`${Controller}/get-games`, { searchParams: params }).json();
    },

    deleteGames: async (params: DeleteGamesQueryParamsType): Promise<Response> => {
        return await API.delete(`${Controller}/delete-games`, { json: params });
    },
};

export default GamesAPI;
