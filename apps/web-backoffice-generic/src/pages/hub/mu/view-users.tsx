import React from 'react';
import { Alert, DataGrid } from 'core-library/components';
import { Box, Card, Container, Typography } from '@mui/material';
import { useColumns } from 'core-library/hooks';
import { useBusinessQueryContext } from 'core-library/contexts';
import { useDateFormat } from '../../../core/hooks';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ViewUsers() {
  const { businessQueryGetAllInternalAccount } = useBusinessQueryContext();
  const { data } = businessQueryGetAllInternalAccount(['getAllInternalAccount']);
  const { getFormattedDate } = useDateFormat();

  const { columns } = useColumns({
    columns: [
      {
        field: 'tokenizeInformation.email',
        headerName: 'Email',
        minWidth: 250,
        flex: 1,
        renderCell: (rows) => {
          const { tokenizeInformation } = rows.row;
          return <Typography sx={{ textDecoration: 'underline', alignItems: 'center' }}>{tokenizeInformation.email}</Typography>;
        }
      },
      {
        field: 'tokenizeInformation.firstname',
        headerName: 'First Name',
        flex: 1,
        renderCell: (rows) => {
          const { tokenizeInformation } = rows.row;
          return <Typography>{tokenizeInformation.firstname}</Typography>;
        }
      },
      {
        field: 'tokenizeInformation.middlename',
        headerName: 'Middle Name',
        flex: 1,
        renderCell: (rows) => {
          const { tokenizeInformation } = rows.row;
          return tokenizeInformation.middlename;
        }
      },
      {
        field: 'tokenizeInformation.lastname',
        headerName: 'Last Name',
        flex: 1,
        renderCell: (rows) => {
          const { tokenizeInformation } = rows.row;
          return tokenizeInformation.lastname;
        }
      },
      {
        field: 'accessGroup.accessLevel',
        headerName: 'Access Level',
        flex: 1,
        renderCell: (params) => {
          const { accessGroup } = params.row;
          return <Typography sx={{ textAlign: 'center' }}>{accessGroup.accessLevel}</Typography>;
        }
      },
      {
        field: 'createdAt',
        headerName: 'Created At',
        flex: 1,
        sortable: true,
        minWidth: 200,
        valueGetter: (date) => getFormattedDate(date)
      },
      {
        field: 'actions',
        headerName: 'Actions',
        flex: 1,
        sortable: false,
        filterable: false,
        renderCell: () => {
          return (
            <>
              <EditIcon sx={{ color: '#ffd000', fontSize: '1.5rem' }} />
              <DeleteIcon sx={{ color: '#ef233c', fontSize: '1.5rem' }} />
            </>
          );
        }
      },
    ],
  });

  return (
    <Box>
      <Container>
        <Alert
          severity="info"
          title="Manage Internal Users"
          description="Get lists all internal users with their details for efficient tracking and management."
        />
        <Card elevation={4}>
          <DataGrid
            rows={data ?? []}
            columns={columns}
            isLoading={false}
            initPageSize={10}
            getRowHeight={() => 'auto'}
            sx={{
              boxShadow: 2,
              border: 1,
              padding: 4
            }}
            data-testid="data-grid"
          />
        </Card>
      </Container>
    </Box>
  );
}
