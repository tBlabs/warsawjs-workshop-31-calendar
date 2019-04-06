import * as minimist from 'minimist';

export interface IStartupArgs
{
    RawArgs: string[];
    Args: minimist.ParsedArgs;    
}