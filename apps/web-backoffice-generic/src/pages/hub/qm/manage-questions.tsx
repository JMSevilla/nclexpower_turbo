import React from "react";
import withAuth from "core-library/core/utils/withAuth";
import { QuestionManagementPageBlock } from "@/components/blocks/page";

const ManageQuestionsMainPage: React.FC = () => {
  return <QuestionManagementPageBlock />;
};

export default withAuth(ManageQuestionsMainPage);
