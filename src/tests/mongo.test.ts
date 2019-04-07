import { MongoClient } from "mongodb";

test('mongo connection test', async () =>
{
    const mongoClient = new MongoClient('mongodb://localhost:27017');
    await mongoClient.connect();
    const db = await mongoClient.db('calendar');
    await db.collection('test').drop();
    await db.collection('test').insertOne({ foo: 2 });
    const c = await db.collection('test').find().count();
    expect(c).toBe(1);
});