import { getRouteItem as getRouteItemBase, memoize, ttl } from 'react-declarative';
import routes, { IRouteItem } from '../config/routes';

import ioc from '../lib/ioc';

export const getRouteItem = memoize(() => ioc.routerService.location.pathname, () => {
    return getRouteItemBase<IRouteItem>(routes, ioc.routerService.location.pathname)
});

ioc.routerService.listen(() => {
    getRouteItem.clear();
});

export default getRouteItem;
