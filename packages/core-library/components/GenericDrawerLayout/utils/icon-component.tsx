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
  DeleteOutline as DeleteOutlineIcon,
  FiberManualRecord,
} from "@mui/icons-material";

import { keySquare, TRDSqaureWhite, TRDSquare } from "../../../assets";

export const IconComponent = (
  iconName: string,
  open?: boolean
): React.ReactNode => {
  switch (iconName) {
    case "DashboardIcon":
      return <DashboardIcon color="primary" fontSize="small" />;
    case "FeedIcon":
      return <FeedIcon color="primary" fontSize="small" />;
    case "PersonIcon":
      return <PersonIcon color="primary" fontSize="small" />;
    case "QuestionManagementIcon":
      return (
        <QuestionAnswerIcon
          color="primary"
          fontSize="small"
          data-testid="QuestionManagementIcon"
        />
      );
    case "ResultsIcon":
      return (
        <ReportIcon
          color="primary"
          fontSize="small"
          data-testid="ResultsIcon"
        />
      );
    case "SettingsIcon":
      return <SettingsIcon color="primary" fontSize="small" />;
    case "SourceIcon":
      return <SourceIcon color="primary" fontSize="small" />;
    case "ApprovalIcon":
      return (
        <AccountCircleIcon
          color="primary"
          fontSize="small"
          data-testid="ApprovalIcon"
        />
      );
    case "DeleteIcon":
      return (
        <DeleteOutlineIcon
          color="primary"
          fontSize="small"
          data-testid="DeleteIcon"
        />
      );
    case "keySquare":
      return (
        <Image src={keySquare} alt="Key-Square Icon" data-testid="keySquare" />
      );
    case "TRDSquare":
      return (
        <Image
          src={open ? TRDSqaureWhite : TRDSquare}
          alt="TRD-Square Icon"
          data-testid="TRDSquare"
        />
      );
    case "DotsIcon":
      return (
        <FiberManualRecord
          sx={{ color: "white", fontSize: "13px" }}
          data-testid="DotsIcon"
        />
      );

    default:
      return <FeedIcon color="primary" fontSize="small" />; // Default icon
  }
};

export const IconList = [
  {
    label: "DashboardIcon",
    icon: DashboardIcon,
  },
  {
    label: "FeedIcon",
    icon: FeedIcon,
  },
  {
    label: "PersonIcon",
    icon: PersonIcon,
  },
  {
    label: "QuestionManagementIcon",
    icon: QuestionAnswerIcon,
  },
  {
    label: "ResultsIcon",
    icon: ReportIcon,
  },
  {
    label: "SettingsIcon",
    icon: SettingsIcon,
  },
  {
    label: "SourceIcon",
    icon: SourceIcon,
  },
  {
    label: "AccountCircleIcon",
    icon: AccountCircleIcon,
  },
  {
    label: "DeleteOutlineIcon",
    icon: DeleteOutlineIcon,
  },
  {
    label: "keySquare",
    icon: (
      <Image src={keySquare} alt="Key-Square Icon" data-testid="keySquare" />
    ),
  },
  {
    label: "TRDSquare",
    icon: (
      <Image
        src={TRDSqaureWhite}
        alt="TRD-Square Icon"
        data-testid="TRDSquare"
      />
    ),
  },
  {
    label: "FiberManualRecord",
    icon: FiberManualRecord,
  },
];
