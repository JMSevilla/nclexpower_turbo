export const FooterLists = [
    {
        title: "Company",
        items: [
            { label: "About Us", path: "/about_us" },
            { label: "Careers", path: "/careers" },
            { label: "Press", path: "/press" },
            { label: "Blog", path: "/blog" },
            { label: "Contact", path: "/contact" },
        ],
    },
    {
        title: "Support",
        items: [
            { label: "Help Center", path: "/help_center" },
            { label: "FAQs", path: "/faqs" },
            { label: "Terms of Service", path: "/terms_of_service" },
            { label: "Privacy Policy", path: "/privacy_policy" },
            { label: "Accessibility", path: "/accessibility" },
        ],
    },
    {
        title: "Follow Us",
        items: [
            { label: "Facebook", path: "/facebook" },
            { label: "Twitter", path: "/twitter" },
            { label: "Instagram", path: "/instagram" },
            { label: "LinkedIn", path: "/linkedin" },
            { label: "YouTube", path: "/youtube" },
        ],
    },
];

export const UnauthorizedHeader = [
    { id: 1, label: "Home" },
    { id: 2, label: "About" },
    { id: 3, label: "Contact Us" },
    { id: 4, label: "Login" },
]

export const AuthorizedHeader = [
    { id: 1, label: "Dashboard" },
    { id: 2, label: "Programs" },
    { id: 3, label: "Inquire" },
    { id: 4, label: "User" },
]

export const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    speed: 3000,
    autoplaySpeed: 8000,
    cssEase: "ease-in-out"
};

export const PackageOption = [
    {
        type: 0,
        shortText: 'PN',
        longText: 'Practical Nurse',
        bgColor: 'bg-green-600',
    },
    {
        type: 1,
        shortText: 'RN',
        longText: 'Registered Nurse',
        bgColor: 'bg-[#1a73e8]',
    },
];

export const pricingOptions = [
    { type: 1 },
    { type: 2 },
];

export const CustomerMenus = (isAuthenticated: boolean) => {

    if (isAuthenticated) {
        return AuthorizedHeader
    } else {
        return UnauthorizedHeader
    }

    return []
};


