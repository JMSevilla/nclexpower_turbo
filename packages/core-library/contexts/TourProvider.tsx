import React, { createContext, useContext } from "react";
import { TourProvider as ReactTourProvider, StepType } from "@reactour/tour";

interface TourContextProps {}

const TourContext = createContext<TourContextProps | undefined>(undefined);

export const useTourContext = () => {
  if (!TourContext) {
    throw new Error("useTourContext must be used within a TourProviderWrapper");
  }
  return useContext(TourContext);
};

interface TourProviderProps {
  steps: StepType[];
}

export const TourProvider: React.FC<
  React.PropsWithChildren<TourProviderProps>
> = ({ children, steps }) => {
  const radius = 4;
  const style = {
    popover: (base: any) => ({
      ...base,
      borderRadius: radius,
    }),
    maskArea: (base: any) => ({ ...base, rx: radius }),
    badge: (base: any) => ({ ...base, left: "auto", right: "-0.8125em" }),
    controls: (base: any) => ({ ...base, marginTop: 100 }),
    close: (base: any) => ({ ...base, right: "auto", left: 8, top: 8 }),
  };

  return (
    <TourContext.Provider value={{}}>
      <ReactTourProvider
        steps={steps}
        padding={{
          mask: 2,
          popover: [5, 10],
        }}
        styles={style}
        badgeContent={({ totalSteps, currentStep }) =>
          `${currentStep + 1}/${totalSteps}`
        }
      >
        {children}
      </ReactTourProvider>
    </TourContext.Provider>
  );
};
