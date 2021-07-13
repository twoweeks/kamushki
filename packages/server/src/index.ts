import { App as TinyHttpApp } from '@tinyhttp/app';
import { cors } from '@tinyhttp/cors';
import { json as jsonParser } from 'milliparsec';

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import authSubApp from './routes/auth.js';
import sendFormSubApp from './routes/sendForm.js';
import gamesSubApp from './routes/games.js';
import twitchLiveStreamsSubApp from './routes/twitch-live-streams.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const staticPath = join(__dirname, 'static');

const app = new TinyHttpApp();

app.use(cors({ origin: '*' }));
app.use(jsonParser());

app.get('/robots.txt', (req, res) => {
    res.sendFile(join(staticPath, 'robots.txt'));
});

app.use('/api/auth', authSubApp);

app.use('/api/send-form', sendFormSubApp);

app.use('/api/games', gamesSubApp);

app.use('/api/twitch', twitchLiveStreamsSubApp);

app.use((req, res) => {
    res.status(404);
    res.sendFile(join(staticPath, '404.html'));
});

app.listen(3001);
