import {
  Box,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { NavigationType } from "../../types/navigation";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Divider } from "@mui/material";
import { SidebarButton } from "./SidebarButton";

type SidebarListButtonProps = {
  navigation: NavigationType;
  pathname: string;
};

export const SidebarListButton = ({
  navigation,
  pathname,
}: SidebarListButtonProps) => {
  const [open, setOpen] = useState<boolean>(true);

  const handleCollapseButton = () => {
    setOpen((prev) => !prev);
  };

  return (
    <Box width="100%">
      <Box padding={1}>
        <Box overflow="hidden" borderRadius={3}>
          <ListItemButton onClick={handleCollapseButton}>
            <ListItemIcon> {navigation.icon && navigation.icon}</ListItemIcon>
            <ListItemText>
              <Typography variant="body2" fontWeight={600} fontSize={13}>
                {navigation.label}
              </Typography>
            </ListItemText>
            <KeyboardArrowDownIcon
              fontSize="small"
              sx={{
                mr: -1,
                opacity: open ? 1 : 0,
                transform: open ? "rotate(-180deg)" : "rotate(0)",
                transition: "0.2s",
              }}
            />
          </ListItemButton>
        </Box>
      </Box>
      {open && navigation.children
        ? navigation.children.length > 0 &&
          navigation.children?.map((childNav, index) => (
            <SidebarButton
              navigation={childNav}
              key={index}
              pathname={pathname}
            />
          ))
        : null}
      <Divider />
    </Box>
  );
};
