import React, { useState } from "react";
import { Button } from "../../../Button/Button"; // Make sure this path is correct
import { DialogBox } from "core-library/components/Dialog/DialogBox"; // Ensure this component is imported correctly
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Box, Typography } from "@mui/material";
import { ContainedRegularQuestionType } from "../../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/content/simulator/types"; // Ensure this import path is correct

type Props = {
  onClick: () => void;
  handleSubmit: () => void;
};

const ContinueModalContent: React.FC<Props> = ({ onClick, handleSubmit }) => {
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
          fontSize: "65px",
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
        <Typography variant="h4">Are you sure you want to continue?</Typography>
      </Box>
      <Box
        width="360px"
        display="flex"
        justifyContent="center"
        gap="25px"
        marginTop="10px"
      >
        <Button onClick={onClick} type="Secondary" size="medium">
          Cancel
        </Button>
        <Button onClick={handleSubmit} size="medium">
          Submit
        </Button>
      </Box>
    </Box>
  );
};

interface ConfirmationModalProps {
  handleSubmit: () => void;
}

export default function ConfirmationModal({
  handleSubmit,
}: ConfirmationModalProps) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button onClick={handleClickOpen}>Continue</Button>
      <DialogBox
        handleClose={handleClose}
        loading={false}
        maxWidth="sm"
        open={open}
        hideCloseButton={false}
        sx={{ zIndex: 1 }}
      >
        <ContinueModalContent
          onClick={handleClose}
          handleSubmit={handleSubmit}
        />
      </DialogBox>
    </>
  );
}
