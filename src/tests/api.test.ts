import axios from 'axios';
import { DayEvent } from '../Main';

test('API should respond for ping', async () => {
    const response = await axios.get('http://localhost:5000/ping');

    expect(response.status).toBe(200);
    expect(response.data).toBe("pong");
});

test('/api/calendar should return some data for given date', async () => 
{
    const response = await axios.get('http://localhost:5000/api/calendar?date=2019-04-07');

    expect(response.data.length).toEqual(2);
});

async function GetEventByDate(date: string)
{
    // TODO: call db
    const response = await axios.get('http://localhost:5000/api/calendar?date='+date);

    return response.data;
}

test('POST /api/calendar should add event', async () => 
{
    await axios.post('http://localhost/api/calendar', new DayEvent("4", "2019-08-08", "urodziny psa"));

    const event = await GetEventByDate("2019-08-08");

    expect(event.id).toBe("4");
    expect(event.title).toBe("urodziny psa");
});