import { Box } from "@mui/material";
import { styled } from "@mui/material";

export const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyItems: "start",
  flexDirection: "column",
  maxHeight: "400px",
  overflowY: "auto",
  padding: theme.spacing(3),
  gap: theme.spacing(1),
}));
