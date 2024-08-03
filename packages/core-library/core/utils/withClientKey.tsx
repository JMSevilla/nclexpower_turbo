import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useClientSecretKey } from "../../contexts/SecretClientKeyContext";
import { hasClientKeyRoute } from "./contants/route";

/**
 * @deprecated This is no longer effective in pre-product or production and will not expand enhancement on sprint 10.
 */
const withClientSecretKey = (WrappedComponent: React.ComponentType) => {
  const Wrapper = (props: any) => {
    const router = useRouter();
    const { clientSecretKey } = useClientSecretKey();

    useEffect(() => {
      const handleRouteChange = (url: string) => {
        if (
          !clientSecretKey &&
          hasClientKeyRoute.some((route) => url.startsWith(route))
        ) {
          router.replace("/404");
        }
      };

      handleRouteChange(router.asPath);

      router.events.on("routeChangeStart", handleRouteChange);
      router.events.on("routeChangeComplete", handleRouteChange);

      return () => {
        router.events.off("routeChangeStart", handleRouteChange);
        router.events.off("routeChangeComplete", handleRouteChange);
      };
    }, [clientSecretKey, router]);

    return clientSecretKey ||
      !hasClientKeyRoute.some((route) => router.pathname.startsWith(route)) ? (
      <WrappedComponent {...props} />
    ) : null;
  };

  return Wrapper;
};

export default withClientSecretKey;
