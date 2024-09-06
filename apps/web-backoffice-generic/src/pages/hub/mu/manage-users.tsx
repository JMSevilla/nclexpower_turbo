import React from "react";
import withAuth from "core-library/core/utils/withAuth";
import InternalUsersBlock from "@/components/blocks/internal-users/InternalUsersBlock";

const ManageUserPage: React.FC = () => {
  return <InternalUsersBlock />;
};

export default withAuth(ManageUserPage);
