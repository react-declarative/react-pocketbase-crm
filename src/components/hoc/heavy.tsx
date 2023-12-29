import { Suspense, lazy, useEffect } from 'react';

import ioc from '../../lib/ioc';

const Loader = () => {
    useEffect(() => {
        ioc.layoutService.setAppbarLoader(true);
        return () => ioc.layoutService.setAppbarLoader(false);
    }, []);
    return <></>
}

export const heavy = <T extends React.ComponentType<P>, P extends object = any>(factory: () => Promise<{ default: T }>) => {
    const Component = lazy<any>(factory);
    return (props: P) => (
        <Suspense fallback={<Loader />}>
            <Component {...props} />
        </Suspense>
    );
};

export default heavy;
