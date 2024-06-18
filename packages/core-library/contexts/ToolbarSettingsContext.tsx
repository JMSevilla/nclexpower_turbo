import React, { useState, createContext, useContext, ReactNode, CSSProperties } from "react";

export interface ToolbarSettingsContextValue {
  textZoomStyle: CSSProperties;
  handleZoomInText: () => void;
  handleZoomOutText: () => void;
  handleResetTextZoom: () => void;
}

export const ToolbarSettingsContext = createContext<ToolbarSettingsContextValue>({
  textZoomStyle: {},
  handleZoomInText: () => { },
  handleZoomOutText: () => { },
  handleResetTextZoom: () => { },
});

export const useToolbarSettings = (): ToolbarSettingsContextValue => {
  const context = useContext(ToolbarSettingsContext);
  if (!context) {
    throw new Error("useToolbarSettings must be used within a ToolbarSettingsProvider");
  }
  return context;
};

export const ToolbarSettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [textZoom, setTextZoom] = useState<number>(1);

  const handleZoomInText = () => {
    setTextZoom((prevZoom) => prevZoom + 0.01);
  };

  const handleZoomOutText = () => {
    if (textZoom > 0.2) {
      setTextZoom((prevZoom) => prevZoom - 0.01);
    }
  };

  const handleResetTextZoom = () => {
    setTextZoom(1);
  };

  const textZoomStyle = {
    fontSize: `${textZoom * 100}%`,
  };
  return (
    <ToolbarSettingsContext.Provider value={{ handleZoomInText, handleZoomOutText, handleResetTextZoom, textZoomStyle }}>
      {children}
    </ToolbarSettingsContext.Provider>
  );
};
