import { ComponentLoader } from "core-library/components";
import { Box } from "@mui/material";
import { useEffect } from "react";
import { useRouter } from "next/router";
interface Props {
  loading?: boolean;
  isAuthenticated?: boolean;
}

export const LoadablePageContent: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  loading,
  isAuthenticated,
}) => {
  const router = useRouter();
  const authorizedPaths = ["/hub", "/account-settings"];
  useEffect(() => {
    function authorizationDetection() {
      if (isAuthenticated) {
        if (router.asPath == "/login") {
          router.push("/404");
        }
      }
      if (!isAuthenticated) {
        if (authorizedPaths.includes(router.asPath)) {
          router.push("/404");
        }
      }
    }

    router.events.on("routeChangeStart", authorizationDetection);
    router.events.on("routeChangeComplete", authorizationDetection);

    return () => {
      router.events.off("routeChangeStart", authorizationDetection);
      router.events.off("routeChangeComplete", authorizationDetection);
    };
  }, [isAuthenticated, router]);

  return (
    <>
      {loading ? (
        <Box
          flex={1}
          height="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{}}
        >
          <ComponentLoader disableMarginBottom={false} />
        </Box>
      ) : (
        <Box
          display={loading ? "none" : "block"}
          flexDirection="column"
          height="100%"
        >
          {children}
        </Box>
      )}
    </>
  );
};
