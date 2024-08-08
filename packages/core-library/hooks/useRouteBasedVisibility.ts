import { useMemo } from 'react';
import { config } from '../config';
import { useRouter } from '../core';
import { HiddenNavigationType } from '../types';
import { HideHeader } from '../components/GenericHeader/HideHeader';
import { HideFooter } from '../components/ReusableFooter/HideFooter';


type HideNavigationReturnType = {
    isHeaderHidden: boolean;
    isFooterHidden: boolean;
};

export const useRouteBasedVisibility = (): HideNavigationReturnType => {
    const { pathname } = useRouter();

    const isNavigationHidden = (hiddenNavigations: HiddenNavigationType[]): boolean => {
        const baseApp = hiddenNavigations.find((nav) => nav.appName === config.value.BASEAPP);

        if (baseApp) {
            const { pathnames } = baseApp;
            return pathnames.includes(pathname);
        }

        return false;
    };

    const isHidden = useMemo(() => { return { isHeaderHidden: isNavigationHidden(HideHeader), isFooterHidden: isNavigationHidden(HideFooter) } }, [pathname]);

    return isHidden;
}