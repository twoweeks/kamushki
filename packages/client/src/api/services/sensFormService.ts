import { SendFormStatusResponseType, SendFormQueryParamsType } from '../types/sendFormTypes';

import { API } from '../';

const Controller = 'send-form';

export const SendFormAPI = {
    getStatus: async (): Promise<SendFormStatusResponseType> => {
        return await API.get(`${Controller}/get-status`).json();
    },

    sendGame: async (params: SendFormQueryParamsType): Promise<Response> => {
        return await API.put(`${Controller}/send-game`, { json: params });
    },
};

export default SendFormAPI;
