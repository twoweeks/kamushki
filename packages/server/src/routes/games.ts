import type { FastifyPluginAsync, FastifySchema } from 'fastify';

import CONFIG from '../config.js';

import type { ContestsQueryResponseType } from '../types.js';
import type { GamesQueryParamsType, GameItemType } from '../types.js';
import type { DeleteGamesQueryParamsType } from '../types.js';

import { getIsAuth } from '../utils/check-auth.js';

import { getContests, getGames, deleteGames } from '../db/games.js';

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

    app.patch('/edit-game-info', async (req, res) => {
        res.status(200).send();
    });

    const DeleteGamesSchema: FastifySchema = {
        querystring: {
            type: 'object',
            properties: {
                games: {
                    type: 'array',
                    contains: { type: 'string' },
                    minItems: 1,
                },
            },
        },
    };

    app.delete('/delete-games', { schema: DeleteGamesSchema }, async (req, res) => {
        const { games: QueryGamesIDs } = req.body as DeleteGamesQueryParamsType;

        try {
            await deleteGames(QueryGamesIDs);
        } catch (err) {
            console.warn(err, '/', new Date().toISOString());
            res.status(500).send();
        }

        res.status(200).send();
    });
};

export default Routes;
