import mongodb from 'mongodb';
import type { MongoClient as MongoClientType } from 'mongodb';

const { MongoClient, ObjectId } = mongodb;

export const createMongoClient = (): MongoClientType => {
    return new MongoClient('mongodb://localhost:27017/', { useUnifiedTopology: true });
};

export { ObjectId };
