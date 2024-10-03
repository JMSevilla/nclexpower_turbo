import React, { useEffect, useMemo, useState } from "react";
import { useScroll } from "core-library";
import { WizardFormMap, useModal, useWizardForm } from "core-library/hooks";
import { CreateRegularQuestionsSteps } from "./CreateRegularQuestion";
import { RegularQuestionsSteps, RegularQuestionStepProps } from "./types";
import { RegularQuestionFormType } from "../types";
import { useActiveSteps } from "./useActiveSteps";
import { Stepper } from "core-library/components";

export const useRegularQuestionWizardSteps = (
  onSubmit: VoidFunction,
  saveConfirmationModal: ReturnType<typeof useModal>,
  isSummaryView?: boolean,
  backUrl?: string,
  id?: string
) => {
  const { scrollTop } = useScroll();

  const steps = useMemo(() => {
    return {
      ...CreateRegularQuestionsSteps,
      CreateNewRegularQuestionMCQ: {
        nextStep: "SummaryView",
        previousStep: "ChooseQuestionType",
        content: (props) => <>test</>,
      },
    } as WizardFormMap<
      Partial<RegularQuestionsSteps>,
      RegularQuestionFormType,
      RegularQuestionStepProps
    >;
  }, []);

  const formWizardValues = (
    prev: Partial<RegularQuestionFormType> | undefined,
    values: Partial<RegularQuestionFormType>,
    keepPrevId?: boolean
  ): Partial<RegularQuestionFormType> => ({
    ...prev,
    ...values,
  });

  const { renderStep } = useWizardForm<
    RegularQuestionsSteps,
    RegularQuestionFormType,
    RegularQuestionStepProps
  >(steps, formWizardValues, "ChooseQuestionType");

  const stepKeys = Object.keys(steps);
  const stepLabels = stepKeys.map((step) =>
    step.replace(/([A-Z])/g, " $1").trim()
  );

  const { activeStep } = useActiveSteps(stepLabels.length);
  return {
    render: (
      <React.Fragment>
        <Stepper activeStep={activeStep} steps={stepLabels} />
        {renderStep({ isLoading: false })}
      </React.Fragment>
    ),
  };
};
