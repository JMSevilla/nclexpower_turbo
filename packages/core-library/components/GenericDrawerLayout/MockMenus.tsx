import React from "react";
import {
  Dashboard as DashboardIcon,
  Feed as FeedIcon,
  Person as PersonIcon,
  QuestionAnswer as QuestionAnswerIcon,
  Report as ReportIcon,
  Settings as SettingsIcon,
  Source as SourceIcon,
} from "@mui/icons-material";

import { NavigationType } from "../../types/navigation";

const AuthenticatedMenu: NavigationType[] = [
  {
    id: 1,
    label: "Dashboard",
    icon: <DashboardIcon color="primary" fontSize="small" />,
    children: [
      {
        id: 1,
        label: "Performance",
        path: "/",
      },
    ],
  },
  {
    id: 2,
    label: "Questionnaires",
    icon: <QuestionAnswerIcon color="primary" fontSize="small" />,
    children: [
      {
        id: 2,
        label: "Case Study",
        path: "/",
      },
      {
        id: 3,
        label: "Regular",
        path: "/",
      },
    ],
  },
  {
    id: 3,
    label: "Manage Exams",
    icon: <FeedIcon color="primary" fontSize="small" />,
    children: [
      {
        id: 4,
        label: "Create Exams",
        path: "/create",
      },
      {
        id: 5,
        label: "Manage Exams",
        path: "/",
      },
    ],
  },
  {
    id: 4,
    label: "Category Management",
    icon: <FeedIcon color="primary" fontSize="small" />,
    children: [
      {
        id: 6,
        label: "Create Category",
        path: "/category/create-category",
      },
    ],
  },
  {
    id: 5,
    label: "Product Management",
    icon: <FeedIcon color="primary" fontSize="small" />,
    children: [
      {
        id: 7,
        label: "Create/List Product",
        path: "/products/create-product",
      },
      {
        id: 8,
        label: "Create/List Pricing",
        path: "/products/create-pricing",
      },
    ],
  },
  {
    id: 6,
    label: "Results",
    path: "/",
    icon: <SourceIcon color="primary" fontSize="small" />,
  },
  {
    id: 7,
    label: "Manage Users",
    path: "/",
    icon: <PersonIcon color="primary" fontSize="small" />,
  },
  {
    id: 8,
    label: "Settings",
    path: "/",
    icon: <SettingsIcon color="primary" />,
  },

  {
    id: 9,
    label: "Reports",
    path: "/",
    icon: <ReportIcon color="primary" />,
  },
];

const UnauthencatedMenu: NavigationType[] = [
  {
    id: 1,
    label: "Home",
    path: "/home",
  },
  {
    id: 2,
    label: "About Us",
    path: "/about-us",
  },
  {
    id: 3,
    label: "Contact Us",
    path: "/contact-us",
  },
  {
    id: 4,
    label: "Login",
    path: "/login",
  },
];

export const mockMenus = (isAuthenticated: boolean) => {
  if (isAuthenticated) {
    return AuthenticatedMenu;
  }

  return [];
};
