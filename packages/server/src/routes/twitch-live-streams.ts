import type { FastifyPluginAsync } from 'fastify';

import { TWITCH_STREAMS_LIST_FILE } from '../live-streams/twitch-api.js';

const Routes: FastifyPluginAsync = async (app, options) => {
    app.get('/get-live-streams', (req, res) => {
        res.header('Cache-Control', 'no-cache, no-store, must-revalidate');

        res.sendFile(TWITCH_STREAMS_LIST_FILE);
    });
};

export default Routes;
