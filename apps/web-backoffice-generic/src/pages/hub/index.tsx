import withAuth from "core-library/core/utils/withAuth";
import React from "react";

const HubOverview: React.FC = () => {
  return <h3>Hub Overview</h3>;
};

export default withAuth(HubOverview);
