import { injectable, inject } from 'inversify';
import { Types } from './IoC/Types';
import * as express from 'express';
import * as http from 'http';
import * as socketIo from 'socket.io';
import * as path from 'path';
import { IStartupArgs } from './Services/Environment/IStartupArgs';
import { Repeater } from './Services/Repeater/Repeater';
import { Calculator, Logger } from './Services/Calclulator';
import * as bodyParser from 'body-parser';
import { Db, MongoClient } from 'mongodb';

export class DayEvent
{
    constructor(
        public id: string,
        public date: string,
        public title: string)
    { }
}

@injectable()
export class EventsRepo
{
    private db = [
        new DayEvent("1", "2019-04-07", "event #1"),
        new DayEvent("2", "2019-04-07", "event #2"),
        new DayEvent("3", "2019-05-11", "event #3"),
    ];

    public async EventsByDate(dateFilter: string): Promise<DayEvent[]>
    {
        return this.db.filter(x => x.date == dateFilter);
    }

    public async Add(event: DayEvent): Promise<void>
    {
        this.db.push(event);
    }
}

@injectable()
export class EventsRepo2
{
    
    private db;

    public async Init()
    {
        const mongoClient = new MongoClient('mongodb://localhost:27017');
        await mongoClient.connect();
        this.db = await mongoClient.db('calendar');
        await this.db.createCollection('events');
    }

    public async Clean() 
    {
        await this.db.collection('events').drop();
    }
    
    public async EventsByDate(dateFilter: string): Promise<DayEvent[]>
    {
        const cursor = await this.db.collection('events').find({ date: dateFilter });
        return await cursor.toArray();
    }

    public async Add(event: DayEvent): Promise<void>
    {
        await this.db.collection('events').insertOne(event);
    }
}

@injectable()
export class Main
{
    constructor(private _eventRepo: EventsRepo2)
    { }

    public async Start()
    {
        await this._eventRepo.Init();

        const server = express();
        const httpServer = http.createServer(server);

        server.use(bodyParser.json());

        server.use((req, res, next) =>
        {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "GET,POST");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });

        server.get('/ping', (request, response)=>
        {
            response.send('pong');
        });

        server.get('/api/calendar', async (req, res) =>
        {
            const dateFilter = req.query.date;

            const eventsDto = await this._eventRepo.EventsByDate(dateFilter);

            res.send(eventsDto);
        });

        server.post('/api/calendar', async (req, res) =>
        {
            const event = req.body;

            await this._eventRepo.Add(event);

            res.sendStatus(200);
        });


        httpServer.listen(5000, ()=>console.log('SERVER STARTED'));
    }
/*
    private get ClientDir(): string
    {
        const s = __dirname.split(path.sep); // __dirname returns '/home/tb/projects/EventsManager/bin'. We don't wanna 'bin'...
        return s.slice(0, s.length - 1).join(path.sep) + '/client';
    }

    public async Start(): Promise<void>
    {
        const server = express();
        const httpServer = http.createServer(server);
     server.use(function(req, res, next) {
     res.header("Access-Control-Allow-Origin", "*");
     res.header(
       "Access-Control-Allow-Headers",
       "Origin, X-Requested-With, Content-Type, Accept"
     );
     next();
   });
        server.get('/favicon.ico', (req, res) => res.status(204));
        server.get('/ping', (req, res) => res.send('pong'));

        server.use(express.static(this.ClientDir));

        const port = 5000;
        httpServer.listen(port, () => console.log('SERVER STARTED @ ' + port));

        process.on('SIGINT', () =>
        {
            httpServer.close(() => console.log('SERVER CLOSED'));
        });
    }
    */
}
