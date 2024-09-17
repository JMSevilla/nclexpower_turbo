import React, { useState } from "react";
import {
  Alert,
  Button,
  Card,
  DataGrid,
} from "../../../../../../../../../../components";
import { Box, Container, IconButton, Switch } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useColumns } from "core-library/hooks";
import { useBusinessQueryContext } from "../../../../../../../../../../contexts";
import { useAccountId } from "../../../../../../../../../../contexts/auth/hooks";
import { GridRenderCellParams } from "@mui/x-data-grid";

export interface ApprovalProps {
  nextStep({}): void;
  previousStep(): void;
  values: {};
}

export const ApprovalListView: React.FC<ApprovalProps> = ({ nextStep }) => {
  const [getAccountId] = useAccountId();
  const [multiple, setMultiple] = useState<boolean>(false);
  const accountId = getAccountId ?? "no-account-id";
  const { businessQueryGetContents } = useBusinessQueryContext();
  const { data } = businessQueryGetContents(["getAuthorizeContentContents"], {
    MainType: "Regular",
    AccountId: accountId,
  });

  const { columns } = useColumns({
    columns: [
      {
        field: "id",
        headerName: "ID",
        minWidth: 140,
        flex: 1,
      },
      {
        field: "contentId",
        headerName: "Content ID",
        minWidth: 200,
        flex: 1,
      },
      {
        field: "author.id",
        headerName: "Author ID",
        minWidth: 200,
        flex: 1,
        renderCell: (params) => params.row.author.id,
      },
      {
        field: "actions",
        headerName: "Actions",
        minWidth: 300,
        flex: 1,
        renderCell: (params) => (
          <Box>
            <IconButton
              sx={{ mt: 2, mb: 2, ml: 2 }}
              onClick={() => handleApproval(params)}
            >
              <MoreVertIcon fontSize="small" />
            </IconButton>
          </Box>
        ),
      },
    ],
  });

  const handleApproval = (rowData: GridRenderCellParams) => {};

  const handleMultipleSelection = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMultiple(event.target.checked);
  };

  const handleSelection = () => {
    nextStep({});
  };

  return (
    <Box>
      <Container>
        <Alert
          severity="info"
          title="Manage Approvals"
          description="View and manage the approval list, including content revisions and schedules."
        />
        <Card sx={{ mt: 5, p: 4, width: "100%" }} elevation={5}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box display="flex">
              <Switch checked={multiple} onChange={handleMultipleSelection} />{" "}
              Multiple Selection
            </Box>
            <Box>
              <Button onClick={() => handleSelection()}>Review Content</Button>
            </Box>
          </Box>

          <DataGrid
            checkboxSelection={true}
            columns={columns}
            initPageSize={10}
            rows={data ?? []}
            isLoading={false}
            data-testid="approval-list-grid"
          />
        </Card>
      </Container>
    </Box>
  );
};
