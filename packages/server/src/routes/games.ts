import type { FastifyPluginAsync, FastifySchema } from 'fastify';

import CONFIG from '../config.js';

import type { ContestsQueryResponseType } from '../types.js';
import type { GamesQueryParamsType, GameItemType } from '../types.js';
import type { EditGameInfoQueryParamsType } from '../types.js';
import type { DeleteGamesQueryParamsType } from '../types.js';

import { getIsAuth } from '../utils/check-auth.js';

import { getContests, getGames, editGameInfo, deleteGames } from '../db/games.js';

const Routes: FastifyPluginAsync = async (app, options) => {
    app.addHook('onRequest', (req, res, next) => {
        if (!getIsAuth(req.cookies)) {
            res.status(401).send();
            return;
        }

        next();
    });

    app.get('/get-contests', async (req, res) => {
        let contests: ContestsQueryResponseType = [];

        try {
            contests = await getContests();
        } catch (err) {
            console.warn(err, '/', new Date().toISOString());
            res.status(500).send();
        }

        res.send(contests);
    });

    const GetGamesSchema: FastifySchema = {
        querystring: {
            type: 'object',
            properties: {
                contest: { type: 'number' },
            },
        },
    };

    app.get('/get-games', { schema: GetGamesSchema }, async (req, res) => {
        const { contest: QueryContestNumber } = req.query as GamesQueryParamsType;

        let games: GameItemType[] = [];

        try {
            games = await getGames(QueryContestNumber ?? CONFIG.contest.number);
        } catch (err) {
            console.warn(err, '/', new Date().toISOString());
            res.status(500).send();
        }

        res.send(games);
    });

    const EditGameSchema: FastifySchema = {
        body: {
            type: 'object',
            required: ['_id', 'title', 'email', 'date', 'archive', 'screenshot'],
            properties: {
                _id: { type: 'string' },
                title: { type: 'string', minLength: 1, maxLength: 100 },
                email: { type: 'string', minLength: 1, maxLength: 50 },
                date: { type: 'string' },
                genre: { type: 'string', maxLength: 50 },
                description: { type: 'string', maxLength: 200 },
                tools: { type: 'string', maxLength: 100 },
                archive: { type: 'string', minLength: 1, maxLength: 100 },
                screenshot: { type: 'string', minLength: 1, maxLength: 100 },
            },
            additionalProperties: false,
        },
    };

    app.patch('/edit-game-info', { schema: EditGameSchema }, async (req, res) => {
        const RequestBody = req.body as EditGameInfoQueryParamsType;

        const NewGameInfo = { ...RequestBody } as Omit<EditGameInfoQueryParamsType, '_id'> & { _id?: string };

        delete NewGameInfo._id;

        try {
            await editGameInfo(RequestBody._id, NewGameInfo);
        } catch (err) {
            console.warn(err, '/', new Date().toISOString());
            res.status(500).send();
        }

        res.status(200).send(RequestBody);
    });

    const DeleteGamesSchema: FastifySchema = {
        body: {
            type: 'array',
            contains: { type: 'string' },
            minItems: 1,
        },
    };

    app.delete('/delete-games', { schema: DeleteGamesSchema }, async (req, res) => {
        const GamesIDs = req.body as DeleteGamesQueryParamsType;

        try {
            await deleteGames(GamesIDs);
        } catch (err) {
            console.warn(err, '/', new Date().toISOString());
            res.status(500).send();
        }

        res.status(200).send(GamesIDs);
    });
};

export default Routes;
