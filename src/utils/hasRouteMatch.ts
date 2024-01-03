import { getRouteItem, memoize } from "react-declarative";

import ioc from "../lib/ioc";
import routes from "../config/routes";

export const hasRouteMatch = memoize(
  ([templates, pathname]) => `${templates.join("-")}-${pathname}`,
  (templates: string[], pathname = ioc.routerService.location.pathname) => {
    return !!getRouteItem(
      routes.filter(({ path }) => templates.includes(path)),
      pathname
    );
  }
);

ioc.routerService.listen(() => {
  hasRouteMatch.clear();
});

export default hasRouteMatch;
