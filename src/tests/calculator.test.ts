import { Calculator } from "../Services/Calclulator";
import { Logger } from "../Services/Logger/Logger";
import { ILogger } from "../Services/ILogger";

class LoggerMock implements ILogger
{
    Log(str: string): void
    {
      
    }
}

test('calc', () =>
{
    const logger: LoggerMock = new LoggerMock();
    const calc = new Calculator(logger);

    const sum = calc.Sum(2, 2);

    expect(sum).toBe(4);
})