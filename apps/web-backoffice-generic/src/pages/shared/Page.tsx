import dynamic from "next/dynamic";
import { Layout as LayoutComponent } from "./Layout";
import React from "react";
import { NextPage } from "next";

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
      {/* Higher-level of code */}
      <Layout children={children} />
    </React.Fragment>
  );
};

export default Page;
