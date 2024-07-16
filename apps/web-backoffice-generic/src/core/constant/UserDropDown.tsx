import {
    AccountCircle,
    Payment
} from "@mui/icons-material";
import { NavigationItemType } from 'core-library/types/global';

interface AccountMenuType {
    id: number,
    label: string,
    icon: React.ReactNode,
    subItem: NavigationItemType[]
}

export const AccountMenuItem
    : AccountMenuType[] = [
        {
            id: 1,
            label: "User Info",
            icon: <AccountCircle fontSize="small" />,
            subItem: [
                {
                    id: 1,
                    label: "View Plan",
                    icon: <Payment fontSize="small" />,
                }
            ]
        },
    ]

