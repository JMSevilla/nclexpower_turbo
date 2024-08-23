import React from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import { useFieldArray } from "react-hook-form";
import AddIcon from "@mui/icons-material/Add";
import { Box, IconButton, Typography } from "@mui/material";
import { ContainedRegularQuestionType } from "../../../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/content/simulator/types";
import { Button, Card, ControlledCheckbox } from "../../../..";
import { ControlledTextField } from "../../../../Textfield/TextField";

type SATAPropsType = {
  questionIndex: number;
};

export const SATA: React.FC<SATAPropsType> = ({ questionIndex }) => {
  const {
    append: appendAnswer,
    fields: answerFields,
    remove: removeAnswer,
  } = useFieldArray<ContainedRegularQuestionType>({
    name: `questionnaires.${questionIndex}.answers`,
  });

  const handleAppendFields = () => {
    appendAnswer({ answer: "", answerKey: false });
  };

  const handleRemoveFields = (index: number) => {
    removeAnswer(index);
  };

  return (
    <Card sx={{ width: 1 }}>
      <Box
        display="flex"
        flexDirection="column"
        minHeight="200px"
        maxHeight="400px"
        overflow="auto"
        gap={1}
      >
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
            <Box flex={1}>
              <ControlledTextField
                name={`questionnaires.${questionIndex}.answers.${index}.answer`}
                rows={5}
                sx={{ border: "none", outline: 0 }}
                placeholder="Enter answer"
              />
            </Box>

            <IconButton onClick={() => handleRemoveFields(index)} color="error">
              <DeleteOutlineIcon />
            </IconButton>
          </Box>
        ))}

        <Button
          onClick={handleAppendFields}
          className="w-full h-10 flex rounded-md text-sm items-center px-5 bg-[#d7f2f4] border-[#37BEC7] border justify-center text-[#37BEC7] font-semibold hover:bg-[#2a98a0] transition-colors duration-150 hover:text-white disabled:saturate-0"
        >
          <span>
            <AddIcon />
          </span>
          <Typography variant="body2">Add Answer Option</Typography>
        </Button>
      </Box>
    </Card>
  );
};
