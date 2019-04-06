export interface IEnvironment
{
    Exists(key: string): boolean;
    IsSet(key: string): boolean;
    ValueOf(key: string): string | undefined;
    ValueOrDefault(key: string, defaultValue: string): string | undefined;
}
