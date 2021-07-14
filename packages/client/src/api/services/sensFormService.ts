import { API } from '../';

import type { SendFormStatusResponseType } from '../types/sendFormTypes';
import type { SendFormQueryParamsType, SendFormResponseType } from '../types/sendFormTypes';

const Controller = 'send-form';

export const SendFormAPI = {
    getStatus: async (): Promise<SendFormStatusResponseType> => {
        return await API.get(`${Controller}/get-status`).json();
    },

    sendGame: async (params: SendFormQueryParamsType): Promise<SendFormResponseType> => {
        return await API.put(`${Controller}/send-game`, { json: params }).json();
    },
};

export default SendFormAPI;
