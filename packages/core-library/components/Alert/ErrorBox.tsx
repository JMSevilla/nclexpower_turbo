import { Grid, Typography } from "@mui/material";
import React from "react";
import { DangerIcon } from "./icons/DangerIcon";

interface Props {
  label: string;
  mb?: number;
  customBackground?: string;
}

export const ErrorBox: React.FC<Props> = ({
  label,
  mb = 8,
  customBackground,
}) => {
  return (
    <Grid
      role="alert"
      container
      minHeight="256px"
      sx={{
        backgroundColor:
          customBackground ?? "appColors.support80.transparentLight",
        flexWrap: { xs: "wrap", md: "nowrap" },
        py: { md: 5, xs: 35 },
        px: { md: 50, xs: 10 },
      }}
      justifyContent="center"
      alignItems="center"
    >
      <Grid item sx={{ mb: { xs: mb } }}>
        <DangerIcon />
      </Grid>
      <Grid item>
        <Typography
          align="left"
          variant="h4"
          fontWeight="bold"
          color="appColors.tertiary.dark"
          textAlign="center"
          px={4}
        >
          {label}
        </Typography>
      </Grid>
    </Grid>
  );
};
