import React, { useEffect, useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { Card } from "../../../../../Card/Card";
import { Box } from "@mui/material";
import { extractValues } from "./extractValues";
import { DDCTable } from "./DDCtable";
import { ContainedCaseStudyQuestionMockType } from "./schema";

type DDCAnswerOptionPropsType = {
  questionIndex: number;
};

export const DDC: React.FC<DDCAnswerOptionPropsType> = ({ questionIndex }) => {
  const { getValues, setValue } =
    useFormContext<ContainedCaseStudyQuestionMockType>();
  const { questionnaires } = useWatch<ContainedCaseStudyQuestionMockType>();

  const extractedValue = useMemo(() => {
    if (!questionnaires) return [];
    const itemStem = questionnaires[questionIndex].itemStem;
    return extractValues(itemStem ?? "");
  }, [questionnaires]);

  useEffect(() => {
    if (extractedValue) {
      extractedValue.map((value, index) => {
        setValue(
          `questionnaires.${questionIndex}.answerOptions.${index}.optionName`,
          value
        );
      });
    }
  }, [extractValues]);

  return (
    <Card>
      <Box gap={2} display="flex" flexDirection="column">
        {extractedValue.length > 0 &&
          extractedValue.map((optionName, index) => (
            <DDCTable
              questionIndex={questionIndex}
              optionName={optionName}
              answerOptionIndex={index}
              key={index}
            />
          ))}
      </Box>
    </Card>
  );
};
