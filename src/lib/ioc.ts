import "./config";

import { Operator, Source, inject } from "react-declarative";

import AlertService from "./services/base/AlertService";
import { CC_LOADER_NOT_RESPONDING_TICKS } from "../config/params";
import ErrorService from "./services/base/ErrorService";
import LayoutService from "./services/base/LayoutService";
import LoggerService from "./services/base/LoggerService";
import PocketbaseService from "./services/base/PocketbaseService";
import RouterService from "./services/base/RouterService";
import TYPES from "./types";

const baseServices = {
  alertService: inject<AlertService>(TYPES.alertService),
  routerService: inject<RouterService>(TYPES.routerService),
  layoutService: inject<LayoutService>(TYPES.layoutService),
  errorService: inject<ErrorService>(TYPES.errorService),
  loggerService: inject<LoggerService>(TYPES.loggerService),
  pocketbaseService: inject<PocketbaseService>(TYPES.pocketbaseService),
};

const ioc = {
  ...baseServices,
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

(window as any).ioc = ioc;

export default ioc;
