import { App as SubApp } from '@tinyhttp/app';

import CONFIG from '../config.js';

import type { GameItemType } from '../types.js';

import getSendFormStatus from '../utils/get-send-form-status.js';

const subApp = new SubApp();

subApp.put('/send-game', (req, res) => {
    if (!req.body) {
        res.status(400).end();
        return;
    }

    const RequestBody: Partial<Omit<GameItemType, '_id'> & { captcha: string }> = req.body;

    if (!RequestBody.title || !RequestBody.email || !RequestBody.archive || !RequestBody.screenshot) {
        res.status(406).end();
        return;
    }

    res.status(200).end();
});

subApp.get('/get-status', (req, res) => {
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate');

    res.json(getSendFormStatus(CONFIG.send_form_times));
});

export default subApp;
