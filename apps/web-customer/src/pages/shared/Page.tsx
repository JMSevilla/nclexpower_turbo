import React from "react";
import { AuthProvider, BusinessQueryContextProvider } from "core-library/contexts";
import LayoutComponent from '@/pages/shared/Layout';

const Page: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <React.Fragment>
      <BusinessQueryContextProvider>
        <AuthProvider>
          {/* Higher-level of code */}
          <LayoutComponent children={children} />
        </AuthProvider>
      </BusinessQueryContextProvider>
    </React.Fragment>
  );
};

export default Page
