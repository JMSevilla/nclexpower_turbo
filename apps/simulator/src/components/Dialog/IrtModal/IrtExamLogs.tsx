import React from 'react';
import { DataGrid } from 'core-library/components';
import { IRTProps } from '../../../core/types/irtData';
import { useColumns } from 'core-library/hooks';
import { Typography } from '@mui/material';

export const IrtExamLogs = ({ accountId, title, data, isloading }: IRTProps) => {
  const { columns: IrtExamLogsCOLUMN } = useColumns({
    columns: [
      {
        field: 'id',
        headerName: 'ID',
        width: 0,
        sortable: true,
      },
      {
        field: 'eventLNum',
        headerName: 'EventLNum',
        width: 120,
        sortable: true,
      },
      {
        field: 'lineNum',
        headerName: 'LineNum',
        width: 120,
        sortable: true,
      },
      {
        field: 'itemID',
        headerName: 'ItemID',
        width: 120,
        sortable: true,
      },
      {
        field: 'response',
        headerName: 'Response',
        width: 120,
        sortable: true,
      },
      {
        field: 'lineTheta',
        headerName: 'LineTheta',
        width: 120,
        sortable: true,
      },
      {
        field: 'lineSEM',
        headerName: 'LineSEM',
        width: 120,
        sortable: true,
      },
      {
        field: 'aDisc',
        headerName: 'ADisc',
        width: 120,
        sortable: true,
      },
      {
        field: 'bDiff',
        headerName: 'BDiff',
        width: 120,
        sortable: true,
      },
      {
        field: 'cnCateg',
        headerName: 'CNCateg',
        width: 120,
        sortable: true,
      },
    ],
  });

  return (
    <React.Fragment>
      <Typography fontStyle={'italic'} sx={{ fontWeight: 'bold', pb: 2 }}>
        {title}
      </Typography>
      <DataGrid columns={IrtExamLogsCOLUMN} rows={data ?? []} initPageSize={10} isLoading={isloading ?? false} />
    </React.Fragment>
  );
};
