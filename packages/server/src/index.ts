import Koa from 'koa';
import KoaRouter from '@koa/router';

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import CONFIG from './config.js';

import { readStaticFileStream } from './utils/fs-utils.js';
import getSendFormStatus from './utils/get-send-form-status.js';

import { getTwitchAuthTokenFlow, getTwitchLiveStreams } from './live-streams/twitch-api.js';
import { writeTwitchStreamsListFile, readTwitchStreamsListFileStream } from './live-streams/twitch-api.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = new Koa();
const router = new KoaRouter();

const staticPath = join(__dirname, 'static');

const readStaticFile = (fileName: string) => readStaticFileStream(staticPath, fileName);

router.get('/robots.txt', async (ctx, next) => {
    await next();

    ctx.response.type = 'text/plain; charset=utf-8';
    ctx.response.body = readStaticFile('robots.txt');
});

router.get('/live', async (ctx, next) => {
    await next();

    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Cache-Control', 'no-cache, no-store, must-revalidate');

    ctx.response.type = 'application/json; charset=utf-8';
    ctx.response.body = readTwitchStreamsListFileStream(staticPath);
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
            return getTwitchLiveStreams([], CONFIG.API_KEYS.twitch.client_id, token)
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

router.get('/send-form-status', async ctx => {
    ctx.response.body = getSendFormStatus(CONFIG.send_form_times);
});

app.use(router.routes()).use(router.allowedMethods());

app.use(async ctx => {
    ctx.response.type = 'text/html; charset=utf-8';
    ctx.response.body = readStaticFile('404.html');
});

app.listen(3000);
