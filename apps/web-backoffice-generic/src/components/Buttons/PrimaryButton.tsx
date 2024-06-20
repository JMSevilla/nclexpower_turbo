import { Button, ButtonProps } from "@mui/material";

export const PrimaryButton: React.FC<
  Omit<ButtonProps, "variant"> & { component?: string }
> = (props) => {
  return (
    <Button
      sx={{ mx: "auto", mt: 2, width: [, 300] }}
      color="primary"
      variant="contained"
      fullWidth
      {...props}
    />
  );
};
