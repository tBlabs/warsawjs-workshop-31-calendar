import { injectable } from 'inversify';
import 'reflect-metadata';
import { IStartupArgs } from './IStartupArgs';
import * as minimist from 'minimist';

@injectable()
export class StartupArgs implements IStartupArgs
{
    public get RawArgs(): string[]
    {
        return process.argv.slice(2);
    }

    public get Args(): minimist.ParsedArgs
    {
        return minimist(this.RawArgs);
    }
}
