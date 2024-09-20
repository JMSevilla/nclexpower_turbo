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

export const IconComponent = (iconName: string): React.ReactNode => {
  switch (iconName) {
    case "DashboardIcon":
      return <DashboardIcon color="primary" fontSize="small" />;
    case "FeedIcon":
      return <FeedIcon color="primary" fontSize="small" />;
    case "PersonIcon":
      return <PersonIcon color="primary" fontSize="small" />;
    case "QuestionManagementIcon":
      return <QuestionAnswerIcon color="primary" fontSize="small" />;
    case "ResultsIcon":
      return <ReportIcon color="primary" fontSize="small" />;
    case "SettingsIcon":
      return <SettingsIcon color="primary" fontSize="small" />;
    case "SourceIcon":
      return <SourceIcon color="primary" fontSize="small" />;
    case "ApprovalIcon":
      return <AccountCircleIcon color="primary" fontSize="small" />;
    default:
      return <FeedIcon color="primary" fontSize="small" />; // Default icon
  }
};
