/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import React, { ReactElement, ReactNode, useState } from "react";
import { Button } from "../../../Button/Button";
import { DialogBox } from "../../DialogBox";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Box, Typography } from "@mui/material";
import { EvaIcon } from "../../../EvaIcon";

type Props = {
  onClick: () => void;
  handleSubmit: () => void;
  dialogContent: string | ReactElement | ReactNode;
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
      <EvaIcon
        name="alert-triangle-outline"
        width={82}
        height={82}
        fill="#FCC019"
        aria-hidden
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
  dialogContent: string | ReactElement | ReactNode;
  confirmButtonText?: string;
  isLoading: boolean;
  disabled?: boolean;
}

const ConfirmationModal = ({
  handleSubmit,
  dialogContent,
  customButton,
  confirmButtonText,
  isLoading,
  disabled,
}: ConfirmationModalProps) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Box data-testid="confirm-modal" onClick={handleClickOpen} role="button">
        {customButton == "Continue" ? (
          <Button disabled={disabled}>Continue</Button>
        ) : customButton == "Delete" ? (
          <Button
            disabled={disabled}
            sx={{
              bgcolor: "red",
              "&:hover": {
                bgcolor: "#aa0000",
              },
            }}
          >
            Delete
          </Button>
        ) : (
          <Button sx={{ zIndex: 2 }}>
            <EvaIcon
              name="arrow-back-outline"
              width={22}
              height={22}
              fill="#37BEC7"
              aria-hidden
            />
            <Typography>Previous</Typography>
          </Button>
        )}
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
};

export default ConfirmationModal;
