import React from "react";
import withAuth from "core-library/core/utils/withAuth";
import { ParseBlocks } from "core-library/system";
const ManageUserPage: React.FC = () => {
  return <ParseBlocks blocks="InternalUsersBlock" />;
};

export default withAuth(ManageUserPage);
