import React, { useEffect, useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import {
  useFieldArray,
  useFormContext,
  useWatch,
} from "react-hook-form";
import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  IconButton,
  RadioGroup,
  Typography,
} from "@mui/material";
import { ContainedRegularQuestionType } from "../../../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/content/simulator/types";
import { Button, Card } from "../../../..";
import { ControlledTextField } from "../../../../Textfield/TextField";
import { ControlledRadio } from '../../../../Radio/Radio';
import { initAnswerValues } from '../../../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/constants/constants';

type MCQPropsType = {
  questionIndex: number;
};

export const MCQ: React.FC<MCQPropsType> = ({ questionIndex }) => {
  const {
    append: appendAnswer,
    remove: removeAnswer,
  } = useFieldArray<ContainedRegularQuestionType>({
    name: `questionnaires.${questionIndex}.answers`,
  });
  const { setValue, getValues, control } = useFormContext<ContainedRegularQuestionType>()

  const [checked, setChecked] = useState<number>();


  const handleRemoveFields = (index: number) => {
    removeAnswer(index);
  };

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
        });
      }
    }

    setChecked(undefined)

  }, [checked, setValue, questionIndex]);

  return (
    <Card sx={{ width: 1 }}>
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
          {Array(4).fill(initAnswerValues).map((_, index) => (
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
              <IconButton
                onClick={() => handleRemoveFields(index)}
                color="error"
              >
              </IconButton>
            </Box>
          ))}
        </Box>
      </RadioGroup>
    </Card>
  );
}
