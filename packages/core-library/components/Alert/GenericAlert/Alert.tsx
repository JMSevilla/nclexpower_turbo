import React from "react";
import { Alert as MuiAlert, AlertProps, AlertTitle } from "@mui/material";

interface Props {
  severity: AlertProps["severity"];
  title: string;
  description?: string;
}

export const Alert: React.FC<Props> = ({ severity, ...props }) => {
  const { title, description } = props;

  return (
    <MuiAlert severity={severity}>
      <AlertTitle>{title}</AlertTitle>
      {description}
    </MuiAlert>
  );
};
