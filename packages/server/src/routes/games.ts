import type { FastifyPluginAsync, FastifySchema } from 'fastify';

import CONFIG from '../config.js';

import type { ContestsQueryResponseType } from '../types.js';
import type { EntriesQueryParamsType, GameEntryType } from '../types.js';
import type { EditEntryInfoQueryParamsType } from '../types.js';
import type { DeleteEntriesQueryParamsType } from '../types.js';

import { getIsAuth } from '../utils/check-auth.js';
import { prepareString } from '../utils/prepare-string.js';

import { getContests, getEntries, editEntryInfo, deleteEntries } from '../db/games.js';

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

    const GetEntriesSchema: FastifySchema = {
        querystring: {
            type: 'object',
            properties: {
                contest: { type: 'number' },
            },
        },
    };

    app.get('/get-entries', { schema: GetEntriesSchema }, async (req, res) => {
        const { contest: QueryContestNumber } = req.query as EntriesQueryParamsType;

        let entries: GameEntryType[] = [];

        try {
            entries = await getEntries(QueryContestNumber ?? CONFIG.contest.number);
        } catch (err) {
            console.warn(err, '/', new Date().toISOString());
            res.status(500).send();
        }

        res.send(entries);
    });

    const EditEntrySchema: FastifySchema = {
        body: {
            type: 'object',
            required: ['_id', 'email', 'gameInfo'],
            properties: {
                _id: { type: 'string' },
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
            },
            additionalProperties: false,
        },
    };

    app.patch('/edit-entry-info', { schema: EditEntrySchema }, async (req, res) => {
        const RequestBody = req.body as EditEntryInfoQueryParamsType;

        const EntryID = RequestBody._id;

        const NewEntryInfo = { ...RequestBody } as Omit<EditEntryInfoQueryParamsType, '_id'> & { _id?: string };

        delete NewEntryInfo._id;

        Object.keys(NewEntryInfo.gameInfo).forEach(_key => {
            const key = _key as keyof EditEntryInfoQueryParamsType['gameInfo'];
            NewEntryInfo.gameInfo[key] = prepareString(NewEntryInfo.gameInfo[key]);
        });

        NewEntryInfo.email = prepareString(NewEntryInfo.email);
        NewEntryInfo.comment = prepareString(NewEntryInfo.comment);

        try {
            await editEntryInfo(EntryID, NewEntryInfo);
        } catch (err) {
            console.warn(err, '/', new Date().toISOString());
            res.status(500).send();
        }

        res.status(200).send(RequestBody);
    });

    const DeleteEntriesSchema: FastifySchema = {
        body: {
            type: 'array',
            contains: { type: 'string' },
            minItems: 1,
        },
    };

    app.delete('/delete-entries', { schema: DeleteEntriesSchema }, async (req, res) => {
        const EntriesID = req.body as DeleteEntriesQueryParamsType;

        try {
            await deleteEntries(EntriesID);
        } catch (err) {
            console.warn(err, '/', new Date().toISOString());
            res.status(500).send();
        }

        res.status(200).send(EntriesID);
    });
};

export default Routes;
