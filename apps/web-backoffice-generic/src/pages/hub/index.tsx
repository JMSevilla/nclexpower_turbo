import React from "react";
import { DashboardCards } from "@/core/constant/DashboardCard";
import { ParseBlocks } from "core-library/system";

interface Props {}

const HubOverview: React.FC<Props> = (props) => {
  return <ParseBlocks blocks="HubOverviewBlock" cards={DashboardCards} />;
};

export default HubOverview;
