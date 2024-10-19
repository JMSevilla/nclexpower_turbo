/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import React from "react";
import { Box, Container } from "@mui/material";
import { Card, DataGrid } from "core-library/components";
import { useColumns } from "core-library/hooks";

export const CaseStudyApproval: React.FC = () => {
  const { columns } = useColumns({
    columns: [
      {
        field: "authorId",
        headerName: "Author ID",
        sortable: true,
        width: 150,
      },
      {
        field: "authorName",
        headerName: "Author Name",
        sortable: false,
        width: 150,
      },
      {
        field: "contentId",
        headerName: "Content ID",
        sortable: false,
        width: 150,
      },

      {
        field: "comment",
        headerName: "Comment",
        sortable: false,
        width: 150,
      },

      {
        field: "status",
        headerName: "Status",
        sortable: false,
        width: 150,
      },
      {
        field: "createdAt",
        headerName: "Created At",
        sortable: false,
        width: 150,
      },
    ],
  });

  return (
    <Box>
      <Container>
        <Card sx={{ mt: 5, width: "100%" }} elevation={5}>
          <DataGrid
            columns={columns}
            initPageSize={10}
            rows={[]}
            isLoading={false}
          />
        </Card>
      </Container>
    </Box>
  );
};
