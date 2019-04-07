import 'reflect-metadata';
import { ILogger } from './ILogger';
import { inject, injectable } from 'inversify';
import { Types } from '../IoC/Types';

@injectable()
export class Logger implements ILogger
{
    public Log(str)
    {
        console.log(str);
    }
}

@injectable()
export class Calculator
{
    constructor(@inject(Types.ILogger) private logger: ILogger)
    { }

    public Sum(a: number, b: number): number
    {
        this.logger.Log("Sumowanie");

        return a + b;
    }
}