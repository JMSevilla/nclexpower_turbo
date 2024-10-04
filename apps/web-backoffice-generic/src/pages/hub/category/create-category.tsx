import React from "react";
import withAuth from "core-library/core/utils/withAuth";
import { ParseBlocks } from "core-library/system";

const CreateCategoryMainPage: React.FC = () => {
  return <ParseBlocks blocks="CreateCategoryBlock" />;
};

export default withAuth(CreateCategoryMainPage);
