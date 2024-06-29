import { CustomDialog } from '../CustomDialog';
import { useState } from 'react';
import { Button } from '@mui/material';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import { TableIRTExamLogs } from './ExamLogs/TableIRTLogs';
import { useEffect } from 'react';
import { ThetaCompScratch } from './ThetaComputation/ThetaCompScratch';
import { ThetaZeroCom } from './ThetaZero/ThetaZeroComp';

export const IRTsDialog: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      handleClose();
    }
  };

  const handleOutsideClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target.closest('.MuiDialog-root') === null) {
      handleClose();
    }
  };

  useEffect(() => {
    if (open) {
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [open]);

  return (
    <>
      <Button onClick={handleClickOpen} sx={{ color: '#F3F3F3' }}>
        <TextSnippetIcon fontSize="medium" />
      </Button>

      <CustomDialog
        open={open}
        aria-labelledby="responsive-dialog-title"
        title="SAMPLE DATA"
        className="report-issue"
        maxWidth="lg"
        content={
          <>
            <TableIRTExamLogs title="IRT-EXAM-LOG" />
            <ThetaCompScratch title="IRT-THETA-COMP-SCRATCH" />
            <ThetaZeroCom title="IRT-THETA-ZERO-CUMULATIVE" />
          </>
        }
        button={
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
        }
        onClose={handleClose}
      />
    </>
  );
};
