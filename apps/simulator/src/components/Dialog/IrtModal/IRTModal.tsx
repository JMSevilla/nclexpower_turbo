import React from 'react';
import { CustomDialog } from '../CustomDialog';
import { useState } from 'react';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import { useBusinessQueryContext } from 'core-library/contexts';
import { IrtExamLogs } from './IrtExamLogs';
import { IrtThethaZeroCumm } from './IrtZeroCumm';
import { useSessionStorage } from 'core-library/hooks';
import { Card, CardContent, Button } from '@mui/material';
import { useRouter } from 'next/router';
import { useApplicationContext } from '../../../core/context/AppContext';

export const IRTsModal: React.FC = () => {
  const [getAccountId] = useSessionStorage<string | null>('accountId', null);

  const { setDisplayNextItem } = useApplicationContext();

  const router = useRouter();

  const { businessQueryDeleteAllCalc, businessQueryGetIrtExamLogs, businessQueryGetIrtZeroCalc } =
    useBusinessQueryContext();

  const {
    data: IrtExamLogsData,
    isLoading: ExamlogsLoading,
    refetch: IrtExamLogsrefetch,
  } = businessQueryGetIrtExamLogs(['IrtExamLogs'], getAccountId ?? '');

  const {
    data: IrtZeroCalcData,
    isLoading: zeroCalcLoading,
    refetch: ZeroCalcRefetch,
  } = businessQueryGetIrtZeroCalc(['IrtZeroCalc'], getAccountId ?? '');

  const { mutateAsync } = businessQueryDeleteAllCalc();

  async function deleteAllCalc() {
    await mutateAsync(getAccountId ?? '');
    IrtExamLogsrefetch();
    ZeroCalcRefetch();
    setDisplayNextItem(false);
    router.push({
      pathname: '/simulator',
      query: {
        slug: ['B850483A-AC8D-4DAE-02C6-08DC5B07A84C', 'C002B561-66AF-46FC-A4D2-D282D42BD774', 'false'],
      },
    });
  }

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
      >
        <Button onClick={deleteAllCalc} variant="contained" color="error">
          DELETE ALL
        </Button>

        <Card elevation={5} sx={{ my: 2 }}>
          <CardContent>
            <IrtExamLogs
              data={IrtExamLogsData ?? []}
              isloading={ExamlogsLoading}
              accountId={getAccountId ?? ''}
              title="IRTEXAMLOGS"
            />
            <IrtThethaZeroCumm
              data={IrtZeroCalcData ?? []}
              isloading={zeroCalcLoading}
              accountId={getAccountId ?? ''}
              title="IRTThetaZeroCumm"
            />
          </CardContent>
        </Card>
      </CustomDialog>
    </React.Fragment>
  );
};
