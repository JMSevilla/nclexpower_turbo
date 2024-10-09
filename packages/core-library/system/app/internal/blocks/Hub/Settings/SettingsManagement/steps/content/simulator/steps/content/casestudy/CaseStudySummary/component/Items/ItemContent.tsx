import React from "react";
import { Typography } from "@mui/material";
import { QuestionnaireItem } from "../../../../../../../../../../../../../types";
import { Tabs } from "../../../../../../../../../../../../../../../../components";
import { ContainedCaseStudyQuestionType } from "../../../../../../types";
import { Items } from "./items";

interface ItemProps {
  values: Partial<ContainedCaseStudyQuestionType>;
}

export const ItemContent: React.FC<ItemProps> = ({ values }) => {
  const generateTabs = (data: QuestionnaireItem[]) => {
    return data.map((item, index) => {
      const title = `Item ${item.itemNum}`;

      return {
        title,
        id: index + 1,
        content: <Items content={[item]} />,
      };
    });
  };

  const validQuestionnaires =
    values.questionnaires?.filter((item): item is QuestionnaireItem => {
      return (
        item.questionType === "DDC" ||
        item.questionType === "SATA" ||
        item.questionType === "MRSN"
      );
    }) || [];

  return validQuestionnaires.length > 0 ? (
    <Tabs tabsItem={generateTabs(validQuestionnaires)} />
  ) : (
    <Typography>No valid questionnaire data available</Typography>
  );
};
