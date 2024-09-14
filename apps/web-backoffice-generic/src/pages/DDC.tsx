import { Button } from "@mui/material";
import { useRouter } from "core-library";
import { AnswerOptions, ControlledTextField } from "core-library/components";
import { DDC } from "core-library/components/blocks/AnswerOptions/blocks/CaseStudy/DDC/DDC";
import { ContainedCaseStudyQuestionMockType } from "core-library/components/blocks/AnswerOptions/blocks/CaseStudy/DDC/schema";
import { useBeforeUnload } from "core-library/hooks";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";

export default function DDCPage() {
  useBeforeUnload(true);
  const form = useForm<ContainedCaseStudyQuestionMockType>({});

  const { control } = form;

  return (
    <FormProvider {...form}>
      <ControlledTextField
        control={control}
        name={`questionnaires.${0}.itemStem`}
      />
      <AnswerOptions
        questionType="caseStudy"
        questionIndex={0}
        questionnaireType="DDC"
      />
    </FormProvider>
  );
}
