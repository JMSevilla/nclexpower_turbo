import { Button, Card, ControlledCheckbox } from "core-library/components";
import { ControlledTextField } from "core-library/components/Textfield/TextField";
import React from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import { useFieldArray } from "react-hook-form";
import AddIcon from "@mui/icons-material/Add";
import { ContainedRegularQuestionType, RegularQuestionsFormType } from "@/components/blocks/page/SettingsManagement/steps/content/simulator/types";
import { IconButton } from "@mui/material";

type SATAPropsType = {
  questionIndex: number
};

export const SATA: React.FC<SATAPropsType> = ({ questionIndex }) => {
  const {
    append: appendAnswer,
    fields: answerFields,
    remove: removeAnswer,
  } = useFieldArray<ContainedRegularQuestionType>({ name: `questionnaires.${questionIndex}.answers` });

  const handleAppendFields = () => {
    appendAnswer({ answer: "", answerKey: false });
  };

  const handleRemoveFields = (index: number) => {
    removeAnswer(index);
  };

  return (
    <Card>
      <div className="w-full h-[200px]  rounded-md p-2 flex flex-col gap-2 overflow-y-auto">
        {answerFields.map((answer, index) => (
          <div
            className="w-full flex rounded-md   text-sm items-center px-5 bg-[#d7f2f4] border-[#37BEC7] border justify-between"
            key={index}
          >
            <ControlledCheckbox
              name={`questionnaires.${questionIndex}.answers.${index}.answerKey`}
              sx={{ margin: 0 }}
            />
            <div className="w-full flex-1 p-2">
              <ControlledTextField
                name={`questionnaires.${questionIndex}.answers.${index}.answer`}
                className=" flex-1  border-none outline-none  placeholder:text-sm  w-full"
                rows={5}
                sx={{ border: "none", outline: 0 }}
                placeholder="Enter answer"
              />
            </div>

            <IconButton
              onClick={() => handleRemoveFields(index)}
              className="text-red-500"
            >
              <DeleteOutlineIcon />
            </IconButton>
          </div>
        ))}

        <Button
          onClick={handleAppendFields}
          className="w-full h-10 flex rounded-md text-sm items-center px-5 bg-[#d7f2f4] border-[#37BEC7] border justify-center text-[#37BEC7] font-semibold hover:bg-[#2a98a0] transition-colors duration-150 hover:text-white disabled:saturate-0"
        >
          <span>
            <AddIcon />
          </span>
          <p>Add Answer Option</p>
        </Button>
      </div>
    </Card>
  );
};
