import { getRouteItem, ttl } from 'react-declarative';

import ioc from '../lib/ioc';
import routes from '../config/routes';

export const hasRouteMatch = ttl((templates: string[], pathname = ioc.routerService.location.pathname) => {
    return !!getRouteItem(routes.filter(({ path }) => templates.includes(path)), pathname);
}, {
    key: () => ioc.routerService.location.pathname,
});

ioc.routerService.listen(() => {
    hasRouteMatch.gc();
});

export default hasRouteMatch;
