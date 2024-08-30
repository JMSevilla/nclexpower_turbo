import { useEffect, useState } from 'react'
import { useRouter } from '../core'

type PageLoaderReturnType = {
    isPageLoading: boolean
}

export const usePageLoader = (): PageLoaderReturnType => {
    const [isPageLoading, setIsPageLoading] = useState<boolean>(false)
    const router = useRouter()

    const handleRouteChangeStart = () => {
            setIsPageLoading(true)
    }

    const handleRouteChangeComplete = () => {
        setTimeout(() => {
            setIsPageLoading(false)
        },2000)
    }

    useEffect(() => {
        router.events.on("routeChangeStart", handleRouteChangeStart);
        router.events.on("routeChangeComplete", handleRouteChangeComplete);
        return () => {
            router.events.off("routeChangeStart", handleRouteChangeStart);
            router.events.off("routeChangeComplete", handleRouteChangeComplete);
        };
    }, [])

    return { isPageLoading }
}