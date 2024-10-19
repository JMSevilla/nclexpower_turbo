import React from 'react';
import { DataGrid } from 'core-library/components';
import { IRTProps } from '../../../core/types/irtData';
import { useColumns } from 'core-library/hooks';
import { Typography } from '@mui/material';

export const IrtThethaZeroCumm = ({ accountId, title, data, isloading }: IRTProps) => {
  const { columns: IrtThethaZeroCummColumn } = useColumns({
    columns: [
      {
        field: 'id',
        headerName: 'ID',
        width: 150,
        sortable: true,
      },
      {
        field: 'seqNum',
        headerName: 'seqNum',
        width: 150,
        sortable: true,
      },
      {
        field: 'lastSumNum',
        headerName: 'lastSumNum',
        width: 150,
        sortable: true,
      },
      {
        field: 'lastSumDenom',
        headerName: 'lastSumDenom',
        width: 150,
        sortable: true,
      },
      {
        field: 'lastCumulativeTheta',
        headerName: 'lastCumulativeTheta',
        width: 150,
        sortable: true,
      },
      {
        field: 'accountId',
        headerName: 'accountId',
        width: 150,
        sortable: true,
      },
    ],
  });

  return (
    <React.Fragment>
      <Typography fontStyle={'italic'} sx={{ fontWeight: 'bold', py: 2 }}>
        {title}
      </Typography>
      <DataGrid columns={IrtThethaZeroCummColumn} rows={data ?? []} initPageSize={10} isLoading={isloading ?? false} />
    </React.Fragment>
  );
};
