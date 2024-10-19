import React from "react";
import withAuth from "core-library/core/utils/withAuth";
import { ParseBlocks } from "core-library/system";

const CreateRegularQuestionType: React.FC = () => {
  return <ParseBlocks blocks="CreateRegularQuestionTypeBlock" />;
};

export default withAuth(CreateRegularQuestionType);
