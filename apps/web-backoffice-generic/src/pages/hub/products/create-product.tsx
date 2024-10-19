import React from "react";
import withAuth from "core-library/core/utils/withAuth";
import { ParseBlocks } from "core-library/system";

const CreateProductMainPage: React.FC = () => {
  return <ParseBlocks blocks="CreateProductBlock" />;
};

export default withAuth(CreateProductMainPage);
