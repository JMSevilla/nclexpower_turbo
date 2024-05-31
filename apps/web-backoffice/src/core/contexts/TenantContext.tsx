import { createContext, useContext, useMemo } from "react";
import { CmsTenant } from "@repo/utils/types/tenant";

interface Props {
  tenant: CmsTenant;
}

const context = createContext<Props>(undefined as any);

export const useTenantContext = () => {
  if (!context) {
    throw new Error("TenantContextProvider should be used");
  }
  return useContext(context);
};

export const TenantContextProvider: React.FC<
  React.PropsWithChildren<Props>
> = ({ children, tenant }) => {
  return (
    <context.Provider value={useMemo(() => ({ tenant }), [tenant])}>
      {children}
    </context.Provider>
  );
};
