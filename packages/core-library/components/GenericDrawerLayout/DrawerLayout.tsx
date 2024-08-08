import React, { useEffect, useState, useMemo } from "react";
import { Box, Button } from "@mui/material";
import { SxProps, Theme } from "@mui/material/styles";
import { Header } from "../GenericHeader/Header";
import { NavigationType } from "../../types/navigation";
import { Sidebar } from "../";
import { useIsMounted, useResolution } from "../../hooks";
import { Main } from "./content/Main";
import MenuIcon from "@mui/icons-material/Menu";

type DrawerLayoutType = {
  menu: NavigationType[];
  isAuthenticated: boolean;
  headerContainerSx?: SxProps<Theme>;
  buttonHeaderSx?: SxProps<Theme>;
  onLogout?: () => void;
  loading?: boolean;
};

export const DrawerLayout: React.FC<
  React.PropsWithChildren<DrawerLayoutType>
> = ({
  menu,
  children,
  isAuthenticated,
  headerContainerSx,
  buttonHeaderSx,
  onLogout,
  loading,
}) => {
    const { isMobile } = useResolution();
    const mounted = useIsMounted()
    const [open, setOpen] = useState(true);
    const AuthHeaderStyle = useMemo(() => !isAuthenticated ? headerContainerSx : null, [isAuthenticated]);
    const AuthButtonStyle = useMemo(() => !isAuthenticated ? buttonHeaderSx : null, [isAuthenticated]);

    const handleDrawer = () => {
      setOpen((prev) => !prev);
    };

    useEffect(() => {
      setOpen(!isMobile);
    }, [isMobile]);


    if (!mounted) return;

    return (
      <Box display="flex">
        {(isAuthenticated || isMobile) && (
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
              drawerButton={
                ((!open && isAuthenticated) || isMobile) && (
                  <Button onClick={handleDrawer}>
                    <MenuIcon />
                  </Button>
                )
              }
              menu={menu}
              isAuthenticated={isAuthenticated}
              headerContainerSx={AuthHeaderStyle}
              buttonHeaderSx={AuthButtonStyle}
              onLogout={onLogout}
            />
            <Box height="100%">{children}</Box>
          </Box>
        </Main>
      </Box>
    );
  };
