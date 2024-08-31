import { Button, Card, MultipleSelectField } from "core-library/components";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import { useAtom, atom } from "jotai";
import React, { useEffect, useMemo, useState } from "react";
import { Box, Pagination, Typography } from "@mui/material";
import { useBusinessQueryContext } from "core-library/contexts";
import { FormProvider } from "react-hook-form";
import { ContainedRegularQuestionType } from "../../types";
import {
  ControlledRichTextEditor,
  AnswerOptions,
} from "core-library/components";
import { CreateRegularAtom } from "../../useAtomic";
import { useRegularQuestionForm } from "./hooks/useRegularQuestionForm";
import { initQuestionsValues } from "../../../../../constants/constants";

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
  const [questionnaireAtom, setQuestionnireAtom] = useAtom(CreateRegularAtom);
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

  const selectedPageToIndex = useMemo(
    () => Math.max(0, selectedPageIndex - 1),
    [selectedPageIndex]
  );

  const { isValid } = parentFormState;

  const {
    handleSubmit: confirmCreation,
    control,
    getValues,
    setValue,
  } = parentForm;

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

  const updateValues = () => {
    const questionIndex = selectedPageToIndex;
    const questionnaire = getValues(`questionnaires.${questionIndex}`);

    if (questionnaire) {
      setValue(`questionnaires.${questionIndex}`, questionnaire);
      setValue(
        `questionnaires.${questionIndex}.question`,
        questionnaire.question
      );

      setValue(
        `questionnaires.${questionIndex}.answers`,
        questionnaire.answers
      );
    }
  };

  const handlePaginate = (event: React.ChangeEvent<unknown>, page: number) => {
    setSelectedPageIndex(page);
  };

  const handleAddForm = () => {
    if (isCurrentPage) {
      updateQuestionnaire(
        selectedPageToIndex,
        getValues(`questionnaires.${selectedPageToIndex}`)
      );
      return;
    }

    appendQuestionnaire({ ...initQuestionsValues(values.type) });
    setSelectedPageIndex((prev) => prev + 1);
  };

  const handleRemove = () => {
    removeQuestionnaire(selectedPageToIndex);
    updateValues();
    setSelectedPageIndex(selectedPageToIndex);
  };

  const handleContinue = (values: ContainedRegularQuestionType) => {
    setQuestionnireAtom(values);
    if (isValid) {
      nextStep({ ...values });
    }
  };

  useEffect(() => {
    updateValues();
    const isCurrentQuestionnaire =
      questionnaireFields.length !== 0 &&
      selectedPageIndex !== questionnaireFields.length;
    setIsCurrentPage(isCurrentQuestionnaire);
  }, [selectedPageIndex]);

  return (
    <Box padding={4}>
      <Box
        display="flex"
        justifyContent={"space-between"}
        alignItems={"center"}
        width={1}
        pb={3}
        position="relative"
      >
        <Button onClick={previousStep} sx={{ zIndex: 2 }}>
          <TrendingFlatIcon sx={{ rotate: "180deg", color: "#37BEC7" }} />
          <Typography>Go Back</Typography>
        </Button>
        <Box sx={{ position: "absolute", zIndex: 1 }} width={1}>
          <Typography variant="body2" fontWeight={600} textAlign="center">
            Create regular question <br /> ({values.type})
          </Typography>
        </Box>

        <Box>
          <Typography variant="body2" fontWeight={600} textAlign="center">
            Question no. {selectedPageIndex ?? questionnaireFields.length}
          </Typography>
        </Box>
      </Box>

      <FormProvider {...parentForm}>
        <Box
          width={1}
          height={1}
          boxShadow={1}
          flexDirection={"column"}
          borderRadius={2}
          p={4}
          className="w-full h-full flex flex-col shadow-md border border-slate-300 rounded-lg p-10"
        >
          <Box display="flex" justifyContent="flex-end" width="100%" gap={2}>
            <Button
              onClick={handleRemove}
              sx={{ minWidth: "none" }}
              disabled={questionnaireFields.length === 1}
            >
              <DeleteOutlineIcon />
              <Typography variant="body2">Delete Form</Typography>
            </Button>
            <Button
              disabled={!isCurrentPage && !isValid}
              onClick={handleAddForm}
            >
              <AddIcon />
              <Typography variant="body2">
                {!isCurrentPage ? "Add Form" : "Update Form"}
              </Typography>
            </Button>
          </Box>
          <Box width="100%" display="flex" gap={4}>
            <Box flex={1} display="flex" flexDirection="column">
              <MultipleSelectField
                control={control}
                sx={{ width: "100%", mb: 2 }}
                name={`questionnaires.${selectedPageToIndex}.clientNeeds`}
                label="Client Needs Category :"
                options={ClientNeeds ?? []}
                variant="standard"
              />
              <MultipleSelectField
                control={control}
                sx={{ width: "100%", mb: 2 }}
                name={`questionnaires.${selectedPageToIndex}.contentArea`}
                label="Content Area :"
                options={ContentArea ?? []}
                variant="standard"
              />
              <MultipleSelectField
                variant="standard"
                control={control}
                sx={{ width: "100%", mb: 2 }}
                name={`questionnaires.${selectedPageToIndex}.cognitiveLevel`}
                label="Cognitive Level :"
                options={CognitiveLevel ?? []}
              />
            </Box>
            <Box flex={2} display="flex" flexDirection="column" gap={4}>
              <Box>
                <Typography variant="body2">Question :</Typography>
                <Card>
                  <ControlledRichTextEditor
                    control={control}
                    editorClassName="max-h-[200px] overflow-auto"
                    editorFor="questions"
                    name={`questionnaires.${selectedPageToIndex}.question`}
                  />
                </Card>
              </Box>
              <Box>
                <Typography variant="body2">Answer option:</Typography>
                <AnswerOptions
                  questionIndex={selectedPageToIndex}
                  questionType="regularQuestion"
                  questionnaireType={values.type}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </FormProvider>
      <Box
        display="flex"
        pt={4}
        alignItems="center"
        justifyContent="space-between"
      >
        <Pagination
          count={questionnaireFields.length}
          onChange={handlePaginate}
          page={selectedPageToIndex + 1}
          variant="outlined"
          shape="rounded"
          showFirstButton
          showLastButton
        />
        <Button
          onClick={confirmCreation(handleContinue)}
          disabled={!isValid}
          className="bg-[#37BEC7] hover:bg-[#2a98a0] py-5 w-44 text-sm text-white font-semibold rounded-xl leading-3 transition-colors duration-150"
        >
          Continue
        </Button>
      </Box>
    </Box>
  );
};
