import { App as TinyHttpApp } from '@tinyhttp/app';

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import CONFIG from './config.js';

import getSendFormStatus from './utils/get-send-form-status.js';

import { getTwitchAuthTokenFlow, getTwitchLiveStreams } from './live-streams/twitch-api.js';
import { writeTwitchStreamsListFile, getTwitchStreamsListFilePath } from './live-streams/twitch-api.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = new TinyHttpApp();

const staticPath = join(__dirname, 'static');

app.get('/robots.txt', (req, res) => {
    res.sendFile(join(staticPath, 'robots.txt'));
});

app.get('/live', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate');

    res.json(getTwitchStreamsListFilePath(staticPath));
});

(async () => {
    let token = '';

    try {
        token = await getTwitchAuthTokenFlow(staticPath, CONFIG.API_KEYS.twitch.client_id, CONFIG.API_KEYS.twitch.client_secret);
    } catch (err) {
        console.warn(err, '/', new Date().toISOString());
    }

    if (token !== '') {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let timerID: any = -1;

        const requestAndWriteData = async () => {
            let users: string[] = [];

            try {
                users = [];
            } catch (err) {
                console.warn(err, '/', new Date().toISOString());
            }

            if (users.length === 0) return [];

            return getTwitchLiveStreams(users, CONFIG.API_KEYS.twitch.client_id, token)
                .then(data => {
                    writeTwitchStreamsListFile(staticPath, data);
                })
                .catch(() => {
                    console.warn('Twitch API query failed', new Date().toISOString());
                    writeTwitchStreamsListFile(staticPath, []);
                    clearInterval(timerID);
                });
        };

        requestAndWriteData();

        timerID = setInterval(() => {
            requestAndWriteData();
        }, 30 * 1000);
    }
})();

app.get('/send-form-status', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate');

    res.json(getSendFormStatus(CONFIG.send_form_times)).end();
});

app.use((req, res) => {
    res.sendFile(join(staticPath, '404.html'));
});

app.listen(3000);
