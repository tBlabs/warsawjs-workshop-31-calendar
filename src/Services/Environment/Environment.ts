import { IEnvironment } from './IEnvironment';
import { injectable } from 'inversify';
import 'reflect-metadata';

@injectable()
export class Environment implements IEnvironment
{
    public Exists(key: string): boolean
    {
        return (process.env[key] !== undefined);
    }

    public IsSet(key: string): boolean
    {
        if (!this.Exists(key))
        {
            return false;
        }

        if (process.env[key] !== '')
        {
            return true;
        }

        return false;
    }

    public ValueOf(key: string): string
    {
        if (!this.Exists(key))
        {
            throw new Error('Environment variable "' + key + '" not exists');
        }

        return process.env[key];
    }

    public ValueOrDefault(key: string, defaultValue: string): string
    {
        try
        {
            return this.ValueOf(key);
        }
        catch (ex)
        {
            return defaultValue;
        }
    }
}
