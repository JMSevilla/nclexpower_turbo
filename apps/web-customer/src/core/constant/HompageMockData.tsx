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
    id: "1",
    label: "Dashboard",
    path: "",
    icon: "dashboard_icon",
    menuId: "menu1",
    parentId: "",
    children: [],
  },
  {
    id: "2",
    label: "Programs",
    path: "/hub/programs",
    icon: "programs_icon",
    menuId: "menu2",
    parentId: "",
    children: [],
  },
  {
    id: "3",
    label: "Inquire",
    path: "/hub/inquire",
    icon: "inquire_icon",
    menuId: "menu3",
    parentId: "",
    children: [],
  },
  {
    id: "4",
    label: "User",
    path: "/hub/user",
    icon: "user_icon",
    menuId: "menu4",
    parentId: "",
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
