import React from 'react'
import { Alert, DataGrid } from 'core-library/components';
import { ReportedIssuesRows } from '../core/constant/reportIssueMock'
import { Box, Button } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';


function ReportedIssues() {

    const columns: GridColDef[] = [
        {
            field: 'ticket_id',
            headerName: 'Ticket',
            sortable: true,
            flex: 1
        },
        {
            field: 'customer_email',
            headerName: 'Customer Email',
            flex: 1,
            sortable: true,
        },
        {
            field: 'category',
            headerName: 'Category',
            flex: 1,
            sortable: true,
        },
        {
            field: 'product',
            headerName: 'Product',
            flex: 1,
            sortable: true,

        },
        {
            field: 'report_date',
            headerName: 'Date Reported',
            flex: 1,
            sortable: true,
        },
        {
            field: 'description',
            headerName: 'Description',
            sortable: true,
            flex: 2
        },
        {
            field: '',
            headerName: '',
            sortable: false,
            flex: 1,
            disableColumnMenu: true,
            renderCell: () => (
                <Box display='flex' justifyContent="center" alignItems='center' height="100%">
                    <Button sx={{ height: 'fit-content' }}>View Details</Button>
                </Box>
            )
        },
    ];



    return (
        <Box minHeight={'100%'} >
            <Alert
                severity="info"
                title="Reported Issues"
                description="Get lists all reported issues with their details for efficient tracking and management."
            />

            <Box bgcolor="white" pt={2}>
                <DataGrid
                    rows={ReportedIssuesRows}
                    columns={columns}
                    isLoading={false}
                    initPageSize={10}
                    getRowHeight={() => 'auto'}
                />
            </Box>
        </Box>
    )
}

export default ReportedIssues