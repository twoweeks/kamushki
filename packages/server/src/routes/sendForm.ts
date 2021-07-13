import { App as SubApp } from '@tinyhttp/app';

import CONFIG from '../config.js';

import type { SendFormQueryParamsType } from '../types.js';

import getSendFormStatus from '../utils/get-send-form-status.js';

const subApp = new SubApp();

subApp.get('/get-status', (req, res) => {
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.json(getSendFormStatus(CONFIG.send_form_times));
});

subApp.put('/send-game', (req, res) => {
    if (!req.body) {
        res.status(400).end();
        return;
    }

    const RequestBody: SendFormQueryParamsType = req.body;

    if (!RequestBody.title || !RequestBody.email || !RequestBody.archive || !RequestBody.screenshot) {
        res.status(406).end();
        return;
    }

    res.status(200).end();
});

export default subApp;
