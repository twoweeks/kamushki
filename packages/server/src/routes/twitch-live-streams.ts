import { App as SubApp } from '@tinyhttp/app';

import CONFIG from '../config.js';

import { StaticPath } from '../common.js';

import { getTwitchUsers } from '../db/get-live-streams-users.js';

import { getTwitchAuthTokenFlow, getTwitchLiveStreams } from '../live-streams/twitch-api.js';
import { writeTwitchStreamsListFile, getTwitchStreamsListFilePath } from '../live-streams/twitch-api.js';

const subApp = new SubApp();

subApp.get('/get-live-streams', (req, res) => {
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate');

    res.sendFile(getTwitchStreamsListFilePath(StaticPath));
});

(async () => {
    let token = '';

    try {
        token = await getTwitchAuthTokenFlow(StaticPath, CONFIG.API_KEYS.twitch.client_id, CONFIG.API_KEYS.twitch.client_secret);
    } catch (err) {
        console.warn(err, '/', new Date().toISOString());
    }

    if (token !== '') {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let timerID: any = -1;

        const requestAndWriteData = async () => {
            let users: string[] = [];

            try {
                users = await getTwitchUsers();
            } catch (err) {
                console.warn(err, '/', new Date().toISOString());
            }

            if (users.length === 0) return [];

            return getTwitchLiveStreams(users, CONFIG.API_KEYS.twitch.client_id, token)
                .then(data => {
                    writeTwitchStreamsListFile(StaticPath, data);
                })
                .catch(() => {
                    console.warn('Twitch API query failed', new Date().toISOString());
                    writeTwitchStreamsListFile(StaticPath, []);
                    clearInterval(timerID);
                });
        };

        requestAndWriteData();

        timerID = setInterval(() => {
            requestAndWriteData();
        }, 30 * 1000);
    }
})();

export default subApp;
