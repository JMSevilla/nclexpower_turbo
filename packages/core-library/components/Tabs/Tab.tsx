import { styled, Tab as MuiTab } from "@mui/material";

interface StyledTabProps {
  id?: string;
  key?: string;
  label: string;
  "aria-controls"?: string;
}

export const Tab = styled((props: StyledTabProps) => (
  <MuiTab
    {...props}
    sx={{
      typography: (theme) => ({
        ...theme.typography.body1,
        fontWeight: "bold",
      }),
      textTransform: "unset",
      p: "20px 32px",
      "&:focus": {
        boxShadow: "unset",
        outline: "unset !important",
      },
    }}
    wrapped
  />
))(({ theme }) => ({
  "&.Mui-selected": {
    backgroundColor: theme.palette?.appColors?.support80.transparentLight,
  },
}));
