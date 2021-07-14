import Fastify from 'fastify';
import FastifyCorsPlugin from 'fastify-cors';
import FastifyCookiePlugin from 'fastify-cookie';
import FastifyStaticPlugin from 'fastify-static';
import FastifySwaggerPlugin from 'fastify-swagger';

import CONFIG from './config.js';

import { StaticPath } from './common.js';

import authRoutes from './routes/auth.js';
import sendFormRoutes from './routes/sendForm.js';
import gamesRoutes from './routes/games.js';
import twitchLiveStreamsRoutes from './routes/twitch-live-streams.js';

import { createTwitchApiLoop } from './live-streams/twitch-api.js';

const app = Fastify({});

app.register(FastifyCorsPlugin);
app.register(FastifyCookiePlugin);

app.register(FastifySwaggerPlugin, {
    routePrefix: '/apidocs',
    swagger: {
        info: {
            title: 'TWG App API',
            version: '1.0.0',
        },
    },
    staticCSP: true,
    exposeRoute: true,
});

app.register(FastifyStaticPlugin, { root: StaticPath });

app.get('/robots.txt', async (req, res) => {
    res.sendFile('robots.txt');
});

app.register(authRoutes, { prefix: '/api/auth' });

app.register(sendFormRoutes, { prefix: '/api/send-form' });

app.register(gamesRoutes, { prefix: '/api/games' });

app.register(twitchLiveStreamsRoutes, { prefix: '/api/twitch' });

app.setNotFoundHandler(async (req, res) => {
    res.status(404);
    res.sendFile('404.html');
});

await app.listen(CONFIG.server.port);

await createTwitchApiLoop(StaticPath, CONFIG.API_KEYS.twitch.client_id, CONFIG.API_KEYS.twitch.client_secret);
