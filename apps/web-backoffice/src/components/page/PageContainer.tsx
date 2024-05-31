import { Box } from "@mui/material";
import React from "react";
import { CmsPage } from "@repo/utils/types/page";

interface Props {
  loading?: boolean;
  stickOut?: boolean;
  page: CmsPage | null;
}

export const PageContainer: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  loading,
  stickOut,
  page,
}) => {
  return (
    <Box
      component="main"
      id="mainContent"
      role="main"
      flex={1}
      width="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="flex-start"
    >
      <Box
        flex={1}
        width="100%"
        height="100%"
        display="flex"
        flexDirection="column"
        my={{ xs: 0, sm: stickOut ? 12 : 0 }}
        boxShadow={{ xs: 0, sm: stickOut ? 8 : 0 }}
        sx={{
          width: (theme) => ({
            xs: "100%",
            sm: stickOut ? theme.sizes.stickOutPageWidth : "100%",
          }),
        }}
      >
        <Box
          flex={1}
          position="relative"
          display="flex"
          flexDirection="column"
          alignSelf="center"
          mr="auto"
          ml="auto"
          pt={12}
          pb={24}
          width="100%"
          height="100%"
          sx={{
            maxWidth: (theme) => ({
              xs: "100vw",
              md: stickOut
                ? theme.sizes.stickOutPageWidth
                : theme.sizes.contentWidth,
            }),
            px: (theme) => ({
              xs: theme.sizes.mobileContentPaddingX,
              md: theme.sizes.contentPaddingX,
            }),
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};
