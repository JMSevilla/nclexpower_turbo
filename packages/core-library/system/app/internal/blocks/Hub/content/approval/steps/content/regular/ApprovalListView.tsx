import React from "react";
import { Alert, Card, DataGrid } from "../../../../../../../../../../components";
import { Box, Container, IconButton } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useColumns } from 'core-library/hooks';

interface Props {
  nextStep(values: {}): void;
  previousStep(): void;
  values: {};
}

const mockData = [
  {
    id: "Testing123",
    contentId: "testing123",
    author: {
      id: "123456",
    },
  }
];

export const ApprovalListView: React.FC<Props> = ({ nextStep }) => {
    const { columns } = useColumns({
      columns: [
        {
          field: 'id',
          headerName: 'ID',
          minWidth: 140,
          flex: 1,
        },
        {
          field: 'contentId',
          headerName: 'Content ID',
          minWidth: 200,
          flex: 1,
        },
        {
          field: 'author.id',
          headerName: 'Author ID',
          minWidth: 200,
          flex: 1,
          renderCell: (params) => params.row.author.id,
        },
        {
          field: 'actions',
          headerName: 'Actions',
          minWidth: 300,
          flex: 1,
          renderCell: (params) => (
            <Box>
                <IconButton
                  sx={{ mt: 2, mb: 2, ml: 2 }}
                  onClick={() => handleApproval(params.row)}
                >
                   <MoreVertIcon fontSize="small"/>
                </IconButton>
            </Box>
          ),
        },
      ],
    });

    const handleApproval = (rowData: any) => {
      console.log("Approved", rowData);
    };

  return(
  <Box>
      <Container>
        <Alert
          severity="info"
          title="Manage Approvals"
          description="View and manage the approval list, including content revisions and schedules."
        />
        <Card sx={{ mt: 5, p: 4, width:"100%" }} elevation={5}>
          <DataGrid
            columns={columns}
            initPageSize={10}
            rows={mockData}
            isLoading={false}
            data-testid="approval-list-grid"
          />
        </Card>
      </Container>
    </Box>
  );
};
