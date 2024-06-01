import React, { createContext, useContext } from "react";
import { toast, ToastOptions, ToastPosition } from "react-toastify";

export interface ToastContextSetup {
  executeToast: (
    message: string,
    position: ToastPosition,
    hideProgressBar: boolean,
    options?: Partial<ToastOptions>
  ) => void;
}

export const ToastContext = createContext<ToastContextSetup>({} as any);

export const useExecuteToast = () => {
  if (!ToastContext) {
    throw new Error("useExecuteToast must be used withing the ToastProvider.");
  }
  return useContext(ToastContext);
};

export const ToastProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const executeToast: ToastContextSetup["executeToast"] = (
    message,
    position,
    hideProgress,
    options = {}
  ) => {
    toast(message, {
      position: position,
      autoClose: 5000,
      hideProgressBar: hideProgress,
      ...options,
    });
  };
  return (
    <ToastContext.Provider
      value={{
        executeToast,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
};
