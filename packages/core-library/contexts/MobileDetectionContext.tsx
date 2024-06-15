import React, { createContext, useContext, useState, FC, PropsWithChildren } from "react";
import { useResolution } from '@repo/core-library/hooks/useResolution';
import { MobileErrorDialog } from '../../../apps/simulator/src/components/Dialog/MobileErrorDialog'

export interface MobileDetectionContextValue {
  isMobile: boolean;
}

export const MobileDetectionContext = createContext<MobileDetectionContextValue>({ isMobile: false });

export const useMobileDetection = () => {
  if (!MobileDetectionContext) {
    throw new Error("useMobileDetection must be used within a MobileDetectionProvider");
  }
  return useContext(MobileDetectionContext);
};

export const MobileDetectionProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { isMobile } = useResolution();
  return (
    <MobileDetectionContext.Provider value={{ isMobile }}>
      {children}
      <MobileErrorDialog isMobile={isMobile} />
    </MobileDetectionContext.Provider>
  );
};

