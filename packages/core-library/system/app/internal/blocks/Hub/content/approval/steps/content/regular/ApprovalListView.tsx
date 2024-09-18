import React, { useState } from "react";
import {
  Alert,
  AnimatedBoxSkeleton,
  Button,
  Card,
  ReactTable,
} from "../../../../../../../../../../components";
import { Box, Container, ListItemButton, Switch } from "@mui/material";
import { useBusinessQueryContext } from "../../../../../../../../../../contexts";
import { useAccountId } from "../../../../../../../../../../contexts/auth/hooks";
import { GridMoreVertIcon, GridRenderCellParams } from "@mui/x-data-grid";
import { ColumnDef, Row, RowModel } from '@tanstack/react-table';
import { AuthorizedContentsResponseType } from '../../../../../../../../../../api/types';
import { CustomPopover } from '../../../../../../../../../../components/Popover/Popover';

export interface ApprovalProps {
  nextStep({ }): void;
  previousStep(): void;
  values: {};
}

export const ApprovalListView: React.FC<ApprovalProps> = ({ nextStep }) => {
  const [getAccountId] = useAccountId();
  const [multiple, setMultiple] = useState<boolean>(false);
  const accountId = getAccountId ?? "no-account-id";
  const { businessQueryGetContents } = useBusinessQueryContext();
  const [selectedRows, setSelectedRows] = useState<Row<AuthorizedContentsResponseType>[]>()
  const { data, isLoading } = businessQueryGetContents(["getAuthorizeContentContents"], {
    MainType: "Regular",
    AccountId: accountId,
  });

  const columns: ColumnDef<AuthorizedContentsResponseType>[] = [
    {
      id: "id",
      header: 'ID',
      accessorKey: 'id',
      enablePinning: true,
    },
    {
      id: 'contentsId',
      header: 'ContentID',
      accessorKey: 'contentId',
    },
    {
      id: 'authorId',
      header: 'Author Id',
      accessorKey: 'author.id',
    },
    {
      id: 'mainContentType',
      header: 'Main Type',
      accessorKey: 'mainContent.mainType',
    },
    {
      id: 'mainContentStatus',
      header: 'Status',
      accessorKey: 'mainContentStatus',
    },
    {
      id: 'createdDate',
      header: 'Created At',
      accessorKey: 'createdDate',
    },
    {
      id: "action",
      header: 'Actions',
      cell: (params) => (
        <Box>

          <CustomPopover open={true} label='Actions' icon={<GridMoreVertIcon fontSize="small" />}>

            <ListItemButton sx={{ bgcolor: 'green', color: 'white' }}>Approve</ListItemButton>
            <ListItemButton sx={{ bgcolor: 'red', color: 'white' }}>Reject</ListItemButton>
          </CustomPopover>
        </Box>
      )
    },
  ]

  const handleSelectedRows = (rowData: RowModel<AuthorizedContentsResponseType>) => {
    setSelectedRows(rowData.rows)
  };

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
            <Box paddingY={4}>
              <Button onClick={() => handleSelection()}>Review Content</Button>
            </Box>
          </Box>
          <ReactTable<AuthorizedContentsResponseType>
            rightPinnedIds={["action"]}
            checkBoxSelection={multiple}
            selectedRows={handleSelectedRows}
            columns={columns} data={data ?? []} />
        </Card>
      </Container>
    </Box>
  );
};
