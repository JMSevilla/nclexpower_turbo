import React from "react";
import {
  Dashboard as DashboardIcon,
  Feed as FeedIcon,
  Person as PersonIcon,
  QuestionAnswer as QuestionAnswerIcon,
  Report as ReportIcon,
  Settings as SettingsIcon,
  Source as SourceIcon,
  AccountCircle as AccountCircleIcon,
} from "@mui/icons-material";
import { NavigationType } from "../../types/navigation";
import { useAuthNavigation } from "../../core/hooks/useAuthNavigation";
import { useMenu } from "./hooks/useMenu";

/**
 * @deprecated menus should be consumed dynamically. This utilization will be deprecated.
 * Effective Date : Today 9/9/2024
 */
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
    label: "Manage Exams",
    icon: <FeedIcon color="primary" fontSize="small" />,
    children: [
      {
        id: 2,
        label: "Question Management",
        path: "/qm/manage-questions",
      },
    ],
  },
  {
    id: 3,
    label: "Category Management",
    icon: <FeedIcon color="primary" fontSize="small" />,
    children: [
      {
        id: 4,
        label: "Create Category",
        path: "/category/create-category",
      },
      {
        id: 5,
        label: "Create Regular Q-Type",
        path: "/category/create-rq-type",
      },
    ],
  },
  {
    id: 4,
    label: "Product Management",
    icon: <FeedIcon color="primary" fontSize="small" />,
    children: [
      {
        id: 5,
        label: "Create/List Product",
        path: "/products/create-product",
      },
      {
        id: 6,
        label: "Create/List Pricing",
        path: "/products/create-pricing",
      },
    ],
  },
  {
    id: 3,
    label: "Content Management",
    icon: <FeedIcon color="primary" fontSize="small" />,
    children: [
      {
        id: 4,
        label: "Content Approval",
        path: "/acam/question-approval",
      },
    ],
  },
  {
    id: 5,
    label: "Results",
    path: "/",
    icon: <SourceIcon color="primary" fontSize="small" />,
  },
  {
    id: 6,
    label: "Manage Users",
    icon: <PersonIcon color="primary" fontSize="small" />,
    children: [
      {
        id: 7,
        label: "Create Internal User",
        path: "/mu/manage-users",
      },
      {
        id: 8,
        label: "Manage Internal User",
        path: "/mu/view-users",
      },
    ],
  },
  {
    id: 9,
    label: "Settings",
    path: "/settings/internal-application-settings",
    icon: <SettingsIcon color="primary" />,
  },

  {
    id: 10,
    label: "Reports",
    path: "/reports/reported-issues",
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
  const { menus } = useMenu();
  if (isAuthenticated) {
    return useAuthNavigation(menus);
  }
  return [];
};
