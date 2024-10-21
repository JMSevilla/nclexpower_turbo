/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import React, { useState } from "react";
import { Button } from "../../Button/Button";
import { DialogBox } from "../DialogBox";
import { Box, IconButton, Typography } from "@mui/material";
import { EvaIcon } from "../../EvaIcon";

type Props = {
  text: string;
  handleClose: () => void;
  handleDelete: () => void;
  isLoading: boolean;
};

const DeleteContent: React.FC<Props> = ({
  text,
  handleDelete,
  handleClose,
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
        width={80}
        height={80}
        ariaHidden
        fill="#D44333"
      />
      <Box
        height="80px"
        width="360px"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h4">{text}</Typography>
      </Box>
      <Box
        width="360px"
        display="flex"
        justifyContent="center"
        gap="25px"
        marginTop="10px"
      >
        <Button
          onClick={handleClose}
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
          onClick={handleDelete}
          loading={isLoading}
          size="medium"
          sx={{
            height: "45px",
            borderRadius: "10px",
            marginTop: "10px",
            width: "300px",
            textTransform: "none",
            backgroundColor: "#D44333",
            "&:hover": {
              backgroundColor: "#c23b2d",
            },
          }}
        >
          Confirm
        </Button>
      </Box>
    </Box>
  );
};

interface DeleteModalDialogProps {
  handleDelete: () => void;
  textContent: string;
  isIconButton: boolean;
  icon?: React.ReactNode;
  isLoading: boolean;
}

export default function DeleteModalDialog({
  textContent,
  ...rest
}: DeleteModalDialogProps) {
  const { handleDelete, isIconButton, icon, isLoading } = rest;
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Box data-testid="confirm-modal" onClick={handleClickOpen} role="button">
        {isIconButton == true ? (
          <IconButton>{icon}</IconButton>
        ) : (
          <Button
            sx={{
              backgroundColor: "#D44333",
              "&:hover": {
                backgroundColor: "#c23b2d",
              },
            }}
          >
            Delete
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
        <DeleteContent
          text={textContent}
          handleClose={handleClose}
          handleDelete={handleDelete}
          isLoading={isLoading}
        />
      </DialogBox>
    </>
  );
}
