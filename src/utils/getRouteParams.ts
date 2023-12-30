import { getRouteParams as getRouteParamsBase, ttl } from 'react-declarative';
import routes, { IRouteItem } from '../config/routes';

import { get } from 'lodash';
import ioc from '../lib/ioc';

export const getRouteParams = ttl(() => {
    return getRouteParamsBase<IRouteItem>(routes, ioc.routerService.location.pathname) || {};
}, {
    key: () => ioc.routerService.location.pathname,
});

ioc.routerService.listen(() => {
    getRouteParams.gc();
});

export const getRouteParam = (key: string, defaultValue: string | null = null): string | null => {
    const params = getRouteParams();
    return get(params, key) || defaultValue;
};

export default getRouteParams;
