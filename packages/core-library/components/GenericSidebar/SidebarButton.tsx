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

type SidebarButtonProps = {
  navigation: MenuItems;
  pathname: string;
};

export const SidebarButton = ({ navigation, pathname }: SidebarButtonProps) => {
  const router = useRouter();
  const path = router?.pathname;

  const handleNavigate = () => {
    router.push({
      pathname: navigation.path ?? "/",
    });
  };

  return (
    <Box width="100%" p={1}>
      <Box overflow="hidden" borderRadius={3}>
        <ListItemButton
          disabled={navigation.path == path}
          component="a"
          onClick={handleNavigate}
        >
          <ListItemIcon> {IconComponent(navigation.icon)}</ListItemIcon>
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
