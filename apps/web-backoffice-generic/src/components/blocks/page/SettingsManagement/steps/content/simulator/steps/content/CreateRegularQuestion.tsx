import {
  ContainedRegularQuestionType,
} from "@/components/blocks/page/SettingsManagement/steps/content/simulator/types";
import {
  Button,
  Card,
  MultipleSelectField,
} from "core-library/components";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import React, { useEffect, useState } from "react";
import { Pagination } from "@mui/material";
import { useBusinessQueryContext } from "core-library/contexts";
import { FormProvider } from "react-hook-form";
import { ControlledRichTextEditor } from "@/components/RichTextEditor/RichTextEditor";
import { AnswerOptions } from "@/components/AnswerOptions/AnswerOptions";
import { useRegularQuestionForm } from "@/components/blocks/page/SettingsManagement/steps/content/simulator/steps/content/useRegularQuestionForm";
import { initQuestionsValues } from "@/core/constant/initQuestionsValues";

interface Props {
  nextStep(values: Partial<ContainedRegularQuestionType>): void;
  previousStep(): void;
  values: Partial<ContainedRegularQuestionType>;
  next: () => void;
}

export const CreateRegularQuestion: React.FC<Props> = ({
  nextStep,
  previousStep,
  values,
  next,
}) => {
  const [selectedPageIndex, setSelectedPageIndex] = useState<number>(1);
  const [isCurrentPage, setIsCurrentPage] = useState(false);
  const {
    appendQuestionnaire,
    parentForm,
    parentFormState,
    questionnaireFields,
    removeQuestionnaire,
    updateQuestionnaire,
  } = useRegularQuestionForm(values);

  const { isValid } = parentFormState;

  const { handleSubmit: confirmCreation, control, getValues, setValue } = parentForm;

  const { businessQueryGetRegularQuestionDDCategory } =
    useBusinessQueryContext();
  const { data: ClientNeeds } = businessQueryGetRegularQuestionDDCategory(
    ["getClientNeeds"],
    2
  );
  const { data: ContentArea } = businessQueryGetRegularQuestionDDCategory(
    ["getContentArea"],
    3
  );
  const { data: CognitiveLevel } = businessQueryGetRegularQuestionDDCategory(
    ["getCognitiveLevel"],
    4
  );

  const updateValues = (nextPageIndex?: number) => {
    const questionIndex = nextPageIndex ?? selectedPageIndex - 1
    const questionnaire = getValues(`questionnaires.${questionIndex}`);

    if (questionnaire) {
      setValue(`questionnaires.${questionIndex}`, questionnaire)
      setValue(`questionnaires.${questionIndex}.question`, questionnaire.question)
      setValue(`questionnaires.${questionIndex}.answers`, questionnaire.answers)
    }
  };

  const handlePaginate = (event: React.ChangeEvent<unknown>, page: number) => {
    setSelectedPageIndex(page);
  };

  const handleAddForm = () => {
    if (isCurrentPage) {
      updateQuestionnaire(selectedPageIndex - 1, getValues(`questionnaires.${selectedPageIndex - 1}`));
      return;
    }

    appendQuestionnaire({ ...initQuestionsValues });
    setSelectedPageIndex(prev => prev + 1)

  };

  const handleRemove = () => {
    removeQuestionnaire(selectedPageIndex - 1);
    updateValues(selectedPageIndex);
  };

  const handleContinue = (values: ContainedRegularQuestionType) => {
    if (isValid) {
      nextStep({ ...values });
    }
  };

  useEffect(() => {
    updateValues();
    const isCurrentQuestionnaire = questionnaireFields.length !== 0 && selectedPageIndex !== questionnaireFields.length;
    setIsCurrentPage(isCurrentQuestionnaire);
  }, [selectedPageIndex]);

  return (
    <div className="flex flex-col items-center p-5 gap-y-10">
      <div className="flex w-full">
        <Button
          onClick={previousStep}
          className="flex items-center justify-center bg-transparent shadow-none text-black hover:bg-transparent hover:shadow-none hover:scale-105 transition-all duration-150"
        >
          <TrendingFlatIcon sx={{ rotate: "180deg", color: "#37BEC7" }} />
          <p className="underline">Go Back</p>
        </Button>
        <p className="text-center font-bold pl-[30%]">
          Create regular question <br /> ({values.type})
        </p>
      </div>
      <FormProvider {...parentForm}>
        <div className="w-full h-full flex flex-col shadow-md border border-slate-300 rounded-lg p-10">
          <div className="h-fit w-full flex justify-end text-xs gap-2">
            <Button
              onClick={handleRemove}
              sx={{ minWidth: "none" }}
              className="bg-red-700 items-center w-fit text-xs py-2 flex text-white font-semibold rounded-xl  hover:bg-red-800 disabled:saturate-0"
            >
              <span>
                <DeleteOutlineIcon />
              </span>
              <p>Delete Form</p>
            </Button>
            <Button
              disabled={!isValid}
              onClick={handleAddForm}
              className="bg-[#37BEC7] items-center py-2 text-xs text-white font-semibold rounded-xl leading-3 hover:bg-[#2a98a0] disabled:saturate-0"
            >
              <span>
                <AddIcon />
              </span>
              <p>{!isCurrentPage ? "Add Form" : "Update Form"}</p>
            </Button>
          </div>
          <div className="w-full flex gap-10">
            <div className="w-1/3 h-full flex flex-col gap-5  ">
              <MultipleSelectField
                control={control}
                sx={{ width: "100%", mb: 2 }}
                name={`questionnaires.${selectedPageIndex - 1}.clientNeeds`}
                label="Client Needs Category :"
                options={ClientNeeds ?? []}
                variant="standard"
              />
              <MultipleSelectField
                control={control}
                sx={{ width: "100%", mb: 2 }}
                name={`questionnaires.${selectedPageIndex - 1}.contentArea`}
                label="Content Area :"
                options={ContentArea ?? []}
                variant="standard"
              />
              <MultipleSelectField
                variant="standard"
                control={control}
                sx={{ width: "100%", mb: 2 }}
                name={`questionnaires.${selectedPageIndex - 1}.cognitiveLevel`}
                label="Cognitive Level :"
                options={CognitiveLevel ?? []}
              />
            </div>
            <div className="w-2/3 h-full flex flex-col gap-5 items-end  py-5">
              <div className="w-full rounded-md">
                <p className="text-md font-semibold">Question :</p>
                <Card>
                  <ControlledRichTextEditor
                    control={control}
                    editorClassName="max-h-[200px] overflow-auto"
                    editorFor="questions"
                    name={`questionnaires.${selectedPageIndex - 1}.question`}
                  />
                </Card>
              </div>
              <div className="w-full">
                <p className="text-md font-semibold">Answer Options :</p>
                <div>
                  <AnswerOptions
                    questionIndex={selectedPageIndex - 1}
                    questionType="regularQuestion"
                    questionnaireType="SATA"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </FormProvider>
      <div className="w-full flex">
        <div className="w-1/2 flex justify-start">
          <Pagination
            count={questionnaireFields.length}
            onChange={handlePaginate}
            page={selectedPageIndex}
            variant="outlined"
            shape="rounded"
            showFirstButton
            showLastButton
          />
        </div>
        <div className="w-1/2 flex justify-end">
          <Button
            onClick={confirmCreation(handleContinue)}
            disabled={!isValid}
            className="bg-[#37BEC7] hover:bg-[#2a98a0] py-5 w-44 text-sm text-white font-semibold rounded-xl leading-3 transition-colors duration-150"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};
