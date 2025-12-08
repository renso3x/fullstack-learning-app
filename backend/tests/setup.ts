import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongo: MongoMemoryServer;

jest.setTimeout(30000);

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();

  await mongoose.connect(uri, {
    dbName: 'testdb',
  });
});

beforeEach(async () => {
  if (!mongoose.connection.db) {
    throw new Error('Database connection not established');
  }
  const collections = await mongoose.connection.db.listCollections().toArray();
  for (let collection of collections) {
    await mongoose.connection.db.collection(collection.name).deleteMany({});
  }
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongo.stop();
});
