import Koa from 'koa';
import KoaRouter from '@koa/router';

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createReadStream } from 'fs';

import CONFIG from './config.js';

// import { getTwitchLiveStreams } from './live-streams.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = new Koa();
const router = new KoaRouter();

const staticPath = join(__dirname, 'static');

router.get('/robots.txt', async (ctx, next) => {
    await next();

    ctx.response.type = 'text/plain; charset=utf-8';
    ctx.response.body = createReadStream(join(staticPath, 'robots.txt'), 'utf-8');
});

app.use(router.routes()).use(router.allowedMethods());

console.log(CONFIG);

// getTwitchLiveStreams([70723894, 35743359], CONFIG.API_KEYS.twitch);

app.use(async ctx => {
    ctx.response.type = 'text/html; charset=utf-8';
    ctx.response.body = createReadStream(join(staticPath, '404.html'), 'utf-8');
});

app.listen(3000);
