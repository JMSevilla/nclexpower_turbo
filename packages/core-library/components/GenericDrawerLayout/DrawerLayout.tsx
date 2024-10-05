import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { Header } from "../GenericHeader/Header";
import { Sidebar } from "../";
import {
  useIsMounted,
  useResolution,
  useRouteBasedVisibility,
} from "../../hooks";
import { Main } from "./content/Main";
import MenuIcon from "@mui/icons-material/Menu";
import { WebHeaderStylesType } from "../../types/web-header-style";
import { MenuItems } from "../../api/types";
import { WebSidebarStylesType } from "../../types/web-sidebar-styles";
import { useRouter } from "../../core";
import { config } from "../../config";

type DrawerLayoutType = {
  menu: Array<MenuItems>;
  isAuthenticated: boolean;
  onLogout?: () => void;
  loading?: boolean;
  headerStyles?: WebHeaderStylesType;
  sidebarStyles?: WebSidebarStylesType;
  hiddenHeaderPathnames?: string[];
};

export const DrawerLayout: React.FC<
  React.PropsWithChildren<DrawerLayoutType>
> = ({
  menu,
  children,
  isAuthenticated,
  onLogout,
  headerStyles,
  sidebarStyles,
  hiddenHeaderPathnames,
}) => {
    const { isMobile } = useResolution();
    const mounted = useIsMounted();
    const [open, setOpen] = useState(true);
    const { isHidden } = useRouteBasedVisibility(hiddenHeaderPathnames ?? []);

    const router = useRouter();

    const isInHub = router.pathname?.startsWith("/hub") || false;
    const appName = config.value.BASEAPP;
    const isInWebcHub = isAuthenticated && isInHub && appName.includes("c");

    const handleDrawer = () => {
      setOpen((prev) => !prev);
    };

    useEffect(() => {
      setOpen(!isMobile);
    }, [isMobile]);

    if (!mounted) return;

    const customHeaderStyles = isInWebcHub
      ? {
        drawerHeader: {
          bgcolor: "#00173F",
          color: "white",
        },
      }
      : headerStyles;

    return (
      <Box display="flex">
        {menu.length > 0 && (isAuthenticated || isMobile) && (
          <Sidebar
            {...sidebarStyles}
            isMobile={isMobile}
            menu={menu}
            open={open}
            setOpen={handleDrawer}
            isAuthenticated={isAuthenticated}
          />
        )}
        <Main open={open} isMobile={isMobile}>
          <Box
            display="flex"
            height="100vh"
            flexDirection="column"
            minHeight="100vh"
          >
            <Header
              {...headerStyles}
              hidden={isHidden ?? false}
              drawerButton={
                ((!open && isAuthenticated) || isMobile) && (
                  <Button onClick={handleDrawer}>
                    <MenuIcon />
                  </Button>
                )
              }
              menu={menu}
              isAuthenticated={isAuthenticated}
              onLogout={onLogout}
            />
            <Box height="100%">{children}</Box>
          </Box>
        </Main>
      </Box>
    );
  };

