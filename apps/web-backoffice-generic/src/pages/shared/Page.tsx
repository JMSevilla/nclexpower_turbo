import React from "react";
import {
  AuthProvider,
  BusinessQueryContextProvider,
} from "core-library/contexts";
import Layout from '../shared/Layout';

const Page: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
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

export default Page