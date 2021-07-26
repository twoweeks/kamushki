import type { FastifyPluginAsync, FastifySchema } from 'fastify';

import CONFIG from '../config.js';

import type { SendFormQueryParamsType, SendFormResponseType } from '../types.js';

import getSendFormStatus from '../utils/get-send-form-status.js';
import getGameStage from '../utils/get-game-stage.js';
import verifyCaptcha from '../utils/verify-captcha.js';
import { prepareString } from '../utils/prepare-string';

import { addGame } from '../db/games.js';

const Routes: FastifyPluginAsync = async (app, options) => {
    app.get('/get-status', async (req, res) => {
        res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.send(getSendFormStatus(CONFIG.send_form_times));
    });

    const SendGameSchema: FastifySchema = {
        body: {
            type: 'object',
            required: ['gameInfo', 'captcha'],
            properties: {
                gameInfo: {
                    type: 'object',
                    required: ['title', 'email', 'archive', 'screenshot'],
                    properties: {
                        title: { type: 'string', minLength: 1, maxLength: 100 },
                        email: { type: 'string', minLength: 1, maxLength: 50 },
                        genre: { type: 'string', maxLength: 50 },
                        description: { type: 'string', maxLength: 200 },
                        tools: { type: 'string', maxLength: 100 },
                        archive: { type: 'string', minLength: 1, maxLength: 100 },
                        screenshot: { type: 'string', minLength: 1, maxLength: 100 },
                    },
                    additionalProperties: false,
                },
                captcha: { type: 'string', minLength: 1 },
            },
        },
    };

    app.put('/send-game', { schema: SendGameSchema }, async (req, res) => {
        const RequestBody = req.body as SendFormQueryParamsType;

        const GameStage = getGameStage(CONFIG.send_form_times);

        const ResponseBody: SendFormResponseType = {
            status: 'success',
        };

        if (!GameStage) {
            ResponseBody.status = 'form_closed';
            res.status(200).send(ResponseBody);
            return;
        }

        const IsCaptchaValid = await verifyCaptcha(CONFIG.API_KEYS.recaptcha, RequestBody.captcha);

        if (!IsCaptchaValid) {
            ResponseBody.status = 'wrong_captcha';
            res.status(200).send(ResponseBody);
            return;
        }

        Object.keys(RequestBody.gameInfo).forEach(_key => {
            const key = _key as keyof SendFormQueryParamsType['gameInfo'];
            RequestBody.gameInfo[key] = prepareString(RequestBody.gameInfo[key]);
        });

        await addGame({
            ...RequestBody.gameInfo,
            contest: CONFIG.contest.number,
            stage: GameStage ?? 'demo',
            date: new Date().toISOString(),
        });

        res.status(200).send(ResponseBody);
    });
};

export default Routes;
