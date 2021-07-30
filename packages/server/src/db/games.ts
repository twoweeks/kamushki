import type { GameEntryType } from '../types';
import type { EditEntryInfoQueryParamsType } from '../types';

import CONFIG from '../config.js';

import { createMongoClient, ObjectId } from './common.js';

const DB_NAME = CONFIG.server.db_name;
const COLLECTION_NAME = 'twg_entries';

export const getContests = async (): Promise<number[]> => {
    const mongoClient = createMongoClient();

    return new Promise((resolve, reject) => {
        mongoClient.connect((err, client) => {
            if (err || !client) {
                reject(err);
                return;
            }

            const db = client.db(DB_NAME);
            const collection = db.collection(COLLECTION_NAME);

            return collection.distinct('contest').then(results => {
                resolve(results);
                client.close();
            });
        });
    });
};

export const getEntries = async (contestNumber: number): Promise<GameEntryType[]> => {
    const mongoClient = createMongoClient();

    return new Promise((resolve, reject) => {
        mongoClient.connect((err, client) => {
            if (err || !client) {
                reject(err);
                return;
            }

            const db = client.db(DB_NAME);
            const collection = db.collection(COLLECTION_NAME);

            collection.find({ contest: contestNumber }).toArray(function (err, _results) {
                const results = (_results ?? []) as GameEntryType[];
                client.close();
                resolve(results);
            });
        });
    });
};

export const createEntry = async (entryInfo: Omit<GameEntryType, '_id'>): Promise<void> => {
    const mongoClient = createMongoClient();

    return new Promise((resolve, reject) => {
        mongoClient.connect((err, client) => {
            if (err || !client) {
                reject(err);
                return;
            }

            const db = client.db(DB_NAME);
            const collection = db.collection(COLLECTION_NAME);

            collection.insertOne(entryInfo).then(value => {
                console.log(`New entry "${entryInfo.gameInfo.title}" with ID ${value.insertedId} added /`, new Date().toISOString());
                resolve();
            });
        });
    });
};

export const editEntryInfo = async (entryID: string, newEntryInfo: Omit<EditEntryInfoQueryParamsType, '_id'>): Promise<void> => {
    const mongoClient = createMongoClient();

    return new Promise((resolve, reject) => {
        mongoClient.connect((err, client) => {
            if (err || !client) {
                reject(err);
                return;
            }

            const db = client.db(DB_NAME);
            const collection = db.collection(COLLECTION_NAME);

            collection.updateOne({ _id: new ObjectId(entryID) }, { $set: newEntryInfo }).then(_value => {
                console.log(`Entry "${newEntryInfo.gameInfo.title}" with ID "${entryID}" successfully updated /`, new Date().toISOString());
                resolve();
            });
        });
    });
};

export const deleteEntries = async (ids: string[]): Promise<void> => {
    const mongoClient = createMongoClient();

    return new Promise((resolve, reject) => {
        mongoClient.connect((err, client) => {
            if (err || !client) {
                reject(err);
                return;
            }

            const db = client.db(DB_NAME);
            const collection = db.collection(COLLECTION_NAME);

            const TransformedIDs = ids.map(id => new ObjectId(id));

            collection.deleteMany({ _id: { $in: TransformedIDs } }).then(_value => {
                console.log(`Games with ID "${ids.join('; ')}" successfully deleted /`, new Date().toISOString());
                resolve();
            });
        });
    });
};
