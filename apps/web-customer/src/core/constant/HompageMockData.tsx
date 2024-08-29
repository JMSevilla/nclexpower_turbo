export const list = [
    {
        items: [
            { label: "About", path: "/about_us" },
            { label: "Contact", path: "/contact" },
            { label: "Login", path: "/login" },
        ]
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
    address: '1700 Eureka Rd Ste 155 Roseville, California 95661',
    phone: '1-866-800-3030',
    website: 'info@nclexpower.com',
};

export const UnauthorizedHeader = [
    { id: 1, label: "Home", path: "/" },
    { id: 2, label: "About", path: "/about" },
    { id: 3, label: "Contact Us", path: "/contact" },
    { id: 4, label: "Login", path: "/login" },
]

export const AuthorizedHeader = [
    { id: 1, label: "Dashboard", path: "" },
    { id: 2, label: "Programs", path: "/programs" },
    { id: 3, label: "Inquire", path: "/inquire" },
    { id: 4, label: "User", path: "/user" },
]

export const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    speed: 2000,
    autoplaySpeed: 8000,
    cssEase: "ease-in-out"
};

export const FastTrackList = [
    {
        id: 1,
        label: 'Emphasis on patient-units.'
    },
    {
        id: 2,
        label: 'Includes content and med cards.'
    },
    {
        id: 3,
        label: 'Engaging topic videos.'
    },
    {
        id: 4,
        label: '100% computer adaptive simulator.'
    },
    {
        id: 5,
        label: 'Step-by-step guided schedule.'
    },
]
export const StandardList = [
    {
        id: 1,
        label: 'Comprehensive review.'
    },
    {
        id: 2,
        label: 'Includes content and med cards.'
    },
    {
        id: 3,
        label: 'Engaging topic videos.'
    },
    {
        id: 4,
        label: '100% computer adaptive simulator.'
    },
    {
        id: 5,
        label: 'Step-by-step guided schedule.'
    },
]




export const CustomerMenus = (isAuthenticated: boolean) => {

    if (isAuthenticated) {
        return AuthorizedHeader
    } else {
        return UnauthorizedHeader
    }

};