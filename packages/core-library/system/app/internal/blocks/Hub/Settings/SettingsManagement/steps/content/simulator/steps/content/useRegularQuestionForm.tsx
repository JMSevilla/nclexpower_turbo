import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ContainedRegularQuestionType } from "../../types";
import { initQuestionsValues } from "../../../../../constants/constants";
import { answerOptionsSchema, containedRegularQuestionSchema } from "../../validation";

export const useRegularQuestionForm = (
  values: Partial<ContainedRegularQuestionType>
) => {
  const parentForm = useForm<ContainedRegularQuestionType>({
    mode: "all",
    resolver: yupResolver(containedRegularQuestionSchema),
    context: { type: values.type },
    defaultValues: { questionnaires: [initQuestionsValues(values.type)], ...values, },
  });

  const { control: parentControl, formState: parentFormState } = parentForm;
  const {
    append: appendQuestionnaire,
    fields: questionnaireFields,
    update: updateQuestionnaire,
    remove: removeQuestionnaire,
  } = useFieldArray({
    control: parentControl,
    name: "questionnaires",
  });

  return {
    parentForm,
    parentFormState,
    questionnaireFields,
    appendQuestionnaire,
    updateQuestionnaire,
    removeQuestionnaire,
  };
};