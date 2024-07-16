import { Box, Button, Grid } from "@mui/material";
import { useResolution } from "../../hooks";
import { HeaderLogo } from "./HeaderLogo";
import { NavigationType } from "../../types/navigation";
import { useRouter } from "next/router";
import { SxProps, Theme } from "@mui/material/styles";
import { AccountMenu } from "../index";
import { AccountMenuItem } from "../../../../apps/web-backoffice-generic/src/core/constant/UserDropDown";
import { AccountCircle as AccountCircleIcon } from "@mui/icons-material";
import { useState } from "react";

interface Props {
  menu?: NavigationType[];
  isAuthenticated: boolean;
  drawerButton?: React.ReactNode;
  headerContainerSx?: SxProps<Theme>;
  buttonHeaderSx?: SxProps<Theme>;
  // headerContainerSx?: SxProps<Theme>
  // buttonHeaderSx?: SxProps<Theme>
  onLogout?: () => void;
}

export const Header: React.FC<Props> = ({
  menu,
  isAuthenticated,
  drawerButton,
  headerContainerSx,
  buttonHeaderSx,
  onLogout,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleLogout = () => {};

  const { isMobile } = useResolution();
  const router = useRouter();

  const handleNavigate = (path?: string) => {
    router.push({ pathname: path || "/" });
  };

  return (
    <Box
      role="banner"
      component="header"
      width="100%"
      height={70}
      display="flex"
      justifyContent="center"
      alignItems="center"
      position="sticky"
      top={0}
      zIndex={999}
      bgcolor="background.default"
      sx={{
        ...headerContainerSx,
        borderBottomWidth: 1,
        borderBottomStyle: "solid",
        borderBottomColor: "divider",
      }}
    >
      {drawerButton && <Grid item>{drawerButton}</Grid>}
      <Grid
        container
        px={8}
        width="100%"
        position="relative"
        display="flex"
        alignItems="flex-end"
        justifyContent="flex-end"
      >
        <Grid item container alignItems="flex-center" spacing={6} height="auto">
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
                          sx={{
                            ...buttonHeaderSx,
                          }}
                          onClick={() => handleNavigate(navigation.path)}
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
        <Grid item xs={12} position="relative">
          <Button onClick={onLogout}>sample logout</Button>
        </Grid>
        {isAuthenticated && (
          <AccountMenu
            icon={<AccountCircleIcon color="primary" fontSize="small" />}
            label="User"
            accountItem={AccountMenuItem}
            anchorEl={anchorEl}
            onClick={handleClick}
            onLogout={handleLogout}
          />
        )}
      </Grid>
    </Box>
  );
};
