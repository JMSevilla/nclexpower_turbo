import { Box, Grid } from "@mui/material";
import React from "react";
import { TextField } from "../../../forms/TextField";
import { Button } from "../../../Button/Button";

export const ApprovalDialogForm = () => {
  return (
    <Grid container direction="column" rowSpacing={4} gap={2}>
      <Box marginTop={5}>
        <Button sx={{ float: "right" }} variant="contained">
          Create
        </Button>
      </Box>
    </Grid>
  );
};
