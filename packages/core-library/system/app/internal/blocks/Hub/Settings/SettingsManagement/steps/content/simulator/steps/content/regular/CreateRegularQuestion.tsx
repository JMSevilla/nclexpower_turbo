import {
  Button,
  Card,
  ControlledRichTextEditor,
  AnswerOptions,
} from "../../../../../../../../../../../../../components";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useAtom } from "jotai";
import React, { useEffect, useMemo, useState } from "react";
import { Box, Pagination, Typography } from "@mui/material";
import { useBusinessQueryContext } from "../../../../../../../../../../../../../contexts";
import { FormProvider } from "react-hook-form";
import { ContainedRegularQuestionType } from "../../../types";
import { CreateRegularAtom } from "../../../useAtomic";
import { useRegularQuestionForm } from "../hooks/useRegularQuestionForm";
import { initQuestionsValues } from "../../../../../../constants/constants";
import ConfirmationModal from "../../../../../../../../../../../../../components/Dialog/DialogFormBlocks/RegularQuestion/ConfirmationDialog";
import { CreateQuestionLoader } from "../loader";
import { usePageLoaderContext } from "../../../../../../../../../../../../../contexts/PageLoaderContext";
import { GenericSelectField } from "../../../../../../../../../../../../../components/Textfield/GenericSelectField";
import { GetCategoryType } from "../../../../../../../../../../../../../api/types";
import { useSelectfieldOptions } from "../hooks/useSelectfieldOptions";

interface Props {
  nextStep(values: Partial<ContainedRegularQuestionType>): void;
  previousStep(): void;
  values: Partial<ContainedRegularQuestionType>;
  next: () => void;
  previous: () => void;
  reset: () => void;
}

export const CreateRegularQuestion: React.FC<Props> = ({
  nextStep,
  previousStep,
  values,
  next,
  previous,
  reset,
}) => {
  const { contentLoader, setContentLoader } = usePageLoaderContext();
  const [questionnaireAtom, setQuestionnireAtom] = useAtom(CreateRegularAtom);
  const [selectedPageIndex, setSelectedPageIndex] = useState<number>(1);
  const [isCurrentPage, setIsCurrentPage] = useState(false);
  const { cleanedClientNeeds, cleanedCognitiveLevel, cleanedContentArea } =
    useSelectfieldOptions();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setContentLoader(false);
    }, 3000);
    return () => {
      clearTimeout(timeout);
      setContentLoader(true);
    };
  }, []);

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
      next();
    }
  };

  const handlePrevious = () => {
    previousStep();
    previous();
    reset();
  };

  useEffect(() => {
    updateValues();
    const isCurrentQuestionnaire =
      questionnaireFields.length !== 0 &&
      selectedPageIndex !== questionnaireFields.length;
    setIsCurrentPage(isCurrentQuestionnaire);
  }, [selectedPageIndex]);

  if (contentLoader) {
    return <CreateQuestionLoader />;
  }

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
        <ConfirmationModal
          dialogContent="This action will reset all forms."
          confirmButtonText="Confirm"
          isLoading={false}
          customButton="Confirm"
          handleSubmit={handlePrevious}
        />

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
        >
          <Box display="flex" justifyContent="flex-end" width="100%" gap={2}>
            <Button
              onClick={handleRemove}
              sx={{ minWidth: "none", backgroundColor: "red" }}
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
            <Box width="45%" display="flex" gap={3} flexDirection="column">
              <GenericSelectField
                control={control}
                sx={{ width: "100%", mb: 2 }}
                name={`questionnaires.${selectedPageToIndex}.clientNeeds`}
                label="Client Needs Category :"
                options={cleanedClientNeeds ?? []}
                variant="standard"
              />
              <GenericSelectField
                control={control}
                sx={{ width: "100%" }}
                name={`questionnaires.${selectedPageToIndex}.contentArea`}
                label="Content Area :"
                options={cleanedContentArea ?? []}
                variant="standard"
              />
              <GenericSelectField
                variant="standard"
                control={control}
                sx={{ width: "100%" }}
                name={`questionnaires.${selectedPageToIndex}.cognitiveLevel`}
                label="Cognitive Level :"
                options={cleanedCognitiveLevel ?? []}
              />
            </Box>
            <Box width="55%" display="flex" flexDirection="column" gap={4}>
              <Box maxWidth={1}>
                <Typography variant="body2">Question :</Typography>
                <Card sx={{ maxHeight: "200px", overflow: "auto" }}>
                  <ControlledRichTextEditor
                    control={control}
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
        <Button onClick={confirmCreation(handleContinue)} disabled={!isValid}>
          Continue
        </Button>
      </Box>
    </Box>
  );
};
