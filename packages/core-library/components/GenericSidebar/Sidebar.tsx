import React from "react";
import { Drawer, IconButton, Typography } from "@mui/material";
import { Box, List } from "@mui/material";
import { SidebarListButton } from "./SidebarListButton";
import { SidebarButton } from "./SidebarButton";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { usePathname } from "next/navigation";
import { NavigationType } from "../../types/navigation";
import { NCLEXYellowLogo } from "../../assets";
import Image from "next/image";

type SideBarPropsType = {
  menu: NavigationType[];
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
          <Image style={{ width: 170 }} src={NCLEXYellowLogo} alt="NCLEXLogo" />
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
          menu.map((navigation, index) => (
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
