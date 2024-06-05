import React, { createContext, useContext, useEffect, useState, FC, PropsWithChildren } from "react";
import { useResolution } from '@repo/core-library/hooks/useResolution';
import { useExecuteToast } from '@repo/core-library/contexts';

interface MobileDetectionContextValue {
  isMobile: boolean
}

export const MobileDetectionContext = createContext<MobileDetectionContextValue | undefined>(undefined);

export const useMobileDetection = (): boolean => {
  const context = useContext(MobileDetectionContext);
  if (!context) {
    throw new Error("useMobileDetection must be used within a MobileDetectionProvider");
  }
  return context.isMobile;
};

export const MobileDetectionProvider: FC<PropsWithChildren> = ({ children }) => {
  const { isMobile } = useResolution();
  const { executeToast } = useExecuteToast();

  useEffect(() => {
    if (isMobile) {
      executeToast('The simulator is not available in mobile device. Please use different device.', 'top-right', false);
    };
  }, [isMobile]);

  return (
    <MobileDetectionContext.Provider value={{ isMobile }}>
      {children}
    </MobileDetectionContext.Provider>
  )
}
