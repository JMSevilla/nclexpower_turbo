import { atom, useAtom } from "jotai";

export const activeStepAtom = atom(0);
export const useActiveSteps = (MAX_LENGTH_ARRAY: number) => {
  const [activeStep, setActiveStep] = useAtom(activeStepAtom);

  const next = () => {
    if (activeStep >= MAX_LENGTH_ARRAY) {
      return;
    }
    setActiveStep(activeStep + 1);
  };

  const previous = () => {
    if (activeStep <= 0) {
      return;
    }
    setActiveStep(activeStep - 1);
  };

  const reset = () => setActiveStep(0);
  return {
    reset,
    activeStep,
    setActiveStep,
    next,
    previous,
  };
};
