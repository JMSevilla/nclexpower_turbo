 /**
* Property of the NCLEX Power.
* Reuse as a whole or in part is prohibited without permission.
* Created by the Software Strategy & Development Division
*/
import React from "react";
import { Alert, DataGrid } from "core-library/components";
import { Box, Card, Container } from "@mui/material";
import { useColumns } from "core-library/hooks";
import { useDateFormat } from "../core/hooks";

export function ProgramManagementBlock() {
  const { getFormattedDate } = useDateFormat();

  const { columns } = useColumns({
    columns: [
      {
        field: "tokenizeInformation.email",
        headerName: "Email",
        minWidth: 250,
        flex: 1,
        renderCell: (rows) => {
          const { tokenizeInformation } = rows.row;
          return tokenizeInformation.email;
        },
      },
      {
        field: "tokenizeInformation.firstname",
        headerName: "First Name",
        flex: 1,
        renderCell: (rows) => {
          const { tokenizeInformation } = rows.row;
          return tokenizeInformation.firstname;
        },
      },
      {
        field: "tokenizeInformation.middlename",
        headerName: "Middle Name",
        flex: 1,
        renderCell: (rows) => {
          const { tokenizeInformation } = rows.row;
          return tokenizeInformation.middlename;
        },
      },
      {
        field: "tokenizeInformation.lastname",
        headerName: "Last Name",
        flex: 1,
        renderCell: (rows) => {
          const { tokenizeInformation } = rows.row;
          return tokenizeInformation.lastname;
        },
      },
      {
        field: "accessGroup.accessLevel",
        headerName: "Access Level",
        flex: 1,
        renderCell: (params) => {
          const { accessGroup } = params.row;
          return (
            <span className="flex justify-center">
              {accessGroup.accessLevel}
            </span>
          );
        },
      },
      {
        field: "createdAt",
        headerName: "Created At",
        flex: 1,
        sortable: true,
        minWidth: 200,
        valueGetter: (date) => getFormattedDate(date),
      },
    ],
  });

  return (
    <Box>
      <Container>
        <Alert
          severity="info"
          title="Manage Programs"
          description="View and manage all internal programs, including detailed information about each user, for efficient tracking and oversight."
        />
        <Card sx={{ mt: 5, width: "100%", padding: 4 }} elevation={5}>
          <DataGrid
            columns={columns}
            initPageSize={10}
            rows={[]}
            isLoading={false}
            data-testid="data-grid"
          />
        </Card>
      </Container>
    </Box>
  );
}
