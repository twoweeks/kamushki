import Fastify from 'fastify';
import FastifyCorsPlugin from 'fastify-cors';
import FastifyHelmetPlugin from 'fastify-helmet';
import FastifyCookiePlugin from 'fastify-cookie';
import FastifyStaticPlugin from 'fastify-static';
import FastifySwaggerPlugin from 'fastify-swagger';

import CONFIG from './config.js';

import { StaticPath, ClientPath } from './common.js';
import { getIsAuth } from './utils/check-auth.js';

import authRoutes from './routes/auth.js';
import sendFormRoutes from './routes/sendForm.js';
import gamesRoutes from './routes/games.js';
// import twitchLiveStreamsRoutes from './routes/twitch-live-streams.js';

// import { createTwitchApiLoop } from './live-streams/twitch-api.js';

const app = Fastify({});

app.register(FastifyCorsPlugin);

app.register(FastifyHelmetPlugin, {
    contentSecurityPolicy: {
        directives: {
            defaultSrc: [`'self'`],
            frameAncestors: [`'self' ${CONFIG.contest.site}`],
            childSrc: [`'self' https://www.google.com`],
            styleSrc: [`'self' 'unsafe-inline'`],
            scriptSrc: [`'self' 'unsafe-inline' https://www.google.com https://www.gstatic.com`],
        },
    },
});

app.register(FastifyCookiePlugin);

// Swagger

const DocsPath = '/apidocs';

app.addHook('onRequest', (req, res, next) => {
    if (req.routerPath.startsWith(DocsPath) && !getIsAuth(req.cookies)) {
        res.status(401).send();
        return;
    }

    res.header('X-Frame-Options', `ALLOW-FROM ${CONFIG.contest.site}`);

    next();
});

app.register(FastifySwaggerPlugin, {
    routePrefix: DocsPath,
    openapi: {
        info: {
            title: 'TWG App API',
            version: '1.0.0',
        },
    },
    staticCSP: true,
    exposeRoute: true,
});

app.register(FastifyStaticPlugin, { root: StaticPath });

app.register(FastifyStaticPlugin, {
    root: ClientPath,
    prefix: '/client/',
    decorateReply: false,
});

app.get('/robots.txt', { schema: { hide: true } }, async (req, res) => {
    res.sendFile('robots.txt');
});

// Routes

app.register(authRoutes, { prefix: '/api/auth' });

app.register(sendFormRoutes, { prefix: '/api/send-form' });

app.register(gamesRoutes, { prefix: '/api/games' });

// app.register(twitchLiveStreamsRoutes, { prefix: '/api/twitch' });

app.setNotFoundHandler(async (req, res) => {
    res.status(404);
    res.sendFile('404.html');
});

app.listen(CONFIG.server.port, CONFIG.server.host, (err, address) => {
    console.log('Server started on address ', address);

    if (err) {
        app.log.error(err);
        process.exit(1);
    }
});

// createTwitchApiLoop(StaticPath, CONFIG.API_KEYS.twitch.client_id, CONFIG.API_KEYS.twitch.client_secret);
