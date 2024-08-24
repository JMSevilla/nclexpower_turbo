import React from "react";
import { useTabsContext } from "../../contexts";

interface Props {
  index: number;
  id?: string;
  "aria-labelledby"?: string;
}

export const TabPanel: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  index,
  ...other
}) => {
  const { activeTabIndex } = useTabsContext();

  return (
    <div role="tabpanel" hidden={activeTabIndex !== index} {...other}>
      {children}
    </div>
  );
};
