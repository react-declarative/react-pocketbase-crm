import { getRouteParams as getRouteParamsBase, memoize } from 'react-declarative';

import { get } from 'lodash';
import ioc from '../lib/ioc';
import routes from '../config/routes';

export const getRouteParams = memoize(() => ioc.routerService.location.pathname, () => {
    return getRouteParamsBase(routes, ioc.routerService.location.pathname) || {};
});

ioc.routerService.listen(() => {
    getRouteParams.clear();
});

export const getRouteParam = (key: string, defaultValue: string | null = null): string | null => {
    const params = getRouteParams();
    return get(params, key) || defaultValue;
};

export default getRouteParams;
