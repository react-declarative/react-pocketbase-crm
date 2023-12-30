import { getRouteItem as getRouteItemBase, ttl } from 'react-declarative';
import routes, { IRouteItem } from '../config/routes';

import ioc from '../lib/ioc';

export const getRouteItem = ttl(() => {
    return getRouteItemBase<IRouteItem>(routes, ioc.routerService.location.pathname)
}, {
    key: () => ioc.routerService.location.pathname, 
})

ioc.routerService.listen(() => {
    getRouteItem.gc();
});

export default getRouteItem;
