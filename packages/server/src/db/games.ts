import type { GameItemType } from '../types';

import { createMongoClient } from './common.js';

const DB_NAME = 'twg';
const COLLECTION_NAME = 'games';

export const getGames = async (contestNumber: number): Promise<GameItemType[]> => {
    const mongoClient = createMongoClient();

    return new Promise((resolve, reject) => {
        mongoClient.connect((err, client) => {
            if (err) reject(err);

            const db = client.db(DB_NAME);
            const collection = db.collection(COLLECTION_NAME);

            collection.find({ contest: contestNumber }).toArray(function (err, results) {
                resolve(results);
                client.close();
            });
        });
    });
};
