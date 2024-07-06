import { Close } from "@mui/icons-material";
import {
  Box,
  Dialog,
  DialogContent,
  DialogProps,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";

interface Props extends DialogProps {
  handleClose: () => void;
  loading: boolean;
  header?: string;
  hideCloseButton?: boolean;
}

export const DialogBox: React.FC<React.PropsWithChildren<Props>> = ({
  handleClose,
  loading,
  header,
  children,
  open,
  hideCloseButton,
  ...props
}) => {
  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={open}
      onClose={handleClose}
      sx={{ zIndex: 1301 }}
      {...props}
    >
      <DialogTitle
        component={header ? "h4" : "div"}
        sx={{
          px: { xs: 6, sm: 12 },
          pt: { xs: 6, sm: 12 },
          pb: { xs: 6, sm: 8 },
          textAlign: "center",
        }}
      >
        {!hideCloseButton && (
          <Box width="100%" display="flex" justifyContent="flex-end">
            <IconButton
              color="primary"
              size="small"
              sx={{ height: 32, width: 32, fontSize: 32 }}
              disabled={loading}
              onClick={handleClose}
            >
              <Close fontSize="inherit" />
            </IconButton>
          </Box>
        )}
        <Typography
          align="center"
          variant="h4"
          component="span"
          fontWeight="bold"
        >
          {header}
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ px: { xs: 6, sm: 12 }, pb: { xs: 6, sm: 12 } }}>
        {children}
      </DialogContent>
    </Dialog>
  );
};
