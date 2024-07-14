import React from 'react'
import { Alert, DataGrid } from 'core-library/components';
import { ReportedIssuesRows } from '../../../core/constant/reportIssueMock'
import { Box, Button, Container } from '@mui/material';
import { useColumns } from 'core-library/hooks';
import { useBusinessQueryContext } from 'core-library/contexts';
import { ReportedIssuesResponse } from 'core-library/api/types';




function ReportedIssues() {
    const { businessQueryGetAllReportedIssues } = useBusinessQueryContext()
    // const { data } = businessQueryGetAllReportedIssues(['getAllReportedIssues'])


    const data: ReportedIssuesResponse[] = [
        {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            ticketNumber: "string",
            email: "string",
            categoryId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            category: {
                id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                categoryName: "string",
                categoryDescription: "string",
                categoryType: 0,
                createdAt: "2024-07-10T12:00:27.428Z",
                updatedAt: "2024-07-10T12:00:27.428Z"
            },
            systemProduct: 0,
            description: "string",
            dateReported: "2024-07-10T12:00:27.428Z"
        }
    ]


    const { columns } = useColumns({
        columns: [
            {
                field: 'ticketNumber',
                headerName: 'Ticket No.',
                sortable: true,
                flex: 1
            },
            {
                field: 'email',
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
        ]
    })



    return (
        <Box>
            <Container>
                <Alert
                    severity="info"
                    title="Reported Issues"
                    description="Get lists all reported issues with their details for efficient tracking and management."
                />
                <Box bgcolor="white" pt={2}>
                    <DataGrid
                        rows={data ?? []}
                        columns={columns}
                        isLoading={false}
                        initPageSize={10}
                        getRowHeight={() => 'auto'}
                    />
                </Box>
            </Container>
        </Box>
    )
}

export default ReportedIssues