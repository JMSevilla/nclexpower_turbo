import { Box } from "@mui/material";
import { useEffect } from "react";
import { CmsPage } from "../../types/page";
import { usePageLoaderContext } from "../../contexts/PageLoaderContext";
import { useRouter } from "next/router";
import { ComponentLoader } from "../ComponentLoader";

interface Props {
  page: CmsPage | null;
  loading: boolean;
}

export const LoadablePageContent: React.FC<React.PropsWithChildren<Props>> = ({
  page,
  loading,
  children,
}) => {
  const { isLoading } = usePageLoaderContext();
  // auth context here.
  const router = useRouter();
  const isPageLoading = loading || isLoading;

  useEffect(() => {
    if (!page && !isPageLoading) {
    }
  }, [page, isPageLoading]);

  return (
    <>
      {isPageLoading && (
        <Box
          flex={1}
          height="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <ComponentLoader disableMarginBottom />
        </Box>
      )}
      {!isPageLoading && (
        <Box display="flex" flexDirection="column" height="100%">
          {children}
        </Box>
      )}
    </>
  );
};
