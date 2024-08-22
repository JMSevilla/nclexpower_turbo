import React from "react";
import { AuthProvider } from "../contexts";
import { Page } from "./Page";

export type SystemTypes = "webc_app" | "webdev_app";
interface Props {
  appName: SystemTypes;
}

export const ParseContents: React.FC<React.PropsWithChildren<Props>> = ({
  appName,
  children,
}) => {
  return (
    <AuthProvider>
      <Page appName={appName}>{children}</Page>
    </AuthProvider>
  );
};
