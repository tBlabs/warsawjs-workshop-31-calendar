import { ILogger } from './ILogger';
import { injectable } from 'inversify';

@injectable()
export class Logger implements ILogger
{
    public Log(str: string): void
    {
        console.log(str);
    }

    private ObjectToString(obj: any): string
    {
        if (obj === undefined)
        {
            return 'undefined';
        }
        else
            if (obj === null)
            {
                return 'null';
            }
            else
                if (obj instanceof Object)
                {
                    return JSON.stringify(obj);
                }
                else
                {
                    return obj;
                }
    }
}
