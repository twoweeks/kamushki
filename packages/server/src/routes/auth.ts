import { App as SubApp } from '@tinyhttp/app';

import CONFIG from '../config.js';

import { getIsAuth } from '../utils/check-auth.js';

const subApp = new SubApp();

subApp.post('/login', (req, res) => {
    if (!req.body || !req.body.auth_key) {
        res.status(400).end();
        return;
    }

    if (req.body.auth_key === CONFIG.auth_key) {
        res.cookie('auth_key', CONFIG.auth_key, {
            expires: new Date(Date.now() + 604800000), // 1 week
            httpOnly: true,
            sameSite: true,
        });
        res.status(200).end();
    } else {
        res.status(401).end();
    }
});

subApp.head('/check', (req, res) => {
    const ResStatus = getIsAuth(req.headers.cookie) ? 200 : 401;
    res.status(ResStatus).end();
});

export default subApp;
