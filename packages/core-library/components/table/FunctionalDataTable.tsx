import { Box, Skeleton, TableCell, TableRow, styled } from "@mui/material";
import { DataTable } from "./DataTable";
import { UseDataTableParamsResult } from "../../types/types";
import React from "react";

interface Props extends UseDataTableParamsResult {
  id: string;
}

export const FunctionalDataTable: React.FC<Props> = ({
  id,
  rows,
  loading,
  columns,
  paginatedSort,
}) => {
  return (
    <DataTable
      id={id}
      data-testid={id}
      data={rows}
      loading={loading}
      pagination={paginatedSort.pagination}
      onNextPage={paginatedSort.goNext}
      onPreviousPage={paginatedSort.goBack}
      tableHeaders={columns.map(({ parseValue, ...rest }) => rest)}
      bodyRowComponent={(data, rowKey, sx) => (
        <StyledTableRow key={rowKey} sx={sx}>
          {loading && (
            <TableCell colSpan={columns.length}>
              <Skeleton variant="text" />
            </TableCell>
          )}
          {columns.map((column, idx) => (
            <TableCell key={idx} align={column.align} width={column.width}>
              {column.parseValue(data)}
              {column.parseValue(data)?.includes("*") && (
                <Box component="span" className="visually-hidden">
                  {column.name}
                </Box>
              )}
            </TableCell>
          ))}
        </StyledTableRow>
      )}
    />
  );
};

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:last-child td, &:last-child th": { border: 0 },
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.appColors.support80.transparentLight,
  },
}));
