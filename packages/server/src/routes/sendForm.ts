import type { FastifyPluginAsync, FastifySchema } from 'fastify';

import CONFIG from '../config.js';

import type { SendFormQueryParamsType } from '../types.js';

import getGameStage from '../utils/get-game-stage.js';
import verifyCaptcha from '../utils/verify-captcha.js';

import { addGame } from '../db/games.js';

// import getSendFormStatus from '../utils/get-send-form-status.js';

const Routes: FastifyPluginAsync = async (app, options) => {
    app.get('/get-status', async (req, res) => {
        res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
        // res.json(getSendFormStatus(CONFIG.send_form_times));
        res.send({ status: 'open', stage: 'demo' });
    });

    const SendGameSchema: FastifySchema = {
        body: {
            type: 'object',
            required: ['title', 'email', 'archive', 'screenshot', 'captcha'],
            properties: {
                title: { type: 'string', minLength: 1, maxLength: 100 },
                email: { type: 'string', minLength: 1, maxLength: 50 },
                genre: { type: 'string', maxLength: 50 },
                description: { type: 'string', maxLength: 200 },
                tools: { type: 'string', maxLength: 100 },
                archive: { type: 'string', minLength: 1, maxLength: 100 },
                screenshot: { type: 'string', minLength: 1, maxLength: 100 },
                captcha: { type: 'string', minLength: 1 },
            },
            additionalProperties: false,
        },
    };

    app.put('/send-game', { schema: SendGameSchema }, async (req, res) => {
        const RequestBody = req.body as SendFormQueryParamsType;

        const IsCaptchaValid = await verifyCaptcha(CONFIG.API_KEYS.recaptcha, RequestBody.captcha);

        if (!IsCaptchaValid) {
            res.status(401).send();
        }

        if (RequestBody) {
            // we need to delete the "captcha" field,
            // and for this we need to make it optional
            const GameData: Omit<SendFormQueryParamsType, 'captcha'> & { captcha?: string } = RequestBody;

            delete GameData.captcha;

            await addGame({
                ...GameData,
                contest: CONFIG.contest.number,
                stage: getGameStage(CONFIG.send_form_times) ?? 'demo',
                date: new Date().toISOString(),
            });

            res.status(200).send();
        }
    });
};

export default Routes;
