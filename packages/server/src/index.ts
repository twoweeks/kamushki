import { App as TinyHttpApp } from '@tinyhttp/app';
import { cors } from '@tinyhttp/cors';
import { json as jsonParser } from 'milliparsec';

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import CONFIG from './config.js';

import getSendFormStatus from './utils/get-send-form-status.js';

import authSubApp from './routes/auth.js';
import twitchLiveStreamsSubApp from './routes/twitch-live-streams.js';
import gamesSubApp from './routes/games.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const staticPath = join(__dirname, 'static');

const app = new TinyHttpApp();

app.use(cors({ origin: '*' }));
app.use(jsonParser());

app.get('/robots.txt', (req, res) => {
    res.sendFile(join(staticPath, 'robots.txt'));
});

app.use('/api/auth', authSubApp);

app.get('/api/get-send-form-status', (req, res) => {
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate');

    res.json(getSendFormStatus(CONFIG.send_form_times));
});

app.use('/api/games', gamesSubApp);

app.use('/api/twitch', twitchLiveStreamsSubApp);

app.use((req, res) => {
    res.sendFile(join(staticPath, '404.html'));
});

app.listen(3000);
