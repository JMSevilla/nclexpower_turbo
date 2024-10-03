import {
  Box,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useRouter } from "../../core";
import { MenuItems } from "../../api/types";
import { IconComponent } from "../GenericDrawerLayout/utils/icon-component";
import { WebSidebarStylesType } from "../../types/web-sidebar-styles";

export interface SidebarButtonProps extends Partial<WebSidebarStylesType> {
  navigation: MenuItems;
  pathname: string;
  isAuthenticated: boolean;
};

export const SidebarButton: React.FC<SidebarButtonProps> = ({
  navigation,
  pathname,
  listItemIconSx,
  isAuthenticated,
  paddingSx,
  activeSx,
  hoverSx,
}) => {
  const router = useRouter();
  const path = router?.pathname;

  const isActive = navigation.path === path;

  const handleNavigate = () => {
    router.push({
      pathname: navigation.path ?? "/",
    });
  };

  return (
    <Box width="100%" p={1} sx={isAuthenticated ? paddingSx : null}>
      <Box overflow="hidden" borderRadius={3} sx={hoverSx}>
        <ListItemButton
          disabled={navigation.path === path}
          component="a"
          onClick={handleNavigate}
          sx={isAuthenticated && isActive ? activeSx : {}}
        >
          <ListItemIcon sx={isAuthenticated ? listItemIconSx : null} >
            {IconComponent(navigation.icon, false)}
          </ListItemIcon>
          <ListItemText>
            <Typography variant="body2" fontSize={13} >
              {navigation.label}
            </Typography>
          </ListItemText>
        </ListItemButton>
      </Box>
    </Box>
  );
};