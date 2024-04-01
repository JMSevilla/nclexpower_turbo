type CustomActionArguments = {
  actionParam?: string;
};

export type CustomActionHook = (args?: CustomActionArguments) => {
  execute(): void | Promise<unknown>;
  loading: boolean;
  disabled?: boolean;
  disableFurtherActions?: boolean;
  node?: React.ReactNode;
};
