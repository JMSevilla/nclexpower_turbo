import { Box, Grid, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { CmsMenu } from "@repo/utils/types/menu";
import { CmsTenant } from "@repo/utils/types/tenant";
import { useContentDataContext } from "@repo/utils/contexts/contentData/ContentDataContext";
import { useResolution } from "@repo/utils/hooks";
import { useRouter } from "@/core/router";
import { HeaderLogoNavigation } from "./HeaderLogoNavigation";
import { HeaderLogo } from "./HeaderLogo";

interface Props {
  menu: CmsMenu | null;
  tenant: CmsTenant | null;
  useRawLogoUrl?: boolean;
  onLogout(): void; //prep code for logout
  pageKey?: string;
}

export const Header: React.FC<Props> = ({
  tenant,
  useRawLogoUrl,
  onLogout,
  menu,
  pageKey,
}) => {
  const router = useRouter();
  const { isMobile } = useResolution();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <>
      <Box
        role="banner"
        component="header"
        width="100%"
        display="flex"
        justifyContent="center"
        zIndex={999}
        sx={{
          backgroundColor: "background.default",
          borderBottomWidth: 1,
          borderBottomStyle: "solid",
          borderBottomColor: "divider",
          ...(isMobile ? { position: "fixed", top: 0, left: 0, right: 0 } : {}),
        }}
      >
        <Grid
          container
          px={8}
          width="100%"
          position="relative"
          display="flex"
          alignItems="flex-end"
          justifyContent="flex-end"
          sx={{
            maxWidth: (theme) => theme.sizes.contentWidth,
            height: (theme) => ({
              xs: theme.sizes.mobileHeaderHeight,
              md: theme.sizes.headerHeight,
            }),
            maxHeight: (theme) => ({
              xs: theme.sizes.mobileHeaderHeight,
              md: theme.sizes.headerHeight,
            }),
          }}
        >
          <Grid
            item
            container
            alignItems="flex-end"
            spacing={6}
            height={{ xs: "auto", md: 80 }}
          >
            <Grid item container alignItems="flex-end" xs>
              <Grid item>
                <HeaderLogoNavigation
                  href={""}
                  shouldNavigateToNewTab={!isAuthenticated}
                >
                  <HeaderLogo useRawLogoUrl={useRawLogoUrl} tenant={tenant} />
                </HeaderLogoNavigation>
              </Grid>
              <Grid item>
                <HeaderLogoNavigation
                  id="cobranding_logo_button"
                  href={""}
                  shouldNavigateToNewTab={!isAuthenticated}
                >
                  {/* Co branding logo */}
                </HeaderLogoNavigation>
              </Grid>
            </Grid>
            {isAuthenticated && <Grid item alignSelf="center"></Grid>}
            {isAuthenticated && <Grid item alignSelf="center"></Grid>}
            {isMobile && <Grid item></Grid>}
          </Grid>
          <Grid item xs={12} position="relative"></Grid>
        </Grid>
      </Box>
    </>
  );
};
