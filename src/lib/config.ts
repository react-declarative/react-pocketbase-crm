import AlertService from './services/base/AlertService';
import ErrorService from './services/base/ErrorService';
import LayoutService from './services/base/LayoutService';
import LoggerService from './services/base/LoggerService';
import PocketbaseService from './services/base/PocketbaseService';
import RouterService from './services/base/RouterService';
import TYPES from './types';
import { provide } from 'react-declarative';

provide(TYPES.alertService, () => new AlertService());
provide(TYPES.layoutService, () => new LayoutService());
provide(TYPES.routerService, () => new RouterService());
provide(TYPES.errorService, () => new ErrorService());
provide(TYPES.loggerService, () => new LoggerService());
provide(TYPES.pocketbaseService, () => new PocketbaseService());
