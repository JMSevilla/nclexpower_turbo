import React from "react";
import withAuth from "core-library/core/utils/withAuth";
import { ParseBlocks } from "core-library/system";

const CreatePricingMainPage: React.FC = () => {
  return <ParseBlocks blocks="CreatePricingBlock" />;
};

export default withAuth(CreatePricingMainPage);
