import {
  Box,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
// import { useRouter } from "next/router";

import { NavigationItemType } from "../../types/global";
import { config } from "../../config";
import { useAuthContext } from '../../contexts';
import { useRouter } from '../../core';

type SidebarButtonProps = {
  navigation: NavigationItemType;
  pathname: string;
};

type FullPathType = string | undefined | any

export const SidebarButton = ({ navigation, pathname }: SidebarButtonProps) => {
  const router = useRouter();
  const { isAuthenticated } = useAuthContext()

  const handleNavigate = () => {
    const fullPath: FullPathType = isAuthenticated
      ? `${config.value.BASEHUB}${navigation.path}`
      : navigation.path;
    router.push({
      pathname: fullPath,
    });
  };

  return (
    <Box width="100%" p={1}>
      <Box overflow="hidden" borderRadius={3}>
        <ListItemButton component="a" onClick={handleNavigate}>
          <ListItemIcon> {navigation.icon && navigation.icon}</ListItemIcon>
          <ListItemText>
            <Typography variant="body2" fontSize={13}>
              {navigation.label}
            </Typography>
          </ListItemText>
        </ListItemButton>
      </Box>
    </Box>
  );
};
