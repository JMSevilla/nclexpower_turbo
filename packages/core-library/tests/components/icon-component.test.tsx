import React from "react";
import { render, screen } from "../common";
import { IconComponent } from "../../components/GenericDrawerLayout/utils/icon-component";
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

jest.mock("../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../core/router", () => ({
  useRouter: jest.fn(),
}));

const renderIcon = (iconName: string) => {
  render(<React.Fragment>{IconComponent(iconName)}</React.Fragment>);
};

describe("IconComponent", () => {
  it("should render DashboardIcon when DashboardIcon is passed", () => {
    renderIcon("DashboardIcon");
    const icon = screen.getByTestId("DashboardIcon");
    expect(icon).toBeInTheDocument();
  });

  it("should render FeedIcon when 'FeedIcon' is passed", () => {
    renderIcon("FeedIcon");
    const icon = screen.getByTestId("FeedIcon");
    expect(icon).toBeInTheDocument();
  });

  it("should render PersonIcon when 'PersonIcon' is passed", () => {
    renderIcon("PersonIcon");
    const icon = screen.getByTestId("PersonIcon");
    expect(icon).toBeInTheDocument();
  });

  it("should render QuestionAnswerIcon when 'QuestionManagementIcon' is passed", () => {
    renderIcon("QuestionManagementIcon");
    const icon = screen.getByTestId("QuestionAnswerIcon");
    expect(icon).toBeInTheDocument();
  });

  it("should render ReportIcon when 'ResultsIcon' is passed", () => {
    renderIcon("ResultsIcon");
    const icon = screen.getByTestId("ReportIcon");
    expect(icon).toBeInTheDocument();
  });

  it("should render SettingsIcon when 'SettingsIcon' is passed", () => {
    renderIcon("SettingsIcon");
    const icon = screen.getByTestId("SettingsIcon");
    expect(icon).toBeInTheDocument();
  });
});
