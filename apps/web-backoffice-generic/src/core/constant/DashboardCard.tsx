
import { Person, AccountBox, PersonSearch, ContactPage } from '@mui/icons-material';

interface DashboardCardType {
    id: number,
    label: string,
    icon: React.ReactNode,
    bgColor: string,
    textColor: string,
    title: string,
    cardValue: string,
}

export const DashboardCards: DashboardCardType[] = [
    {
        id: 1,
        label: "Total Users",
        icon: <Person />,
        bgColor: "#e3f2fd",
        textColor: "#80c3f7",
        title: "Total Users",
        cardValue: "60,892"
    },
    {
        id: 2,
        label: "PN Subscriber",
        icon: <AccountBox />,
        bgColor: "#dbf5e1",
        textColor: "#6cc283",
        title: "PN Subscriber",
        cardValue: "30,192"
    },
    {
        id: 3,
        label: "RN Subscriber",
        icon: <PersonSearch />,
        bgColor: "#faf1d6",
        textColor: "#e0c267",
        title: "RN Subscriber",
        cardValue: "30,700"
    },
    {
        id: 4,
        label: "Subscriber This Month",
        icon: <ContactPage />,
        bgColor: "#e7e8f2",
        textColor: "#8486bc",
        title: "Subscriber This Month",
        cardValue: "20,892"
    }
];
