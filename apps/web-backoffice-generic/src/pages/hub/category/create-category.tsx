import React from "react";
import withAuth from "core-library/core/utils/withAuth";
import { Container, Box, Typography, Chip } from "@mui/material";
import { Alert, Card, DataGrid, Button } from "core-library/components";
import {
  useBusinessQueryContext,
  useDialogContext,
} from "core-library/contexts";
import { useColumns } from "core-library/hooks";

const CreateCategoryMainPage: React.FC = () => {
  const { businessQuerySelectAllCategories, businessQueryDeleteCategory } =
    useBusinessQueryContext();
  const { openDialog } = useDialogContext();
  const { mutateAsync } = businessQueryDeleteCategory();
  const { data, isLoading, refetch } = businessQuerySelectAllCategories([
    "selectAllCategories",
  ]);
  const { columns } = useColumns({
    columns: [
      {
        field: "id",
        headerName: "ID",
        sortable: true,
        width: 300,
      },
      {
        field: "categoryName",
        headerName: "Category",
        sortable: false,
        width: 150,
      },
      {
        field: "categoryDescription",
        headerName: "Category Description",
        sortable: false,
        width: 250,
      },
      {
        field: "categoryType",
        headerName: "Type",
        sortable: false,
        width: 150,
        renderCell: (params) => {
          if (params.row.categoryType == 0) {
            return <Chip variant="filled" size="small" label="PRICING" />;
          } else {
            return <Chip variant="filled" size="small" label="REPORT ISSUE" />;
          }
        },
      },
      {
        field: "",
        headerName: "Action",
        sortable: false,
        width: 150,
        renderCell: (params) => {
          return (
            <Box sx={{ display: "inline" }}>
              <Button
                variant="text"
                onClick={async () => await deleteCategory(params.row.id)}
              >
                Delete
              </Button>
            </Box>
          );
        },
      },
    ],
  });

  return (
    <Box>
      <Container>
        <Alert
          severity="info"
          title="Category Management"
          description="You can create your category for the entire application."
        />
      </Container>
      <Button
        sx={{ float: "right", mt: 2, mb: 2 }}
        onClick={() => openDialog("category_form", "Category Form")}
      >
        Create
      </Button>
      <Card sx={{ mt: 5, width: "100%" }} elevation={5}>
        <Typography variant="body1">Category List</Typography>
        <hr />
        <DataGrid
          columns={columns}
          initPageSize={10}
          rows={data ?? []}
          isLoading={isLoading}
        />
      </Card>
    </Box>
  );

  async function deleteCategory(id: string) {
    await mutateAsync(id);
    refetch();
  }
};

export default withAuth(CreateCategoryMainPage);
