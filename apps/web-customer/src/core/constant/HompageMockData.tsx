import { MenuItems } from "core-library/api/types";

export const list = [
    {
        items: [
            { label: "About", path: "/about_us" },
            { label: "Contact", path: "/contact" },
            { label: "Login", path: "/login" },
        ],
    },
    {
        items: [
            { label: "Facebook", path: "/help_center" },
            { label: "Twitter", path: "/faqs" },
            { label: "Instagram", path: "/faqs" },
        ],
    },
];
export const CompanyInfo = {
    address: "1700 Eureka Rd Ste 155 Roseville, California 95661",
    phone: "1-866-800-3030",
    website: "info@nclexpower.com",
};

export const UnauthorizedHeader: MenuItems[] = [
    {
        id: "1",
        label: "Home",
        path: "/",
        icon: "home_icon",
        menuId: "menu1",
        parentId: "",
        children: [],
    },
    {
        id: "2",
        label: "About",
        path: "/about",
        icon: "about_icon",
        menuId: "menu2",
        parentId: "",
        children: [],
    },
    {
        id: "3",
        label: "Contact Us",
        path: "/contact",
        icon: "contact_icon",
        menuId: "menu3",
        parentId: "",
        children: [],
    },
    {
        id: "4",
        label: "Login",
        path: "/login",
        icon: "login_icon",
        menuId: "menu4",
        parentId: "",
        children: [],
    },
];

export const AuthorizedHeader: MenuItems[] = [
    {
        id: '1',
        label: 'Dashboard',
        path: '',
        icon: 'keySquare',
        menuId: 'menu1',
        parentId: '',
        children: [],
    },
    {
        id: '2',
        label: 'Standard (23 days) Program',
        path: '/',
        icon: 'TRDSquare',
        menuId: 'menu2',
        parentId: '',
        children: [
            {
                id: '3',
                label: 'Body Systems',
                path: '/',
                icon: 'DotsIcon',
                menuId: 'menu3',
                parentId: '',
                children: [],
            },
            {
                id: '4',
                label: 'Patient Units',
                path: '/',
                icon: 'DotsIcon',
                menuId: 'menu4',
                parentId: '',
                children: [],
            }
        ],
    },
    {
        id: '5',
        label: 'Test Statistics',
        path: '/',
        icon: 'TRDSquare',
        menuId: 'menu5',
        parentId: '',
        children: [
            {
                id: '6',
                label: 'Body Systems (Daily)',
                path: '/',
                icon: 'DotsIcon',
                menuId: 'menu6',
                parentId: '',
                children: [],
            },
            {
                id: '7',
                label: 'Patient Units (Daily)',
                path: '/',
                icon: 'DotsIcon',
                menuId: 'menu7',
                parentId: '',
                children: [],
            },
            {
                id: '8',
                label: 'End of Section CAT',
                path: '/',
                icon: 'DotsIcon',
                menuId: 'menu8',
                parentId: '',
                children: [],
            },
            {
                id: '9',
                label: 'Final CAT',
                path: '/',
                icon: 'DotsIcon',
                menuId: 'menu9',
                parentId: '',
                children: [],
            },
        ],
    },
    {
        id: '10',
        label: 'Billing Summary',
        path: '/',
        icon: 'TRDSquare',
        menuId: 'menu10',
        parentId: '',
        children: [],
    },
];

export const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    speed: 2000,
    autoplaySpeed: 8000,
    cssEase: "ease-in-out",
};

export const FastTrackList = [
    {
        id: 1,
        label: "Emphasis on patient-units.",
    },
    {
        id: 2,
        label: "Includes content and med cards.",
    },
    {
        id: 3,
        label: "Engaging topic videos.",
    },
    {
        id: 4,
        label: "100% computer adaptive simulator.",
    },
    {
        id: 5,
        label: "Step-by-step guided schedule.",
    },
];
export const StandardList = [
    {
        id: 1,
        label: "Comprehensive review.",
    },
    {
        id: 2,
        label: "Includes content and med cards.",
    },
    {
        id: 3,
        label: "Engaging topic videos.",
    },
    {
        id: 4,
        label: "100% computer adaptive simulator.",
    },
    {
        id: 5,
        label: "Step-by-step guided schedule.",
    },
];

export const CustomerMenus = (isAuthenticated: boolean) => {
    if (isAuthenticated) {
        return AuthorizedHeader;
    } else {
        return UnauthorizedHeader;
    }
};
