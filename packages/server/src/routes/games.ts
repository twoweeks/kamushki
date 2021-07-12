import { App as SubApp } from '@tinyhttp/app';

import CONFIG from '../config.js';

import type { GameItemType } from '../types.js';

import { getIsAuth } from '../utils/check-auth.js';

import { getGames } from '../db/games.js';

const subApp = new SubApp();

subApp.get('/get-games', async (req, res) => {
    if (!getIsAuth(req.headers.cookie)) {
        res.status(401).end();
        return;
    }

    let games: GameItemType[] = [];

    try {
        games = await getGames(CONFIG.contest.number);
    } catch (err) {
        console.warn(err, '/', new Date().toISOString());
        res.status(500).end();
    }

    res.json(games);
});

subApp.put('/send-game', (req, res) => {
    if (!req.body) {
        res.status(400).end();
        return;
    }

    const RequestBody: Partial<Omit<GameItemType, '_id'> & { captcha: string }> = req.body;

    if (!RequestBody.title || !RequestBody.email || !RequestBody.archive || !RequestBody.screenshot) {
        res.status(406).end();
        return;
    }

    res.status(200).end();
});

subApp.patch('/edit-game-info', (req, res) => {
    if (!getIsAuth(req.headers.cookie)) {
        res.status(401).end();
        return;
    }

    res.status(200).end();
});

subApp.delete('/delete-games', (req, res) => {
    if (!getIsAuth(req.headers.cookie)) {
        res.status(401).end();
        return;
    }

    res.status(200).end();
});

export default subApp;
