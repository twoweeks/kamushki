import type { FastifyPluginAsync, FastifySchema } from 'fastify';

import CONFIG from '../config.js';

import { getIsAuth } from '../utils/check-auth.js';

const Routes: FastifyPluginAsync = async (app, options) => {
    const LoginScheme: FastifySchema = {
        body: {
            type: 'object',
            required: ['auth_key'],
            properties: {
                auth_key: { type: 'string' },
            },
        },
    };

    app.post('/login', { schema: LoginScheme }, async (req, res) => {
        const requestBody = req.body as { auth_key?: typeof CONFIG.auth_key };

        if (requestBody && requestBody.auth_key === CONFIG.auth_key) {
            res.cookie('auth_key', CONFIG.auth_key, {
                expires: new Date(Date.now() + 604800000), // 1 week
                httpOnly: true,
                sameSite: true,
            });
            res.status(200).send();
        } else {
            res.status(401).send();
        }
        res.status(200).send();
    });

    app.head('/check', async (req, res) => {
        const ResStatus = getIsAuth(req.cookies) ? 200 : 401;
        res.status(ResStatus).send();
    });
};

export default Routes;
