import React from "react";
import Image from "next/image";
import {
  Dashboard as DashboardIcon,
  Feed as FeedIcon,
  Person as PersonIcon,
  QuestionAnswer as QuestionAnswerIcon,
  Report as ReportIcon,
  Settings as SettingsIcon,
  Source as SourceIcon,
  AccountCircle as AccountCircleIcon,
  FiberManualRecord,
} from "@mui/icons-material";

import { keySquare, TRDSqaureWhite, TRDSquare } from "../../../assets";

export const IconComponent = (iconName: string, open: boolean): React.ReactNode => {
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
    case "keySquare":
      return <Image src={keySquare} alt="Key-Square Icon" />;
    case "TRDSquare":
      return <Image src={open ? TRDSqaureWhite : TRDSquare} alt="TRD-Square Icon" />;
    case "DotsIcon":
      return <FiberManualRecord sx={{ color: "white", fontSize: "13px" }} />;

    default:
      return <FeedIcon color="primary" fontSize="small" />; // Default icon
  }
};
