import dynamic from "next/dynamic";
import { Layout as LayoutComponent } from "./Layout";
import React from "react";
import { NextPage } from "next";
import { AuthProvider } from "core-library/contexts";
import { ToastProvider } from "core-library/contexts";
import { ControlledToast } from "core-library/components/Toastify/Toastify"
interface Props {
  children: React.ReactNode | React.ReactElement;
}

const Page: NextPage<Props> = ({ children }) => {
  const Layout = dynamic<React.ComponentProps<typeof LayoutComponent>>(
    () => import("./Layout").then((c) => c.Layout),
    {
      ssr: false,
    }
  );

  return (
    <React.Fragment>
      <AuthProvider>
        <ToastProvider>
          {/* Higher-level of code */}
          <ControlledToast autoClose={5000} hideProgressBar={false} />
          <Layout children={children} />
        </ToastProvider>
      </AuthProvider>
    </React.Fragment>
  );
};

export default Page;
