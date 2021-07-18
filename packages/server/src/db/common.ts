import mongodb from 'mongodb';
import type { MongoClient as MongoClientType } from 'mongodb';

import CONFIG from '../config.js';

const { MongoClient, ObjectId } = mongodb;

export const createMongoClient = (): MongoClientType => {
    return new MongoClient(CONFIG.server.db_connection_string, { useUnifiedTopology: true });
};

export { ObjectId };
