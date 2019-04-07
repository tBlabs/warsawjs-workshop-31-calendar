import 'reflect-metadata';
import { EventsRepo2, DayEvent } from "../Main";

test('repo', async () =>
{
    const repo = new EventsRepo2();
    await repo.Init();
    await repo.Clean();
    await repo.Add(new DayEvent("1", "2019-01-07", "title"));
    const events = await repo.EventsByDate("2019-01-07");
    expect(events.length).toBe(1);
});