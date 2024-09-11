import { Box, Button, Grid } from "@mui/material";
import { useResolution } from "../../hooks";
import { HeaderLogo } from "./HeaderLogo";
import { useRouter } from "../../core";
import { AccountMenu } from "../index";
import { AccountCircle as AccountCircleIcon } from "@mui/icons-material";
import { WebHeaderStylesType } from "../../types/web-header-style";
import { AccountMenuItem } from ".";
import { MenuItems } from "../../api/types";

export interface Props extends Partial<WebHeaderStylesType> {
  menu?: Array<MenuItems>;
  isAuthenticated: boolean;
  drawerButton?: React.ReactNode;
  onLogout?: () => void;
  hidden: boolean;
}

export const Header: React.FC<Props> = ({
  menu,
  isAuthenticated,
  drawerButton,
  onLogout,
  drawerHeader,
  headerLinkSx,
  loginButtonSx,
  hidden,
}) => {

  const { isMobile } = useResolution();
  const router = useRouter();
  const path = router.pathname;

  const handleNavigate = (path?: string) => {
    router.push({ pathname: path || "/login" });
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    handleNavigate("/login");
  };

  return (
    !hidden && (
      <Box
        role="banner"
        component="header"
        width="100%"
        minHeight={70}
        display="flex"
        data-testid="header"
        justifyContent="center"
        alignItems="center"
        position="sticky"
        top={0}
        zIndex={999}
        bgcolor="background.default"
        sx={{
          ...drawerHeader,
          borderBottomWidth: 1,
          borderBottomStyle: "solid",
          borderBottomColor: "divider",
        }}
      >
        {menu && menu.length > 0 && drawerButton && (
          <Grid item>{drawerButton}</Grid>
        )}
        <Grid
          container
          px={8}
          width="100%"
          position="relative"
          display="flex"
          alignItems="flex-end"
          justifyContent="flex-end"
        >
          <Grid
            item
            container
            alignItems="flex-center"
            spacing={6}
            height="auto"
          >
            <Grid
              item
              container
              alignItems="center"
              justifyContent="space-between"
              xs
            >
              {!isAuthenticated && (
                <Grid item>
                  <HeaderLogo />
                </Grid>
              )}
              <Grid item display="flex" alignItems="center">
                {!isMobile && !isAuthenticated ? (
                  <Grid container gap={4} direction="row">
                    {menu &&
                      menu.length > 0 &&
                      menu.map((navigation, index) => (
                        <Grid item key={index}>
                          <Button
                            disabled={navigation.path == path}
                            sx={
                              navigation.label === "Login"
                                ? loginButtonSx
                                : headerLinkSx
                            }
                            onClick={() => handleNavigate(navigation.path)}
                            data-testid={`menu-item-${navigation.label}`}
                          >
                            {navigation.label}
                          </Button>
                        </Grid>
                      ))}
                  </Grid>
                ) : null}
              </Grid>
            </Grid>
            {isAuthenticated && <Grid item alignSelf="center"></Grid>}
            {isAuthenticated && <Grid item alignSelf="center"></Grid>}
            {isMobile && <Grid item></Grid>}
          </Grid>
          <Grid item xs={12} position="relative"></Grid>
          {isAuthenticated && (
            <AccountMenu
              icon={<AccountCircleIcon color="primary" fontSize="small" />}
              label="User"
              accountItem={AccountMenuItem}
              onLogout={handleLogout}
            />
          )}
        </Grid>
      </Box>
    )
  );
};
