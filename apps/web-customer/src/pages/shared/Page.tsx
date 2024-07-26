import React from "react";
import {
  AuthProvider,
  BusinessQueryContextProvider,
  ToastProvider,
} from "core-library/contexts";
import Layout from "./Layout";
import { ControlledToast } from "core-library/components";
import { ClientSecretKeyContextProvider } from "core-library/contexts";

const Page: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <React.Fragment>
      <BusinessQueryContextProvider>
        <AuthProvider>
          <ToastProvider>
            <ClientSecretKeyContextProvider>
              <ControlledToast autoClose={5000} hideProgressBar={false} />
              <Layout children={children} />
            </ClientSecretKeyContextProvider>
          </ToastProvider>
        </AuthProvider>
      </BusinessQueryContextProvider>
    </React.Fragment>
  );
};

export default Page