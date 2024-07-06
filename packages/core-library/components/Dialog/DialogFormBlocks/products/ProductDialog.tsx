import React from "react";
import { Box, Button } from "@mui/material";
import { DataGrid } from "../../../DataGrid/DataGrid";
import { useColumns } from "../../../../hooks";
import { useBusinessQueryContext } from "../../../../contexts";

interface Props {}

export const ProductDialog: React.FC<Props> = ({}) => {
  const { businessQueryGetAllPricing } = useBusinessQueryContext();
  const { data, isLoading } = businessQueryGetAllPricing(["selectAllPricing"]);
  const { columns } = useColumns({
    columns: [
      {
        field: "id",
        headerName: "ID",
        sortable: false,
        width: 320,
      },
      {
        field: "price",
        headerName: "Price",
        sortable: false,
        width: 120,
      },
      {
        field: "currency",
        headerName: "Currency",
        sortable: false,
        width: 150,
      },
    ],
  });
  return (
    <Box>
      <DataGrid
        columns={columns}
        rows={data ?? []}
        initPageSize={10}
        isLoading={isLoading}
      />
    </Box>
  );
};
