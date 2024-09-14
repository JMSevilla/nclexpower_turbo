import React from "react";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Box, IconButton, Typography } from "@mui/material";
import {
  Button,
  Card,
  ControlledCheckbox,
  ControlledTextField,
} from "../../../../..";
import { ContainedRegularQuestionType } from "../../../../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/content/simulator/types";
import { useFieldArray, useFormContext } from "react-hook-form";
import { StyledBox } from "../../../content/StyledBox";

type SATAPropsType = {
  questionIndex: number;
};

export const SATA: React.FC<SATAPropsType> = ({ questionIndex }) => {
  const { append: appendAnswer, remove: removeAnswer } =
    useFieldArray<ContainedRegularQuestionType>({
      name: `questionnaires.${questionIndex}.answers`,
    });
  const { getValues } = useFormContext<ContainedRegularQuestionType>();
  const answerFields = getValues(`questionnaires.${questionIndex}.answers`);

  const handleAppendFields = () => {
    appendAnswer({ answer: "", answerKey: false });
  };

  const handleRemoveFields = (index: number) => {
    removeAnswer(index);
  };

  if (!answerFields) return null;

  return (
    <Card sx={{ width: 1 }} data-testid="sata-answer">
      <StyledBox>
        {answerFields.map((answer, index) => (
          <Box
            key={index}
            display="flex"
            width={1}
            flex={1}
            alignItems="center"
          >
            <ControlledCheckbox
              name={`questionnaires.${questionIndex}.answers.${index}.answerKey`}
              sx={{ margin: 0 }}
            />
            <Typography variant="body2" pr={2}>
              {index + 1}.
            </Typography>
            <Box flex={1}>
              <ControlledTextField
                name={`questionnaires.${questionIndex}.answers.${index}.answer`}
                rows={5}
                sx={{ border: "none", outline: 0 }}
                placeholder="Enter answer"
              />
            </Box>
            {index > 4 && (
              <IconButton
                data-testid={`answer-option-remove-${index}`}
                onClick={() => handleRemoveFields(index)}
                color="error"
              >
                <DeleteOutlineIcon />
              </IconButton>
            )}
          </Box>
        ))}
      </StyledBox>
      <Button
        data-testid="answer-option-append"
        sx={{ marginTop: 4 }}
        disabled={answerFields.length >= 8}
        onClick={handleAppendFields}
        className="w-full h-10 flex rounded-md text-sm items-center px-5 bg-[#d7f2f4] border-[#37BEC7] border justify-center text-[#37BEC7] font-semibold hover:bg-[#2a98a0] transition-colors duration-150 hover:text-white disabled:saturate-0"
      >
        <span>
          <AddIcon />
        </span>
        <Typography variant="body2">Add Answer Option</Typography>
      </Button>
    </Card>
  );
};
