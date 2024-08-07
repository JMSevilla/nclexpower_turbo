import React from "react";
import withAuth from "core-library/core/utils/withAuth";
import { CreateRegularQuestionTypeBlock } from "@/components";

const CreateRegularQuestionType: React.FC = () => {
  return <CreateRegularQuestionTypeBlock />;
};

export default withAuth(CreateRegularQuestionType);
