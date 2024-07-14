export const list = [
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
    { id: 1, label: "Home", path: "/" },
    { id: 2, label: "About" },
    { id: 3, label: "Contact Us", path: "/contact" },
    { id: 4, label: "Login", path: "/login" },
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



export const CustomerMenus = (isAuthenticated: boolean) => {

    if (isAuthenticated) {
        return AuthorizedHeader
    } else {
        return UnauthorizedHeader
    }

};