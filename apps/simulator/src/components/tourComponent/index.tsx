import React, { useState, useRef } from 'react';
import Tour from 'reactour';

export interface TourStep {
    selector: string;
    content: string | JSX.Element;
}

interface UseTourOptions {
    steps: TourStep[];
}

export const TourComponent:React.FC<UseTourOptions> = ({ steps }) => {
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const closeTour = () => {
    setIsTourOpen(false);
  };
  const currentStepRef = useRef<HTMLDivElement>(null);

  const scrollIntoViewIfNeeded = () => {
    if (currentStepRef.current) {
      currentStepRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleAfterOpen = () => {
    document.body.style.overflowY = 'hidden';
    scrollIntoViewIfNeeded();
  };

  const handleBeforeClose = () => {
    document.body.style.overflowY = 'auto';
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <Tour
      steps={steps}
      isOpen={isTourOpen}
      onRequestClose={closeTour}
      maskSpace={1}
      onAfterOpen={handleAfterOpen}
      onBeforeClose={handleBeforeClose}
      prevButton={<button onClick={prevStep}>Previous</button>}
      nextButton={<button onClick={nextStep}>Next</button>}
      lastStepNextButton={<button onClick={closeTour}>Finish</button>}
    />
  );
};
