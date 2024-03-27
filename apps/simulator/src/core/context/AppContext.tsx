import { createContext, useContext, useEffect, useState } from "react";
import { SsrData } from "../types/ssrData";

type AppContextValue = {
  questionaire: SsrData["questionaire"];
  loading?: boolean;
  setLoader: any;
};

type Ssr = {
  data?: any;
};

const ApplicationContext = createContext<AppContextValue>(undefined as any);

export const ApplicationProvider: React.FC<React.PropsWithChildren<Ssr>> = ({
  children,
  data,
}) => {
  const [questionaire, setQuestionaire] = useState<SsrData["questionaire"]>([]);
  const [loader, setLoader] = useState<boolean>(true);

  return (
    <ApplicationContext.Provider
      value={{
        questionaire,
        loading: loader,
        setLoader,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplicationContext = () => {
  if (!ApplicationContext) {
    throw new Error("Application context must used.");
  }
  return useContext(ApplicationContext);
};
