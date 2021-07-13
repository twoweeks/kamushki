import type { FastifyPluginAsync } from 'fastify';

// import CONFIG from '../config.js';

import type { SendFormQueryParamsType } from '../types.js';

// import getSendFormStatus from '../utils/get-send-form-status.js';

const Routes: FastifyPluginAsync = async (app, options) => {
    app.get('/get-status', (req, res) => {
        res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
        // res.json(getSendFormStatus(CONFIG.send_form_times));
        res.send({ status: 'open', stage: 'demo' });
    });

    app.put('/send-game', (req, res) => {
        if (!req.body) {
            res.status(400).send();
            return;
        }

        const RequestBody = req.body as SendFormQueryParamsType;

        if (!RequestBody.title || !RequestBody.email || !RequestBody.archive || !RequestBody.screenshot) {
            res.status(406).send();
            return;
        }
    });
};

export default Routes;
