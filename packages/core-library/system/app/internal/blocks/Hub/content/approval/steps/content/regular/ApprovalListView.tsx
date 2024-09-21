import React, { useState } from "react";
import {
  Button,
  Card,
  ReactTable,
} from "../../../../../../../../../../components";
import { Box, Container, ListItemButton, Switch, IconButton, Typography } from "@mui/material";
import { useBusinessQueryContext } from "../../../../../../../../../../contexts";
import { useAccountId } from "../../../../../../../../../../contexts/auth/hooks";
import { GridMoreVertIcon } from "@mui/x-data-grid";
import { ColumnDef, Row, RowModel } from '@tanstack/react-table';
import { AuthorizedContentsResponseType } from '../../../../../../../../../../api/types';
import { CustomPopover } from '../../../../../../../../../../components/Popover/Popover';
import { useForm } from "react-hook-form"
import { data } from "../mockdata";


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
  const { isLoading } = businessQueryGetContents(["getAuthorizeContentContents"], {
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

          <CustomPopover open={true} label='Actions' withIcon iconButton={<GridMoreVertIcon fontSize="small" />}>
            <ListItemButton onClick={handleSelection} sx={{ bgcolor: 'white', color: 'black' }}>View</ListItemButton>
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
        <Card sx={{ mt: 5, p: 4, width: "100%" }} elevation={5}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box display="flex">
              <Switch checked={multiple} onChange={handleMultipleSelection} />
              Multiple Selection
            </Box>
            <Box paddingY={4}>
              <CustomPopover
                open={true}
                withIcon={true}
                iconButton={<GridMoreVertIcon fontSize="small" />}
                sx={{
                  px: 4,
                  py: 2,
                  backgroundColor: "#343a40",
                  borderRadius: "10px",
                  color: '#F3F3F3',
                  '&:hover': {
                    backgroundColor: '#212529',
                  },
                }}>
              <ListItemButton onClick={handleSelection} sx={{ bgcolor: 'green', color: 'white' }}>Approve</ListItemButton>
              <ListItemButton sx={{ bgcolor: 'red', color: 'white' }}>Reject</ListItemButton>
                </CustomPopover>
            </Box>
          </Box>
          <ReactTable<AuthorizedContentsResponseType>
            rightPinnedIds={["action"]}
            checkBoxSelection={multiple}
            selectedRows={handleSelectedRows}
            columns={columns} 
            data={data ?? []} 
              />
        </Card>
      </Container>
    </Box>
  );
};
