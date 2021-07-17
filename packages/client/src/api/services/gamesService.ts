import { API } from '../';

import type { ContestsQueryResponseType } from '../types/gamesTypes';
import type { GamesQueryParamsType, GamesQueryResponseType } from '../types/gamesTypes';
import type { EditGameInfoQueryParamsType } from '../types/gamesTypes';
import type { DeleteGamesQueryParamsType } from '../types/gamesTypes';

const Controller = 'games';

export const GamesAPI = {
    getContests: async (): Promise<ContestsQueryResponseType> => {
        return await API.get(`${Controller}/get-contests`).json();
    },

    getGames: async (params?: GamesQueryParamsType): Promise<GamesQueryResponseType> => {
        return await API.get(`${Controller}/get-games`, { searchParams: params }).json();
    },

    editGameInfo: async (params: EditGameInfoQueryParamsType): Promise<EditGameInfoQueryParamsType> => {
        return await API.patch(`${Controller}/edit-game-info`, { json: params }).json();
    },

    deleteGames: async (params: DeleteGamesQueryParamsType): Promise<DeleteGamesQueryParamsType> => {
        return await API.delete(`${Controller}/delete-games`, { json: params }).json();
    },
};

export default GamesAPI;
