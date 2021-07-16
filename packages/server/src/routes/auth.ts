import type { FastifyPluginAsync, FastifySchema } from 'fastify';

import CONFIG from '../config.js';

import type { LoginQueryParamsType } from '../types';

import { getIsAuth } from '../utils/check-auth.js';
import verifyCaptcha from '../utils/verify-captcha.js';

const Routes: FastifyPluginAsync = async (app, options) => {
    const LoginSchema: FastifySchema = {
        body: {
            type: 'object',
            required: ['auth_key', 'captcha'],
            properties: {
                auth_key: { type: 'string' },
                captcha: { type: 'string' },
            },
            additionalProperties: false,
        },
    };

    app.post('/login', { schema: LoginSchema }, async (req, res) => {
        const RequestBody = req.body as LoginQueryParamsType;

        const IsCaptchaValid = await verifyCaptcha(CONFIG.API_KEYS.recaptcha, RequestBody.captcha);

        if (!IsCaptchaValid) {
            res.status(401).send();
            return;
        }

        if (RequestBody.auth_key === CONFIG.auth_key) {
            res.cookie('auth_key', CONFIG.auth_key, {
                expires: new Date(Date.now() + 604800000), // 1 week
                httpOnly: true,
                path: '/',
                sameSite: true,
            });
            res.status(200).send();
        } else {
            res.status(401).send();
        }
    });

    app.head('/check', async (req, res) => {
        const ResStatus = getIsAuth(req.cookies) ? 200 : 401;
        res.status(ResStatus).send();
    });
};

export default Routes;
