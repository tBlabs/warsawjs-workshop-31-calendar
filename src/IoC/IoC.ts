// These two imports must go first!
import 'reflect-metadata';
import { Types } from './Types';
import { Container } from 'inversify';
import { IEnvironment } from '../Services/Environment/IEnvironment';
import { Environment } from '../Services/Environment/Environment';
import { IRunMode } from '../Services/RunMode/IRunMode';
import { RunMode } from '../Services/RunMode/RunMode';
import { ILogger } from '../Services/Logger/ILogger';
import { Logger } from '../Services/Logger/Logger';
import { Main, EventsRepo, EventsRepo2 } from '../Main';
import { IStartupArgs } from '../Services/Environment/IStartupArgs';
import { StartupArgs } from '../Services/Environment/StartupArgs';
import { Calculator } from '../Services/Calclulator';

const IoC = new Container();

try
{
    IoC.bind<IEnvironment>(Types.IEnvironment).to(Environment).inSingletonScope().whenTargetIsDefault();
    IoC.bind<IRunMode>(Types.IRunMode).to(RunMode).inSingletonScope().whenTargetIsDefault();
    IoC.bind<IStartupArgs>(Types.IStartupArgs).to(StartupArgs).inSingletonScope().whenTargetIsDefault();
    IoC.bind<Main>(Main).toSelf().inSingletonScope().whenTargetIsDefault();
    IoC.bind(Types.ILogger).to(Logger).inSingletonScope();
    IoC.bind(Calculator).toSelf().inTransientScope();
    IoC.bind(EventsRepo).toSelf().inSingletonScope();
    IoC.bind(EventsRepo2).toSelf().inSingletonScope();
}
catch (ex)
{
    console.log('IoC exception:', ex);
}

export { IoC };
