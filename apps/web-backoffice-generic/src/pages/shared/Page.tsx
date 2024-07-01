import dynamic from "next/dynamic";
import { Layout as LayoutComponent } from "./Layout";
import React from "react";
import { NextPage } from "next";
import { AuthProvider } from "core-library/contexts";
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
        <Layout children={children} />
      </AuthProvider>
    </React.Fragment>
  );
};

export default Page;
