import { Box } from "@mui/material";
import { ComponentLoader } from "core-library/components";
import React from "react";

interface Props {
  loading: boolean;
}

export const LoadablePageContent: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  loading,
}) => {
  const isPageLoading = loading;

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
        <Box display="flex" flexDirection="column" height="100%" className={'animate-fadeIn'}>
          {children}
        </Box>
      )}
    </React.Fragment>
  );
};
