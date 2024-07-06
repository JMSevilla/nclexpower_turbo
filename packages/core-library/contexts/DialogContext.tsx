import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { DialogBox } from "../components/Dialog/DialogBox";
import { DialogContextModal } from "../components/Dialog/DialogContextModal";

const context = createContext<{
  isDialogOpen: boolean;
  openDialog(value: string, title: string): void;
  closeDialog(): void;
  loading: boolean;
  setTitle(value: string): void;
  setLoading(value: boolean): void;
  setHideCloseButton(value: boolean): void;
}>(undefined as any);

export const useDialogContext = () => {
  if (!context) {
    throw new Error("DialogContextProvider should be used.");
  }
  return useContext(context);
};

export const DialogContextProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dialogFormType, setDialogFormType] = useState<string>("no-form");
  const [title, setTitle] = useState<string>("no-title");
  const [loading, setLoading] = useState<boolean>(false);
  const [hideCloseButton, setHideCloseButton] = useState<boolean>(false);

  const openDialog = (value: string, title: string) => {
    setIsOpen(true);
    setDialogFormType(value);
    setTitle(title);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const dialogContextValue = useMemo(
    () => ({
      isDialogOpen: isOpen,
      loading: loading,
      openDialog,
      closeDialog: handleClose,
      setTitle,
      setLoading,
      setHideCloseButton,
    }),
    [isOpen, loading, hideCloseButton]
  );

  return (
    <context.Provider value={dialogContextValue}>
      {children}
      <DialogBox
        open={isOpen}
        handleClose={handleClose}
        header={title}
        loading={loading}
        hideCloseButton={hideCloseButton}
      >
        <DialogContextModal dialogFormType={dialogFormType} />
      </DialogBox>
    </context.Provider>
  );
};
