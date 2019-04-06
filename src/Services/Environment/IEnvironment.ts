export interface IEnvironment
{
    Exists(key: string): boolean;
    IsSet(key: string): boolean;
    ValueOf(key: string): string;
    ValueOrDefault(key: string, defaultValue: string): string;
}
