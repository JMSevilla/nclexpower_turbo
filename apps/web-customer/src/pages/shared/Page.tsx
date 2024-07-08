import React from "react";
import { AuthProvider, ToastProvider } from "core-library/contexts";
import LayoutComponent from '@/pages/shared/Layout';
import { ControlledToast } from "core-library/components";


const Page: React.FC<React.PropsWithChildren> = ({ children }) => {


  return (
    <React.Fragment>
      <AuthProvider>
        {/* Higher-level of code */}
        <ToastProvider>
          {/* Higher-level of code */}
          <ControlledToast autoClose={5000} hideProgressBar={false} />
          <LayoutComponent children={children} />
        </ToastProvider>
      </AuthProvider>
    </React.Fragment>
  );
};

export default Page;
