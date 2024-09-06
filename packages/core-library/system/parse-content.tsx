import React from "react";
import { AuthProvider, ToastProvider } from "../contexts";
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
      <ToastProvider>
        <Page appName={appName}>{children}</Page>
      </ToastProvider>
    </AuthProvider>
  );
};
