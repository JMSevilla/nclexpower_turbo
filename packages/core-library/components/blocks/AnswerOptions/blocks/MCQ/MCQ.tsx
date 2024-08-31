import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Box, RadioGroup } from "@mui/material";
import { ContainedRegularQuestionType } from "../../../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/content/simulator/types";
import { ControlledTextField } from "../../../../Textfield/TextField";
import { ControlledRadio, Card } from '../../../../';
import { StyledBox } from '../../content/StyledBox';

type MCQPropsType = {
  questionIndex: number;
};

export const MCQ: React.FC<MCQPropsType> = ({ questionIndex }) => {
  const { setValue, getValues, control, trigger } = useFormContext<ContainedRegularQuestionType>()
  const [checked, setChecked] = useState<number>();
  const NUMBER_OF_OPTIONS = 4

  const handleRadioChange = (val: string) => {
    const selectedAnswer = parseInt(val);
    setChecked(selectedAnswer);
  };

  useEffect(() => {
    if (checked === undefined) return
    const { questionnaires } = getValues()
    const updatedAnswers = questionnaires?.[questionIndex]?.answers;

    if (updatedAnswers) {
      updatedAnswers.map((_, index) => {
        const isChecked = index === checked
        setValue(
          `questionnaires.${questionIndex}.answers.${index}.answerKey`,
          isChecked
        );
        trigger(`questionnaires.${questionIndex}.answers.${index}.answerKey`)
      });
    }

    setChecked(undefined)

  }, [checked, questionIndex, setValue, trigger, getValues, setChecked]);

  return (
    <Card sx={{ width: 1 }} data-testid="mcq-answer">
      <RadioGroup onChange={(value) => handleRadioChange(value.target.value)}>
        <StyledBox>
          {Array.from({ length: NUMBER_OF_OPTIONS }).map((_, index) => (
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
        </StyledBox>
      </RadioGroup>
    </Card>
  );
}

