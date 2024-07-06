import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAccessToken } from "../../contexts/auth/hooks";
import { authorizedRoute, unauthorizeRoute } from "./contants/route";
import { useApi } from "../../hooks";

const withAuth = (WrappedComponent: React.ComponentType) => {
  const Wrapper = (props: any) => {
    const router = useRouter();
    const [accessToken] = useAccessToken();
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const accountSetupCb = useApi((api) =>
      api.webbackoffice.shouldDoAccountSetup()
    );

    useEffect(() => {
      const isLoggedIn = !!accessToken;
      setIsAuthenticated(isLoggedIn);
      setIsLoading(false);
      const shouldProceedAccountSetup = accountSetupCb.result?.data; //jacob, this returns either true or false. false if there's no accounts true if any

      function authorizationDetection(url: string) {
        if (
          !isLoggedIn &&
          authorizedRoute.some((route) => url.startsWith(route))
        ) {
          router.replace("/login");
        } else if (
          isLoggedIn &&
          unauthorizeRoute.some((route) => url === route)
        ) {
          router.replace("/hub");
        } else if (isLoggedIn && url === "/404") {
          router.replace("/hub");
        }
      }

      authorizationDetection(router.asPath);

      router.events.on("routeChangeStart", authorizationDetection);
      router.events.on("routeChangeComplete", authorizationDetection);

      return () => {
        router.events.off("routeChangeStart", authorizationDetection);
        router.events.off("routeChangeComplete", authorizationDetection);
      };
    }, [router, accessToken]);

    if (isLoading) {
      return <div>Loading...</div>;
    }

    return (isAuthenticated &&
      !unauthorizeRoute.some((route) => router.pathname === route)) ||
      (!isAuthenticated &&
        !authorizedRoute.some((route) => router.pathname.startsWith(route))) ? (
      <WrappedComponent {...props} />
    ) : null;
  };

  return Wrapper;
};

export default withAuth;
