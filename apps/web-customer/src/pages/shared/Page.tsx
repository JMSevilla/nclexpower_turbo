import dynamic from "next/dynamic";
import { Layout as LayoutComponent } from "./Layout";
import React from "react";
import {
  AuthProvider,
  BusinessQueryContextProvider,
} from "core-library/contexts";

export const Page: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const Layout = dynamic<React.ComponentProps<typeof LayoutComponent>>(
    () => import("./Layout").then((c) => c.Layout),
    {
      ssr: false,
    }
  );

  return (
    <React.Fragment>
      <BusinessQueryContextProvider>
        <AuthProvider>
          {/* Higher-level of code */}
          <Layout children={children} />
        </AuthProvider>
      </BusinessQueryContextProvider>
    </React.Fragment>
  );
};
