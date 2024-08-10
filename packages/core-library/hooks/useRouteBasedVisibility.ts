import { useMemo } from 'react';
import { useRouter } from '../core';


type HideNavigationReturnType = {
    isHidden: boolean;
    pathname: string;
};

export const useRouteBasedVisibility = (pathnames: string[]): HideNavigationReturnType => {
    const { pathname } = useRouter();

    const isNavigationHidden = (): boolean => {
        return pathnames.includes(pathname);
    };

    const isHidden = useMemo(() => {
        return {
            isHidden: isNavigationHidden(),
            pathname: pathname
        }
    }, [pathname]);

    return isHidden;
}