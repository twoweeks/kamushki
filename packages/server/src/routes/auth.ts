import type { FastifyPluginAsync, FastifySchema } from 'fastify';

import CONFIG from '../config.js';

import { getIsAuth } from '../utils/check-auth.js';

const Routes: FastifyPluginAsync = async (app, options) => {
    const LoginSchema: FastifySchema = {
        body: {
            type: 'object',
            required: ['auth_key'],
            properties: {
                auth_key: { type: 'string' },
            },
        },
    };

    app.post('/login', { schema: LoginSchema }, async (req, res) => {
        const RequestBody = req.body as { auth_key?: typeof CONFIG.auth_key };

        if (RequestBody && RequestBody.auth_key === CONFIG.auth_key) {
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
