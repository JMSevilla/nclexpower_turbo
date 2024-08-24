import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useMemo } from "react";

type ColumnConfig = GridColDef & {
  renderCell?: (params: GridRenderCellParams) => JSX.Element;
};

interface UseColumnsParams {
  columns: ColumnConfig[];
}

export const useColumns = ({ columns }: UseColumnsParams) => {
  const memoizedColumns: GridColDef[] = useMemo(() => columns, [columns]);
  return {
    columns: memoizedColumns,
  };
};
