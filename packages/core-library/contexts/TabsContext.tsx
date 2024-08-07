import React, { createContext, useContext, useState } from "react";

const context = createContext<{
  activeTabIndex: number;
  onTabChanged(index: number): void;
}>(undefined as any);

export const useTabsContext = () => {
  if (!context) {
    throw new Error("TabsContextProvider should be used");
  }
  return useContext(context);
};

export const TabsContextProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [tabIndex, setTab] = useState(0);

  return (
    <context.Provider
      value={{ activeTabIndex: tabIndex, onTabChanged: setTab }}
    >
      {children}
    </context.Provider>
  );
};
