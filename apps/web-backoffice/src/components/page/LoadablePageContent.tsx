import { Box } from "@mui/material";
import { useEffect } from "react";
import { CmsPage } from "@repo/utils/types/page";
import { usePageLoaderContext } from "@/core/contexts/PageLoaderContext";
import { useRouter } from "@/core/router";
import { ComponentLoader } from "@repo/ui";

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
      router.push((routes) => routes.page_not_found);
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
