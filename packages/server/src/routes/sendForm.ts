import type { FastifyPluginAsync, FastifySchema } from 'fastify';

import CONFIG from '../config.js';

import type { SendEntryQueryParamsType, SendEntryQueryResponseType } from '../types.js';

import getSendFormStatus from '../utils/get-send-form-status.js';
import getGameStage from '../utils/get-game-stage.js';
import verifyCaptcha from '../utils/verify-captcha.js';
import { prepareString } from '../utils/prepare-string';

import { createEntry } from '../db/games.js';

const Routes: FastifyPluginAsync = async (app, options) => {
    app.get('/get-status', async (req, res) => {
        res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.send(getSendFormStatus(CONFIG.send_form_times));
    });

    const SendEntrySchema: FastifySchema = {
        body: {
            type: 'object',
            required: ['email', 'gameInfo', 'captcha'],
            properties: {
                email: { type: 'string', minLength: 1, maxLength: 50 },
                gameInfo: {
                    type: 'object',
                    required: ['title', 'archive', 'screenshot'],
                    properties: {
                        title: { type: 'string', minLength: 1, maxLength: 100 },
                        genre: { type: 'string', maxLength: 50 },
                        description: { type: 'string', maxLength: 200 },
                        tools: { type: 'string', maxLength: 100 },
                        archive: { type: 'string', minLength: 1, maxLength: 100 },
                        screenshot: { type: 'string', minLength: 1, maxLength: 100 },
                    },
                    additionalProperties: false,
                },
                comment: { type: 'string', maxLength: 200 },
                captcha: { type: 'string', minLength: 1 },
            },
            additionalProperties: false,
        },
    };

    app.put('/send-entry', { schema: SendEntrySchema }, async (req, res) => {
        const RequestBody = req.body as SendEntryQueryParamsType;

        const GameStage = getGameStage(CONFIG.send_form_times);

        const ResponseBody: SendEntryQueryResponseType = {
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
            const key = _key as keyof SendEntryQueryParamsType['gameInfo'];
            RequestBody.gameInfo[key] = prepareString(RequestBody.gameInfo[key]);
        });

        RequestBody.email = prepareString(RequestBody.email);
        RequestBody.comment = prepareString(RequestBody.comment);

        await createEntry({
            contest: CONFIG.contest.number,
            stage: GameStage ?? 'demo',
            email: RequestBody.email,
            gameInfo: { ...RequestBody.gameInfo },
            comment: RequestBody.comment,
            date: new Date().toISOString(),
        });

        res.status(200).send(ResponseBody);
    });
};

export default Routes;
