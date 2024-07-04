import { Box } from "@mui/material";
import { useEffect } from "react";
import { ComponentLoader } from "core-library/components";
import React from "react";
import { useRouter } from "next/router";

interface Props {
  loading: boolean;
  isAuthenticated?: boolean;
}

export const LoadablePageContent: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  loading,
  isAuthenticated,
}) => {
  const isPageLoading = loading;
  const router = useRouter();
  const authorizedPaths = ["/"];
  const loginPath = "/login";

  useEffect(() => {
    function authorizationDetection(url: string) {
      if (isAuthenticated) {
        if (url === loginPath) {
          router.push("/404");
        }
      } else {
        if (authorizedPaths.includes(url)) {
          router.push(loginPath);
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
  }, [isAuthenticated, router]);

  return (
    <React.Fragment>
      {isPageLoading ? (
        <Box
          flex={1}
          height="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <ComponentLoader disableMarginBottom />
        </Box>
      ) : (
        <Box display="flex" flexDirection="column" height="100%">
          {children}
        </Box>
      )}
    </React.Fragment>
  );
};
