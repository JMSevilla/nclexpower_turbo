import React from "react";
import { AuthProvider } from "core-library/contexts";
import LayoutComponent from '@/pages/shared/Layout';


const Page: React.FC<React.PropsWithChildren> = ({ children }) => {


  return (
    <React.Fragment>
      <AuthProvider>
        {/* Higher-level of code */}
        <LayoutComponent children={children} />
      </AuthProvider>
    </React.Fragment>
  );
};

export default Page;
