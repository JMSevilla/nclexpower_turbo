import React from "react";
import { Drawer, IconButton, Typography } from "@mui/material";
import { Box, List } from "@mui/material";
import { SidebarListButton } from "./SidebarListButton";
import { SidebarButton } from "./SidebarButton";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { usePathname } from "next/navigation";
import { NCLEXBlueLogo } from "../../assets";
import Image from "next/image";
import { MenuItems } from "../../api/types";

type SideBarPropsType = {
  menu: Array<MenuItems>;
  open: boolean;
  setOpen: () => void;
  variant?: "persistent" | "permanent" | "temporary";
  isMobile?: boolean;
};

export const Sidebar: React.FC<SideBarPropsType> = ({
  menu,
  variant,
  open,
  setOpen,
  isMobile,
}) => {
  const pathname = usePathname();

  return (
    <Drawer
      open={open}
      component="nav"
      variant={isMobile ? "temporary" : variant || "persistent"}
      anchor="left"
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
          boxShadow: 1,
        },
      }}
    >
      <List disablePadding>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderBottom={1}
          borderColor="divider"
          height={70}
        >
          <Image
            style={{ width: 150, marginRight: "15px" }}
            src={NCLEXBlueLogo}
            alt="NCLEXLogo"
          />
          <Box position="absolute" right={5}>
            <IconButton onClick={setOpen}>
              <KeyboardArrowLeftIcon
                sx={{
                  opacity: open ? 1 : 0,
                  transform: !open ? "rotate(-180deg)" : "rotate(0)",
                  transition: "0.2s",
                }}
              />
            </IconButton>
          </Box>
        </Box>
        {menu &&
          menu.length > 0 &&
          menu
            .filter(
              (menus, index, self) =>
                self.findIndex((m) => m.id === menus.id) === index
            )
            .map((navigation, index) => (
              <React.Fragment key={index}>
                {navigation.children && navigation.children.length > 0 ? (
                  <SidebarListButton
                    navigation={navigation}
                    pathname={pathname}
                  />
                ) : (
                  <SidebarButton navigation={navigation} pathname={pathname} />
                )}
              </React.Fragment>
            ))}
      </List>
    </Drawer>
  );
};
