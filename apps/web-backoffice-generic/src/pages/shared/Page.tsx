import React from "react";
import {
  AuthProvider,
  BusinessQueryContextProvider,
  ToastProvider,
} from "core-library/contexts";
import Layout from "../shared/Layout";

const Page: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <React.Fragment>
      <BusinessQueryContextProvider>
        <AuthProvider>
          <ToastProvider>
            <Layout children={children} />
          </ToastProvider>
        </AuthProvider>
      </BusinessQueryContextProvider>
    </React.Fragment>
  );
};

export default Page;
