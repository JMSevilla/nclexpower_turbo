import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Box, RadioGroup } from "@mui/material";
import { ContainedRegularQuestionType } from "../../../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/content/simulator/types";
import { ControlledTextField } from "../../../../Textfield/TextField";
import { ControlledRadio, Card } from '../../../../';

type MCQPropsType = {
  questionIndex: number;
};

export const MCQ: React.FC<MCQPropsType> = ({ questionIndex }) => {
  const { setValue, getValues, control, trigger } = useFormContext<ContainedRegularQuestionType>()

  const [checked, setChecked] = useState<number>();

  const handleRadioChange = (val: string) => {
    const selectedAnswer = parseInt(val);
    setChecked(selectedAnswer);
  };

  useEffect(() => {
    const { questionnaires } = getValues()

    if (setValue && checked !== undefined) {
      const updatedAnswers = questionnaires?.[questionIndex]?.answers;
      if (updatedAnswers) {
        updatedAnswers.map((_, index) => {
          setValue(
            `questionnaires.${questionIndex}.answers.${index}.answerKey`,
            index === checked
          );
          trigger(`questionnaires.${questionIndex}.answers.${index}.answerKey`)
        });
      }
    }

    setChecked(undefined)

  }, [checked, questionIndex]);

  return (
    <Card sx={{ width: 1 }} data-testid="mcq-answer">
      <RadioGroup onChange={(value) => handleRadioChange(value.target.value)}>
        <Box
          display="flex"
          flexDirection="column"
          minHeight="200px"
          maxHeight="400px"
          overflow="auto"
          padding={3}
          gap={1}
        >
          {Array.from({ length: 4 }).map((_, index) => (
            <Box key={index} display="flex" flex={1} alignItems="center">
              <ControlledRadio
                control={control}
                value={index}
                key={index}
                name={`questionnaires.${questionIndex}.answers.${index}.answerKey`}
              />
              <Box flex={1}>
                <ControlledTextField
                  name={`questionnaires.${questionIndex}.answers.${index}.answer`}
                  rows={5}
                  sx={{ border: "none", outline: 0 }}
                  placeholder="Enter answer"
                />
              </Box>
            </Box>
          ))}
        </Box>
      </RadioGroup>
    </Card>
  );
}
