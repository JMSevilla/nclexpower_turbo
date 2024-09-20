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

type DrawerLayoutType = {
  menu: Array<MenuItems>;
  isAuthenticated: boolean;
  onLogout?: () => void;
  loading?: boolean;
  headerStyles?: WebHeaderStylesType;
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
  hiddenHeaderPathnames,
}) => {
  const { isMobile } = useResolution();
  const mounted = useIsMounted();
  const [open, setOpen] = useState(true);
  const { isHidden } = useRouteBasedVisibility(hiddenHeaderPathnames ?? []);

  const handleDrawer = () => {
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    setOpen(!isMobile);
  }, [isMobile]);

  if (!mounted) return;

  return (
    <Box display="flex">
      {menu.length > 0 && (isAuthenticated || isMobile) && (
        <Sidebar
          isMobile={isMobile}
          menu={menu}
          open={open}
          setOpen={handleDrawer}
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
