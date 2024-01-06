import "./config";

import { Operator, Source, inject, reloadPage, sleep } from "react-declarative";

import AlertService from "./services/base/AlertService";
import { CC_LOADER_NOT_RESPONDING_TICKS } from "../config/params";
import EmployeeDbService from "./services/db/EmployeeDbService";
import EmployeeViewService from "./services/view/EmployeeViewService";
import ErrorService from "./services/base/ErrorService";
import HistoryDbService from "./services/db/HistoryDbService";
import HistoryViewService from "./services/view/HistoryViewService";
import LayoutService from "./services/base/LayoutService";
import LoggerService from "./services/base/LoggerService";
import PermissionService from "./services/global/PermissionService";
import PocketbaseService from "./services/base/PocketbaseService";
import RouterService from "./services/base/RouterService";
import SettingsDbService from "./services/db/SettingsDbService";
import SettingsViewService from "./services/view/SettingsViewService";
import TYPES from "./types";

const baseServices = {
  alertService: inject<AlertService>(TYPES.alertService),
  routerService: inject<RouterService>(TYPES.routerService),
  layoutService: inject<LayoutService>(TYPES.layoutService),
  errorService: inject<ErrorService>(TYPES.errorService),
  loggerService: inject<LoggerService>(TYPES.loggerService),
  pocketbaseService: inject<PocketbaseService>(TYPES.pocketbaseService),
};

const dbServices = {
  employeeDbService: inject<EmployeeDbService>(TYPES.employeeDbService),
  historyDbService: inject<HistoryDbService>(TYPES.historyDbService),
  settingsDbService: inject<SettingsDbService>(TYPES.settingsDbService),
};

const viewServices = {
  employeeViewService: inject<EmployeeViewService>(TYPES.employeeViewService),
  historyViewService: inject<HistoryViewService>(TYPES.historyViewService),
  settingsViewService: inject<SettingsViewService>(TYPES.settingsViewService),
};

const permissionServices = {
  permissionService: inject<PermissionService>(TYPES.permissionService),
};

const ioc = {
  ...baseServices,
  ...dbServices,
  ...viewServices,
  ...permissionServices,
};

ioc.layoutService.setModalLoader(true);
ioc.layoutService.appbarLoaderSubject
  .filter((value) => !value)
  .filter(() => !ioc.layoutService.hasAppbarLoader)
  .operator(Operator.take(1))
  .debounce(1_000)
  .once(() => {
    ioc.layoutService.setModalLoader(false);
  });

Source.join(
  [ioc.layoutService.appbarLoaderSubject.toObserver(), Source.fromInterval(10_000)],
  {
    race: true,
  }
)
  .reduce((acm, [current]) => {
    return current ? acm + 1 : 0;
  }, 0)
  .filter((ticker) => ticker === CC_LOADER_NOT_RESPONDING_TICKS)
  .connect(() => {
    if (!ioc.layoutService.hasModalLoader) {
      ioc.layoutService.dropAppbarLoader();
    }
  });

ioc.settingsViewService.updateSubject.subscribe(async () => {
  reloadPage();
});

(window as any).ioc = ioc;

export default ioc;
