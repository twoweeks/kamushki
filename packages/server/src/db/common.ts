import mongodb from 'mongodb';
import type { MongoClient as MongoClientType } from 'mongodb';

const { MongoClient } = mongodb;

export const createMongoClient = (): MongoClientType => {
    return new MongoClient('mongodb://localhost:27017/', { useUnifiedTopology: true });
};
