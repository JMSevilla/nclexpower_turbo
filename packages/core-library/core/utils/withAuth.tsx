import React, { useEffect, useMemo, useState } from "react";
import { authorizedRoute, unauthorizeRoute } from "./contants/route";
import { useValidateToken } from "../../hooks";
import { useRouter } from "../router";

const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
): React.FC<P> => {
  const Wrapper: React.FC<P> = (props: P) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const { tokenValidated, loading } = useValidateToken();

    useEffect(() => {
      const isLoggedIn = !!tokenValidated;
      setIsAuthenticated(isLoggedIn);
      setIsLoading(false);

      async function authorizationDetection(url: string) {
        if (tokenValidated) {
          if (isLoggedIn && unauthorizeRoute.some((route) => url === route)) {
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
      !isAuthenticated ? (
      <WrappedComponent {...props} />
    ) : null;
  };

  return Wrapper;
};

export default withAuth;
