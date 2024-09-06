import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { authorizedRoute, unauthorizeRoute } from "./contants/route";
import { useValidateToken } from "../../hooks";

const withAuth = (WrappedComponent: React.ComponentType) => {
  const Wrapper = (props: any) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const { tokenValidated, loading } = useValidateToken();

    // Uncomment for creation of admin account
    // const accountSetupCb = useApi((api) =>
    //   api.webbackoffice.shouldDoAccountSetup()
    // );
    useEffect(() => {
      const isLoggedIn = !!tokenValidated;
      setIsAuthenticated(isLoggedIn);
      setIsLoading(false); // Comment this setter when account setup function is active

      // Uncomment for creation of admin account
      // async function accountSetup(url: string) {
      //   const executeSetup = await accountSetupCb.execute()
      //   const isAccountExist = executeSetup.data

      //   if (url !== '/accountsetup' && !isAccountExist) {
      //     router.replace('/accountsetup')
      //   }
      //   else if (isAccountExist && url === '/accountsetup') {
      //     router.back()
      //   }
      //   else {
      //     setIsLoading(false);
      //   }
      // }
      // accountSetup(router.asPath)

      async function authorizationDetection(url: string) {
        if (tokenValidated) {
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
      }

      authorizationDetection(router.asPath);

      router.events.on("routeChangeStart", authorizationDetection);
      router.events.on("routeChangeComplete", authorizationDetection);

      return () => {
        router.events.off("routeChangeStart", authorizationDetection);
        router.events.off("routeChangeComplete", authorizationDetection);
      };
    }, [router, tokenValidated]);

    if (isLoading || loading) {
      return;
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
