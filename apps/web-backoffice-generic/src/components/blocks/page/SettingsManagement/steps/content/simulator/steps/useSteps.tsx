import React, { useEffect, useMemo, useState } from "react";
import { useScroll } from "core-library";
import {
  WizardFormMap,
  useActiveSteps,
  useModal,
  useWizardForm,
} from "core-library/hooks";
import {
  ChooseQuestionTypeStep,
  QuestionTypeFormSteps,
  QuestionTypeStepProps,
} from "../ChooseQuestionType";
import { ContainedRegularQuestionType } from "../types";
import { Stepper } from "core-library/components";

export const useQuestionManagementWizardSteps = (
  onSubmit: VoidFunction,
  saveConfirmationModal: ReturnType<typeof useModal>,
  isSummaryView?: boolean
) => {
  const steps = useMemo(() => {
    return {
      ...ChooseQuestionTypeStep,
    } as WizardFormMap<
      Partial<QuestionTypeFormSteps>,
      ContainedRegularQuestionType,
      QuestionTypeStepProps
    >;
  }, []);

  const formWizardValues = (
    prev: Partial<ContainedRegularQuestionType> | undefined,
    values: Partial<ContainedRegularQuestionType>
  ): Partial<ContainedRegularQuestionType> => ({
    ...prev,
    ...values,
  });

  const { renderStep } = useWizardForm<
    QuestionTypeFormSteps,
    ContainedRegularQuestionType,
    QuestionTypeStepProps
  >(steps, formWizardValues, "InitialQuestionTypeSelection");

  const stepKeys = Object.keys(steps);
  const stepLabels = stepKeys.map((step) =>
    step.replace(/([A-Z])/g, " $1").trim()
  );

  const { activeStep, next, previous } = useActiveSteps(stepLabels.length);
  return {
    render: (
      <React.Fragment>
        <Stepper activeStep={activeStep} steps={stepLabels} />
        {renderStep({ isLoading: false, next, previous })}
      </React.Fragment>
    ),
  };
};
