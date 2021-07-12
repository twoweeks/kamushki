import { App as TinyHttpApp } from '@tinyhttp/app';
import { json as jsonParser } from 'milliparsec';

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import CONFIG from './config.js';

import type { GameItemType } from './types';

import getSendFormStatus from './utils/get-send-form-status.js';
import { getIsAuth } from './utils/check-auth.js';

import { getTwitchUsers } from './db/get-live-streams-users.js';
import { getGames } from './db/games.js';

import { getTwitchAuthTokenFlow, getTwitchLiveStreams } from './live-streams/twitch-api.js';
import { writeTwitchStreamsListFile, getTwitchStreamsListFilePath } from './live-streams/twitch-api.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const staticPath = join(__dirname, 'static');

const app = new TinyHttpApp();

app.use(jsonParser());

app.get('/robots.txt', (req, res) => {
    res.sendFile(join(staticPath, 'robots.txt'));
});

app.post('/api/auth', (req, res) => {
    if (!req.body || !req.body.auth_key) {
        res.status(400).end();
    }

    if (req.body.auth_key === CONFIG.auth_key) {
        res.cookie('auth_key', CONFIG.auth_key, {
            expires: new Date(Date.now() + 604800000), // 1 week
            httpOnly: true,
            sameSite: true,
        });
        res.status(200).end();
    } else {
        res.status(401).end();
    }
});

app.head('/api/check-auth', (req, res) => {
    const ResStatus = getIsAuth(req.headers.cookie || '') ? 200 : 401;
    res.status(ResStatus).end();
});

app.get('/api/get-live-streams', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate');

    res.sendFile(getTwitchStreamsListFilePath(staticPath));
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
                users = await getTwitchUsers();
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

app.get('/api/send-form-status', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate');

    res.json(getSendFormStatus(CONFIG.send_form_times));
});

app.get('/api/get-games', async (req, res) => {
    if (!getIsAuth(req.headers.cookie || '')) {
        res.status(401).end();
        return;
    }

    let games: GameItemType[] = [];

    try {
        games = await getGames(CONFIG.contest.number);
    } catch (err) {
        console.warn(err, '/', new Date().toISOString());
        res.status(500).end();
    }

    res.json(games);
});

app.use((req, res) => {
    res.sendFile(join(staticPath, '404.html'));
});

app.listen(3000);
