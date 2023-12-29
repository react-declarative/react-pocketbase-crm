import { getRouteParams as getRouteParamsBase, memoize } from 'react-declarative';
import routes, { IRouteItem } from '../config/routes';

import { get } from 'lodash';
import ioc from '../lib/ioc';

export const getRouteParams = memoize(() => ioc.routerService.location.pathname, () => {
    return getRouteParamsBase<IRouteItem>(routes, ioc.routerService.location.pathname) || {};
});

ioc.routerService.listen(() => {
    getRouteParams.clear();
});

export const getRouteParam = (key: string, defaultValue: string | null = null): string | null => {
    const params = getRouteParams();
    return get(params, key) || defaultValue;
};

export default getRouteParams;
