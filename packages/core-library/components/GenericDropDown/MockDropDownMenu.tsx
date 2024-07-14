import {
    AccountCircle as AccountCircleIcon,
    Logout as LogoutIcon
} from "@mui/icons-material";
import { NavigationType } from '../../types/navigation';

export const DropDownMenu: NavigationType[] = [
    {
        id: 1,
        label: "Logout",
        icon: <LogoutIcon fontSize="small" />,
    },
]

