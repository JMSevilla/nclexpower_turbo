import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

type tabsNameProps = {
  label: string;
};

type ControlledTabsProps = {
  value: number;
  handleChange: (event: React.SyntheticEvent, newValue: number) => void;
  children: React.ReactNode;
  tabsName: tabsNameProps[];
};

export const ControlledTabs: React.FC<ControlledTabsProps> = ({
  value,
  handleChange,
  tabsName,
  children,
  ...rest
}) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} {...rest}>
          {tabsName.map((item: tabsNameProps, index: number) => (
            <Tab label={item.label} key={index} />
          ))}
        </Tabs>
      </Box>
      {children}
    </Box>
  );
};
