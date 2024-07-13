import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { SxProps, Theme } from "@mui/material/styles";
import { Header } from "../GenericHeader/Header";
import { NavigationType } from "../../types/navigation";
import { Sidebar } from "../";
import { useResolution } from "../../hooks";
import { Main } from "./content/Main";
import MenuIcon from "@mui/icons-material/Menu";
import { useRouter } from "next/router";
import { useLogout } from "../../hooks";

type DrawerLayoutType = {
  menu: NavigationType[];
  isAuthenticated: boolean;
  headerContainerSx?: SxProps<Theme>;
  buttonHeaderSx?: SxProps<Theme>;
};

export const DrawerLayout: React.FC<
  React.PropsWithChildren<DrawerLayoutType>
> = ({
  menu,
  children,
  isAuthenticated,
  headerContainerSx,
  buttonHeaderSx,
}) => {
  const [open, setOpen] = useState(true);
  const { isMobile } = useResolution();
  const [mounted, setMounted] = useState<boolean>(false);
  const AuthHeaderStyle = !isAuthenticated ? headerContainerSx : null;
  const AuthButtonStyle = !isAuthenticated ? buttonHeaderSx : null;
  const router = useRouter();
  const { logout } = useLogout();
  const hideDrawer = router.pathname === "/order-checkout";

  const handleDrawer = () => {
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    setOpen(!isMobile);
  }, [isMobile]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

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
        <Box display="flex" minHeight="100vh" flexDirection="column">
          <Box>
            {!hideDrawer && (
              <Header
                drawerButton={
                  ((!open && isAuthenticated) || isMobile) && (
                    <Button onClick={handleDrawer}>
                      <MenuIcon />
                    </Button>
                  )
                }
                onLogout={logout}
                menu={menu}
                isAuthenticated={isAuthenticated}
                headerContainerSx={AuthHeaderStyle}
                buttonHeaderSx={AuthButtonStyle}
              />
            )}
          </Box>
          {children}
        </Box>
      </Main>
    </Box>
  );
};
