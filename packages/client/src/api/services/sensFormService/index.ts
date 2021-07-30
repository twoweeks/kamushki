import { API } from '../..';

import type { SendFormStatusResponseType } from './types';
import type { SendEntryQueryParamsType, SendEntryQueryResponseType } from './types';

const Controller = 'send-form';

export const SendFormAPI = {
    getStatus: async (): Promise<SendFormStatusResponseType> => {
        return await API.get(`${Controller}/get-status`).json();
    },

    sendEntry: async (params: SendEntryQueryParamsType): Promise<SendEntryQueryResponseType> => {
        return await API.put(`${Controller}/send-entry`, { json: params }).json();
    },
};

export default SendFormAPI;
