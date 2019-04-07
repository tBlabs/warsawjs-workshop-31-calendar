import { injectable, inject } from 'inversify';
import { Types } from './IoC/Types';
import * as express from 'express';
import * as http from 'http';
import * as socketIo from 'socket.io';
import * as path from 'path';
import { IStartupArgs } from './Services/Environment/IStartupArgs';
import { Repeater } from './Services/Repeater/Repeater';
import { Calculator, Logger } from './Services/Calclulator';

export class DayEvent
{
    constructor(
        public id: string,
        public date: string,
        public title: string)
    { }
}

@injectable()
export class Main
{
    public async Start()
    {
        const server = express();
        const httpServer = http.createServer(server);

        server.use((req, res, next) =>
        {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });

        server.get('/ping', (request, response)=>
        {
            response.send('pong');
        });

        const db = [
            new DayEvent("1", "2019-04-07", "event #1"),
            new DayEvent("2", "2019-04-07", "event #2"),
            new DayEvent("3", "2019-05-11", "event #3"),
        ];
        
        server.get('/api/calendar', (req, res) =>
        {
            const dateFilter = req.query.date;

            const eventsDto = db.filter(x => x.date == dateFilter);

            res.send(eventsDto);
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
