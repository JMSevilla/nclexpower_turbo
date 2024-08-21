import { useState } from "react";

export function useModal<T = undefined>() {
  const [isOpen, setModalOpen] = useState(false);
  const [context, setModalContext] = useState<T>();

  const open = (context?: T) => {
    context && setModalContext(context);
    setModalOpen(true);
  };

  const close = () => {
    setModalContext(undefined);
    setModalOpen(false);
  };

  return {
    open,
    close,
    props: {
      isOpen,
      context,
    },
  };
}

export type UseModalReturnType = ReturnType<typeof useModal>;
export type UseModalProps = UseModalReturnType["props"];
