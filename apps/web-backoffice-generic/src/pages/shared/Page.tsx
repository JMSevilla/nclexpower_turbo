import { Layout } from "./Layout";
import React from "react";
import {
  AuthProvider,
  BusinessQueryContextProvider,
} from "core-library/contexts";

export const Page: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <React.Fragment>
      <BusinessQueryContextProvider>
        <AuthProvider>
          <Layout children={children} />
        </AuthProvider>
      </BusinessQueryContextProvider>
    </React.Fragment>
  );
};
