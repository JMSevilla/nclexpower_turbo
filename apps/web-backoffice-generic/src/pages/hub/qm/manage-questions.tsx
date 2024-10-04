import React from "react";
import withAuth from "core-library/core/utils/withAuth";
import { ParseBlocks } from "core-library/system";

const ManageQuestionsMainPage: React.FC = () => {
  return <ParseBlocks blocks="QuestionManagementPageBlock" />;
};

export default withAuth(ManageQuestionsMainPage);
