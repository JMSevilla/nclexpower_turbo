import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  RegularQuestionsFormType,
  ContainedRegularQuestionType,
} from "@/components/blocks/page/SettingsManagement/steps/content/simulator/types";
import {
  regularQuestionsFormSchema,
  containedRegularQuestionSchema,
} from "@/components/blocks/page/SettingsManagement/steps/content/simulator/validation";
import { initQuestionsValues } from "@/core/constant/initQuestionsValues";

export const useRegularQuestionForm = (
  values: Partial<ContainedRegularQuestionType>
) => {
  const parentForm = useForm<ContainedRegularQuestionType>({
    mode: "all",
    resolver: yupResolver(containedRegularQuestionSchema),
    defaultValues: { ...values },
  });

  const form = useForm<RegularQuestionsFormType>({
    mode: "onSubmit",
    resolver: yupResolver(regularQuestionsFormSchema),
    defaultValues: initQuestionsValues,
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
    form,
    questionnaireFields,
    appendQuestionnaire,
    updateQuestionnaire,
    removeQuestionnaire,
  };
};
