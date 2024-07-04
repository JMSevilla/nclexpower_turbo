import React from 'react';
import { DataGrid } from 'core-library/components';
import { Typography, Card, CardContent } from '@mui/material';
import { IrtTableProps } from '../../../core/types/irtData';

interface Tables {
  tables: IrtTableProps[];
}

export const IrtTable: React.FC<Tables> = ({ tables }) => (
  <React.Fragment>
    {tables.map((table, index) => (
      <Card key={index} elevation={5} sx={{ my: 2 }}>
        <CardContent>
          <Typography fontStyle={'italic'} sx={{ fontWeight: 'bold', pb: 2 }}>
            {table.title}
          </Typography>
          <DataGrid rows={table.rows} columns={table.columns} isLoading={false} initPageSize={10} />
        </CardContent>
      </Card>
    ))}
  </React.Fragment>
);
