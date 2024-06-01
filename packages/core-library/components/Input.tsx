import { InputProps, OutlinedInput } from "@mui/material";

export const Input = (props: InputProps) => (
  <OutlinedInput
    fullWidth
    sx={{
      borderRadius: 0,
      position: "relative",
      "&.Mui-error fieldset": {
        borderWidth: 2,
      },
    }}
    {...props}
  />
);
