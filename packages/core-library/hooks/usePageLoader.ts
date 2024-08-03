

import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'


type PageLoaderReturnType = {
    isPageLoading: boolean
}


export const usePageLoader = (): PageLoaderReturnType => {
    const [isPageLoading, setIsPageLoading] = useState<boolean>(false)
    const router = useRouter()

    useEffect(() => {
        const handleRouteChangeStart = () => setIsPageLoading(true);
        const handleRouteChangeComplete = () => setIsPageLoading(false);

        router.events.on("routeChangeStart", handleRouteChangeStart);
        router.events.on("routeChangeComplete", handleRouteChangeComplete);

        return () => {
            router.events.off("routeChangeStart", handleRouteChangeStart);
            router.events.off("routeChangeComplete", handleRouteChangeComplete);
        };
    }, [])


    return { isPageLoading }
}