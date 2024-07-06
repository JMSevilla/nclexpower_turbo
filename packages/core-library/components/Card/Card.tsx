import React, { ReactNode } from "react";
import {
  Card as MuiCard,
  CardContent,
  CardProps,
  CardActions,
} from "@mui/material";

interface Props {
  elevation?: CardProps["elevation"];
  actionsNode?: ReactNode; // this can be improved.
  hasActionsNode?: boolean;
  sx?: CardProps["sx"];
}

export const Card: React.FC<React.PropsWithChildren<Props>> = ({
  elevation,
  children,
  actionsNode,
  sx,
}) => {
  return (
    <MuiCard sx={sx} elevation={elevation}>
      <CardContent>{children}</CardContent>
      {actionsNode && <CardActions>{actionsNode}</CardActions>}
    </MuiCard>
  );
};
