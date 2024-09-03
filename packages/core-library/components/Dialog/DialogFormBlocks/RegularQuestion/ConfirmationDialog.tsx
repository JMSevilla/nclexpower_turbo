import React, { useState } from "react";
import { Button } from "../../../Button/Button";
import { DialogBox } from "../../DialogBox";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Box, Typography } from "@mui/material";

type Props = {
  onClick: () => void;
  handleSubmit: () => void;
  dialogContent: string;
  confirmButtonText?: string;
  isLoading: boolean;
};

const ContinueModalContent: React.FC<Props> = ({
  onClick,
  handleSubmit,
  dialogContent,
  confirmButtonText,
  isLoading,
}) => {
  return (
    <Box
      width="100%"
      height="100%"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <ErrorOutlineIcon
        style={{
          fontSize: "75px",
          color: "#FCC019",
        }}
      />
      <Box
        height="80px"
        width="360px"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h4">{dialogContent}</Typography>
      </Box>
      <Box
        width="360px"
        display="flex"
        justifyContent="center"
        gap="25px"
        marginTop="10px"
      >
        <Button
          onClick={onClick}
          type="Secondary"
          size="medium"
          sx={{
            height: "45px",
            borderRadius: "10px",
            marginTop: "10px",
            width: "300px",
            textTransform: "none",
          }}
        >
          Cancel
        </Button>
        <Button
          loading={isLoading}
          onClick={handleSubmit}
          size="medium"
          sx={{
            height: "45px",
            borderRadius: "10px",
            marginTop: "10px",
            width: "300px",
            textTransform: "none",
          }}
        >
          {confirmButtonText || "Submit"}
        </Button>
      </Box>
    </Box>
  );
};

interface ConfirmationModalProps {
  handleSubmit: () => void;
  customButton: React.ReactElement | React.ReactNode;
  dialogContent: string;
  confirmButtonText?: string;
  isLoading: boolean;
}

export default function ConfirmationModal({
  handleSubmit,
  dialogContent,
  customButton,
  confirmButtonText,
  isLoading,
}: ConfirmationModalProps) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Box onClick={handleClickOpen} role="button">
        {customButton}
      </Box>
      <DialogBox
        handleClose={handleClose}
        loading={false}
        maxWidth="sm"
        open={open}
        hideCloseButton={false}
        sx={{ zIndex: 1 }}
      >
        <ContinueModalContent
          dialogContent={dialogContent}
          onClick={handleClose}
          handleSubmit={handleSubmit}
          confirmButtonText={confirmButtonText}
          isLoading={isLoading}
        />
      </DialogBox>
    </>
  );
}
