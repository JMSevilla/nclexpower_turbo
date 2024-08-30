import {
  Box,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { NavigationItemType } from "../../types/global";
import { useRouter } from "../../core";

type SidebarButtonProps = {
  navigation: NavigationItemType;
  pathname: string;
};

export const SidebarButton = ({ navigation, pathname }: SidebarButtonProps) => {
  const router = useRouter();
  const path = router.pathname

  const handleNavigate = () => {
    router.push({
      pathname: navigation.path ?? "/",
    });
  };

  return (
    <Box width="100%" p={1}>
      <Box overflow="hidden" borderRadius={3}>
        <ListItemButton disabled={navigation.path == path} component="a" onClick={handleNavigate}>
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
