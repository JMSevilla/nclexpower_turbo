import React from "react";
import withAuth from "core-library/core/utils/withAuth";
import { SettingsManagementPageBlock } from "@/components";

const InternalApplicationSettings: React.FC = () => {
  return <SettingsManagementPageBlock />;
};

export default withAuth(InternalApplicationSettings);
