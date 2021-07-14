import type { FastifyPluginAsync, FastifySchema } from 'fastify';

import CONFIG from '../config.js';

import type { GameItemType } from '../types.js';

import { getIsAuth } from '../utils/check-auth.js';

import { getGames } from '../db/games.js';

const Routes: FastifyPluginAsync = async (app, options) => {
    const GetGamesSchema: FastifySchema = {
        querystring: {
            type: 'object',
            properties: {
                contest: { type: 'number' },
            },
        },
    };

    app.get('/get-games', { schema: GetGamesSchema }, async (req, res) => {
        if (!getIsAuth(req.cookies)) {
            res.status(401).send();
            return;
        }

        const { contest: QueryContestNumber } = req.query as { contest?: number };

        let games: GameItemType[] = [];

        try {
            games = await getGames(QueryContestNumber ?? CONFIG.contest.number);
        } catch (err) {
            console.warn(err, '/', new Date().toISOString());
            res.status(500).send();
        }

        res.send(games);
    });

    app.patch('/edit-game-info', (req, res) => {
        if (!getIsAuth(req.cookies)) {
            res.status(401).send();
            return;
        }

        res.status(200).send();
    });

    app.delete('/delete-games', (req, res) => {
        if (!getIsAuth(req.cookies)) {
            res.status(401).send();
            return;
        }

        res.status(200).send();
    });
};

export default Routes;
