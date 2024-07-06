import {
  FormHelperText as MuiFormHelperText,
  Stack,
  Box,
  FormHelperTextProps as MuiFormHelperTextProps,
} from "@mui/material";
import { ErrorFieldIcon } from "../Icons/ErrorFieldIcon";

type FormHelperTextProps = MuiFormHelperTextProps & {
  error?: boolean;
  showErrorIcon?: boolean;
};
export const FormHelperText: React.FC<FormHelperTextProps> = ({
  children,
  error,
  sx = {},
  ...rest
}) => {
  return (
    <Stack
      direction="row"
      gap={1}
      alignItems="flex-start"
      justifyContent={"flex-start"}
    >
      {error && (
        <Box>
          <ErrorFieldIcon />
        </Box>
      )}
      <MuiFormHelperText sx={{ mt: 0, ...sx }} error={error} {...rest}>
        {children}
      </MuiFormHelperText>
    </Stack>
  );
};
