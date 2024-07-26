import React from 'react';
import { CustomDialog } from '../CustomDialog';
import { useState, useEffect } from 'react';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import { useBusinessQueryContext } from 'core-library/contexts';
import { IrtExamLogs } from './IrtExamLogs';
import { IrtThethaZeroCumm } from './IrtZeroCumm';
import { useSessionStorage } from 'core-library/hooks';
import { Card, CardContent, Button, Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { DataTable, DataTableHeader } from 'core-library/components';
import { IrtThetaCalcScratch } from './IrtThetaCalcScratch';
import { ThetaCalcScratchResponse } from 'core-library/api/types';
import { useApplicationContext } from '../../../core/context/AppContext';

export const IRTsModal: React.FC = () => {
  const [getAccountId] = useSessionStorage<string | null>('accountId', null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [showDelete, setShowDelete] = useState(false);

  const router = useRouter();

  const {
    businessQueryDeleteAllCalc,
    businessQueryGetIrtExamLogs,
    businessQueryGetIrtZeroCalc,
    businessQueryGetThetaCalcScratch,
  } = useBusinessQueryContext();

  const { setDisplayNextItem } = useApplicationContext();

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

  const {
    data: getIrtThetaCalcScratch,
    isLoading: ThetaCalcLoading,
    refetch: ThetaCalcRefetch,
  } = businessQueryGetThetaCalcScratch(['IrtThetaCalcScratch'], getAccountId ?? '');

  const { mutateAsync } = businessQueryDeleteAllCalc();

  async function deleteAllCalc() {
    await mutateAsync(getAccountId ?? '');
    IrtExamLogsrefetch();
    ZeroCalcRefetch();
    ThetaCalcRefetch();
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

  const tableHeaders: DataTableHeader[] = [
    { name: 'seqNum', width: 150, align: 'left' },
    { name: 'qlNum', width: 150, align: 'left' },
    { name: 'aDisc', width: 150, align: 'left' },
    { name: 'bDiff', width: 150, align: 'left' },
    { name: 'cGuess', width: 150, align: 'left' },
    { name: 'response', width: 150, align: 'left' },
    { name: 'inclusion', width: 150, align: 'left' },
    { name: 'eventLNum', width: 150, align: 'left' },
  ];

  const totalItems = getIrtThetaCalcScratch ? getIrtThetaCalcScratch.length : 0;
  const totalPages = Math.ceil(totalItems / pageSize);
  const paginatedData = getIrtThetaCalcScratch?.slice((currentPage - 1) * pageSize, currentPage * pageSize) ?? [];

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  useEffect(() => {
    if (IrtZeroCalcData?.length || IrtExamLogsData?.length) {
      setShowDelete(true);
      return;
    }
    setShowDelete(false);
  }, [IrtZeroCalcData, IrtExamLogsData]);

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
        {showDelete && (
          <Button onClick={deleteAllCalc} variant="contained" color="error">
            DELETE ALL
          </Button>
        )}

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

            <Box>
              <Typography fontStyle={'italic'} sx={{ fontWeight: 'bold', py: 2 }}>
                THETA CALC SCRATCH
              </Typography>
              <DataTable
                data={[paginatedData ?? []]}
                id="THETA CALC SCRATCH"
                tableHeaders={tableHeaders}
                bodyRowComponent={(data: ThetaCalcScratchResponse[], key: number) => (
                  <IrtThetaCalcScratch
                    data={data}
                    key={key}
                    accountId={getAccountId ?? ''}
                    isloading={ThetaCalcLoading}
                  />
                )}
                onNextPage={handleNextPage}
                onPreviousPage={handlePreviousPage}
                pagination={{
                  pageNumber: currentPage,
                  pageSize,
                  totalPages,
                  totalItems,
                  hasNextPage: currentPage < totalPages,
                  hasPreviousPage: currentPage > 1,
                }}
              />
            </Box>
          </CardContent>
        </Card>
      </CustomDialog>
    </React.Fragment>
  );
};
