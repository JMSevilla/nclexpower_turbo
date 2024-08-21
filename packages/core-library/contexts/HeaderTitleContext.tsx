import Head from "next/head";
import React, { createContext, useContext } from "react";
import { useRouter } from "../core";

const context = createContext<{}>({} as any);

export const useHeaderTitleContext = () => {
  if (!context) {
    throw new Error("HeaderTitleContextProvider should be used");
  }
  return useContext(context);
};

export const HeaderTitleContextProvider: React.FC<
  React.PropsWithChildren<{}>
> = ({ children }) => {
  const router = useRouter();

  return (
    <context.Provider value={{}}>
      <Head>{<title>{router?.title || "Default"}</title>}</Head>
      {children}
    </context.Provider>
  );
};
