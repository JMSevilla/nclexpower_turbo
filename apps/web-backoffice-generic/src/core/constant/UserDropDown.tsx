import { Logout as LogoutIcon } from "@mui/icons-material";
import { NavigationType } from 'core-library/types/navigation';

export const DropDownMenu: NavigationType[] = [
    {
        id: 1,
        label: "Logout",
        icon: <LogoutIcon fontSize="small" />,
        onClick: () => { console.log("Logout Clicked") }

    },
]

