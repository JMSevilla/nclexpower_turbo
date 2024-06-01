import { useMediaQuery, useTheme } from "@mui/material";
import { useMemo } from "react";

export const useResolution = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return useMemo(() => ({ isMobile }), [isMobile]);
};
