export class Repeater
{
    public static EverySecond(callback)
    {
        let i = 0;
        setInterval(() =>
        {
            callback(i);
            i++;
        }, 1000);
    }
}