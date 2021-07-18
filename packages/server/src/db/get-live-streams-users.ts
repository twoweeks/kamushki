import { createMongoClient } from './common.js';

import CONFIG from '../config.js';

const DB_NAME = CONFIG.server.db_name;
const COLLECTION_NAME = 'twitch-users';

export const getTwitchUsers = async (): Promise<string[]> => {
    const mongoClient = createMongoClient();

    return new Promise((resolve, reject) => {
        mongoClient.connect((err, client) => {
            if (err) reject(err);

            const db = client.db(DB_NAME);
            const collection = db.collection(COLLECTION_NAME);

            collection.find().toArray(function (err, results) {
                const UserLogins = results.map(UserLoginEntry => UserLoginEntry.userName);
                resolve(UserLogins);
                client.close();
            });
        });
    });
};
