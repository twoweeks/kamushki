import type { GameItemType } from '../types';

import { createMongoClient, ObjectId } from './common.js';

const DB_NAME = 'twg';
const COLLECTION_NAME = 'games';

export const getContests = async (): Promise<number[]> => {
    const mongoClient = createMongoClient();

    return new Promise((resolve, reject) => {
        mongoClient.connect((err, client) => {
            if (err) reject(err);

            const db = client.db(DB_NAME);
            const collection = db.collection(COLLECTION_NAME);

            return collection.distinct('contest').then(results => {
                resolve(results);
                client.close();
            });
        });
    });
};

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

export const addGame = async (gameInfo: Omit<GameItemType, '_id'>): Promise<void> => {
    const mongoClient = createMongoClient();

    return new Promise((resolve, reject) => {
        mongoClient.connect((err, client) => {
            if (err) reject(err);

            const db = client.db(DB_NAME);
            const collection = db.collection(COLLECTION_NAME);

            collection.insertOne(gameInfo).then(value => {
                console.log(`New game "${gameInfo.title}" with ID ${value.insertedId} added /`, new Date().toISOString());
                resolve();
            });
        });
    });
};

export const deleteGames = async (ids: string[]): Promise<void> => {
    const mongoClient = createMongoClient();

    return new Promise((resolve, reject) => {
        mongoClient.connect((err, client) => {
            if (err) reject(err);

            const db = client.db(DB_NAME);
            const collection = db.collection(COLLECTION_NAME);

            const TransformedIDs = ids.map(id => new ObjectId(id));

            collection.deleteMany({ _id: { $in: TransformedIDs } }).then(_value => {
                resolve();
            });
        });
    });
};
