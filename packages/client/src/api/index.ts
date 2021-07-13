import ky from 'ky';

import CONFIG from '../config';

export const API = ky.create({
    prefixUrl: `${CONFIG.api_host}/api`,
    retry: { limit: 0 },
    hooks: {
        afterResponse: [
            (_request, _options, response) => {
                if (!response.ok) {
                    if (response.status === 401) {
                        //
                    }
                }
            },
        ],
    },
});
