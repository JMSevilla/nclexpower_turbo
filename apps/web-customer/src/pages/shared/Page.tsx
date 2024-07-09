import React from "react";
import { AuthProvider, BusinessQueryContextProvider, ToastProvider } from "core-library/contexts";
import LayoutComponent from '@/pages/shared/Layout';
import { ControlledToast } from "core-library/components";

const Page: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <React.Fragment>
      <BusinessQueryContextProvider>
        <AuthProvider>
          <ToastProvider>
            <ControlledToast autoClose={5000} hideProgressBar={false} />
            {/* Higher-level of code */}
            <LayoutComponent children={children} />
          </ToastProvider>
        </AuthProvider>
      </BusinessQueryContextProvider>
    </React.Fragment>
  );
};

export default Page
