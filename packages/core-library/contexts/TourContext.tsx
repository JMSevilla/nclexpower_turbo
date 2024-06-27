import React, { createContext, useContext, useState } from "react";

interface TourContextType {
  openTour: () => void;
  closeTour: () => void;
  goToStep: (step: number) => void;
  isTourOpen: boolean;
  currentStep: number;
}

const TourContext = createContext<TourContextType>({} as any);

export const useTour = () => {
  const context = TourContext;
  if (!context) {
    throw new Error("TourProvider should be used");
  }

  return useContext(context);
};

export const TourProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [isTourOpen, setIsTourOpen] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);

  const openTour = () => setIsTourOpen(true);
  const closeTour = () => setIsTourOpen(false);
  const goToStep = (step: number) => setCurrentStep(step);

  const value = {
    openTour,
    closeTour,
    goToStep,
    isTourOpen,
    currentStep,
  };
  return <TourContext.Provider value={value}>{children}</TourContext.Provider>;
};
