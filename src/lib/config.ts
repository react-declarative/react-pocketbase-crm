import AlertService from './services/base/AlertService';
import EmployeeDbService from './services/db/EmployeeDbService';
import EmployeeViewService from './services/view/EmployeeViewService';
import ErrorService from './services/base/ErrorService';
import HistoryDbService from './services/db/HistoryDbService';
import HistoryViewService from './services/view/HistoryViewService';
import LayoutService from './services/base/LayoutService';
import LoggerService from './services/base/LoggerService';
import PermissionService from './services/global/PermissionService';
import PocketbaseService from './services/base/PocketbaseService';
import RouterService from './services/base/RouterService';
import SettingsDbService from './services/db/SettingsDbService';
import SettingsViewService from './services/view/SettingsViewService';
import TYPES from './types';
import { provide } from 'react-declarative';

provide(TYPES.alertService, () => new AlertService());
provide(TYPES.layoutService, () => new LayoutService());
provide(TYPES.routerService, () => new RouterService());
provide(TYPES.errorService, () => new ErrorService());
provide(TYPES.loggerService, () => new LoggerService());
provide(TYPES.pocketbaseService, () => new PocketbaseService());

provide(TYPES.employeeDbService, () => new EmployeeDbService());
provide(TYPES.historyDbService, () => new HistoryDbService());
provide(TYPES.settingsDbService, () => new SettingsDbService());

provide(TYPES.employeeViewService, () => new EmployeeViewService());
provide(TYPES.historyViewService, () => new HistoryViewService());
provide(TYPES.settingsViewService, () => new SettingsViewService());

provide(TYPES.permissionService, () => new PermissionService());
