import { Box, Grid } from "@mui/material";
import { useState } from "react";
import { useResolution } from "../../hooks";
import { HeaderLogo } from "./HeaderLogo";

interface Props {
  onLogout(): void;
  //menu can add here with diff type.
  isAuthenticated: boolean;
}

export const Header: React.FC<Props> = ({ onLogout, isAuthenticated }) => {
  const { isMobile } = useResolution();

  return (
    <Box
      role="banner"
      component="header"
      width="100%"
      height={100}
      display="flex"
      justifyContent="center"
      zIndex={999}
      sx={{
        backgroundColor: "background.default",
        borderBottomWidth: 1,
        borderBottomStyle: "solid",
        borderBottomColor: "divider",
      }}
    >
      <Grid
        container
        px={8}
        width="100%"
        position="relative"
        display="flex"
        alignItems="flex-end"
        justifyContent="flex-end"
      >
        <Grid item container alignItems="flex-center" spacing={6} height="auto">
          <Grid item container alignItems="flex-end" xs>
            <Grid item>
              <HeaderLogo />
            </Grid>
            <Grid item></Grid>
          </Grid>
          {isAuthenticated && <Grid item alignSelf="center"></Grid>}
          {isAuthenticated && <Grid item alignSelf="center"></Grid>}
          {isMobile && <Grid item></Grid>}
        </Grid>
        <Grid item xs={12} position="relative"></Grid>
      </Grid>
    </Box>
  );
};
