import { cached, getRouteItem as getRouteItemBase, memoize } from 'react-declarative';
import routes, { IRouteItem } from '../config/routes';

import ioc from '../lib/ioc';

export const getRouteItem = memoize(() => ioc.routerService.location.pathname, () => {
    return getRouteItemBase(routes, ioc.routerService.location.pathname)
})

ioc.routerService.listen(() => {
    getRouteItem.clear();
});

export default getRouteItem;
