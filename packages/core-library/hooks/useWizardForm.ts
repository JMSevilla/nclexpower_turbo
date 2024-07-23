import { ReactElement, useCallback, useState } from "react";
import { useScroll } from "../core";
import { useRouter } from "next/router";

export function useWizardForm<TKey extends StepKey, TFormValue, TProps>(
  map: WizardFormMap<TKey, TFormValue, TProps>,
  formatValues: (
    prev: Partial<TFormValue> | undefined,
    values: Partial<TFormValue>,
    keepPrevId?: boolean
  ) => Partial<TFormValue>,
  defaultStep: TKey,
  onChange?: (
    value: Partial<TFormValue>,
    filter?: boolean,
    isDirty?: boolean
  ) => void,
  dependantsExist?: boolean
) {
  const { scrollTop } = useScroll();
  const router = useRouter();
  const [step, setStep] = useState<{ currentStep: TKey; previousStep?: TKey }>({
    currentStep: defaultStep,
  });
  const [values, setValues] = useState<Partial<TFormValue>>(
    {} as Partial<TFormValue>
  );
  const [stepHistory, setStepHistory] = useState<TKey[]>([]);

  const nextStep = useCallback(
    (newValues: TFormValue, filter?: boolean, isDirty?: boolean) => {
      const nextStepValue = map[step.currentStep].nextStep;
      const next =
        nextStepValue instanceof Function
          ? nextStepValue({
              values: newValues,
              router,
              previousStep: step.currentStep,
              dependantsExist,
              stepHistory,
            })
          : nextStepValue;
      const onEnterStep = next ? map[next].onEnterStep : () => {};
      const updatedValues = formatValues(values, newValues, filter);

      setValues(updatedValues);
      onChange?.(updatedValues, filter, isDirty);
      onEnterStep?.(updatedValues, step.previousStep);

      if (next === undefined) return;

      scrollTop();
      setStepHistory((prev) =>
        next === "SummaryView" ? [] : [...prev, step.currentStep]
      );
      setStep({ currentStep: next, previousStep: step.currentStep });
    },
    [step, setStep, map]
  );

  const toStep = (stepKey: TKey, values?: TFormValue) => {
    setStep({ currentStep: stepKey, previousStep: step.currentStep });
    setStepHistory((prev) => [...prev, step.currentStep]);

    if (!values) return;

    setValues((prev) => formatValues(prev, values));
  };

  const previousStep = useCallback(() => {
    const previousStepValue = map[step.currentStep].previousStep;
    const previous =
      previousStepValue instanceof Function
        ? previousStepValue({
            values,
            router,
            previousStep: step.previousStep,
            dependantsExist,
            stepHistory,
          })
        : previousStepValue;

    if (previous === undefined) return;

    const onEnterStep = previous ? map[previous].onEnterStep : () => {};
    onEnterStep?.(values, step.currentStep);
    scrollTop();
    setStepHistory(() => stepHistory.slice(0, -1));
    setStep({ currentStep: previous, previousStep: step.previousStep });
  }, [step, setStep, map]);

  const resetValues = () => {
    setValues({} as TFormValue);
  };

  return {
    values,
    reset: () => setValues({}),
    renderStep: (props: TProps) =>
      map[step.currentStep].content({
        ...props,
        nextStep,
        previousStep,
        stepHistory,
        values,
        toStep,
        resetValues,
      }),
  };
}

type WizardFormProps<TFormValue, TKey> = {
  nextStep(values: TFormValue, filter?: boolean, isDirty?: boolean): void;
  previousStep(): void;
  toStep(step: TKey, values?: TFormValue): void;
  resetValues(): void;
  values: Partial<TFormValue>;
};

interface NextStepProps<TFormValue, TKey> {
  values: TFormValue;
  router: ReturnType<typeof useRouter>;
  previousStep?: TKey;
  dependantsExist?: boolean;
  stepHistory?: TKey[];
}

type NextStep<TKey, TFormValue> =
  | TKey
  | ((props: NextStepProps<TFormValue, TKey>) => void | TKey);

export type StepKey = string | number | symbol;

export type WizardFormMap<TKey extends StepKey, TFormValue, TProps> = {
  [k in TKey]: {
    nextStep: NextStep<TKey, Partial<TFormValue>>;
    previousStep: NextStep<TKey, Partial<TFormValue>>;
    onEnterStep?(values: Partial<TFormValue>, previousStep?: TKey): void;
    content(
      stepProps: WizardFormProps<TFormValue, TKey> & TProps
    ): ReactElement;
  };
};
