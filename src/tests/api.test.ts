import 'reflect-metadata';
import axios from 'axios';
import { DayEvent } from '../Main';
import { MongoClient } from 'mongodb';

test('API should respond for ping', async () => 
{
    const response = await axios.get('http://localhost:5000/ping');

    expect(response.status).toBe(200);
    expect(response.data).toBe("pong");
});

describe('api/calendar', ()=>
{
    beforeEach(async ()=>
    {
        const mongoClient = new MongoClient('mongodb://localhost:27017');
        await mongoClient.connect();
        const db = await mongoClient.db('calendar');
        await db.createCollection('events');
        await db.collection('events').drop();
        const events = [
            new DayEvent("1", "2019-04-07", "event #1"),
            new DayEvent("2", "2019-04-07", "event #2"),
            new DayEvent("3", "2019-05-11", "event #3"),
        ];
        await db.collection('events').insertMany(events);
    });

    it('should return some data for given date', async () => 
    {
        const response = await axios.get('http://localhost:5000/api/calendar?date=2019-04-07');
    
        expect(response.data.length).toEqual(2);
    });    
})


async function GetEventByDate(date: string)
{
    const response = await axios.get('http://localhost:5000/api/calendar?date='+date);
    return response.data[0];
}

test('POST /api/calendar should add event', async () => 
{
    const response = await axios.post('http://localhost:5000/api/calendar', 
        new DayEvent("4", "2019-08-08", "urodziny psa"),
        { headers: { "Content-Type": "application/json" }});
    expect(response.status).toBe(200);

    const event = await GetEventByDate("2019-08-08");

    expect(event.id).toBe("4");
    expect(event.title).toBe("urodziny psa");
});