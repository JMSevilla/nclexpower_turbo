import React from 'react';
import { CustomDialog } from '../CustomDialog';
import { useState } from 'react';
import { Button } from '@mui/material';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import { tables } from '../../../core/constant/IRTsMockData';
import { IrtTable } from './IrtTable';

export const IRTsDialog: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button onClick={handleClickOpen} sx={{ color: '#F3F3F3' }}>
        <TextSnippetIcon fontSize="medium" />
      </Button>

      <CustomDialog
        close={handleClose}
        open={open}
        aria-labelledby="responsive-dialog-title"
        title="SAMPLE DATA"
        className="report-issue"
        maxWidth="lg"
        button={
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
        }
        content={<IrtTable tables={tables} />}
      ></CustomDialog>
    </React.Fragment>
  );
};
