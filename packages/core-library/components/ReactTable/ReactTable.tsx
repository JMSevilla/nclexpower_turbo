import React, { useEffect, useMemo, useState } from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableFooter,
  TableRow,
  TableCell,
  TablePagination,
  Box,
  Checkbox,
} from "@mui/material";
import {
  getCoreRowModel,
  useReactTable,
  flexRender,
  ColumnDef,
  Column,
  OnChangeFn,
  RowSelectionState,
  RowModel,
  getExpandedRowModel,
} from "@tanstack/react-table";
import { getCommonPinningStyles } from "./content/CommonPinningStyle";
import { TablePaginationActions } from "./TablePaginationActions";
import { StyledTableRow } from "./content/StyledTableRow";
import { CheckBoxColumn } from "./constant/CheckBoxColumn";
import { AuthorizedContentsResponseType } from "../../api/types";

interface Props<T> {
  columns: ColumnDef<T>[];
  data: T[];
  rightPinnedIds?: string[];
  leftPinnedIds?: string[];
  checkBoxSelection?: boolean;
  selectedRows?: (values: RowModel<T>) => void;
  initPageSize?: number;
  isLoading?: boolean;
  expandable?: boolean;
}

export const ReactTable = <T extends { children?: T[] }>({
  columns,
  data,
  ...rest
}: Props<T>) => {
  const {
    rightPinnedIds,
    leftPinnedIds,
    checkBoxSelection,
    selectedRows,
    expandable,
    isLoading,
    initPageSize,
  } = rest;

  const [filtering, setFiltering] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [rowSelection, setRowSelection] = useState({});
  const [expanded, setExpanded] = useState({});
  const combinedColumns = [...CheckBoxColumn<T>(), ...columns];
  const dataColumns = useMemo(
    () => (!checkBoxSelection ? columns : combinedColumns),
    [columns]
  );

  const table = useReactTable({
    onRowSelectionChange: setRowSelection,
    state: {
      columnPinning: {
        right: rightPinnedIds,
        left: leftPinnedIds,
      },
      rowSelection,
      expanded: expanded,
    },
    getSubRows: (row) => ("children" in row ? row.children : []),
    onExpandedChange: setExpanded,
    enableRowSelection: checkBoxSelection,
    columns: dataColumns ?? [],
    keepPinnedRows: true,
    data: data ?? [],
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    onGlobalFilterChange: setFiltering,
  });

  useEffect(() => {
    selectedRows && selectedRows(table.getSelectedRowModel());
  }, [table.getSelectedRowModel()]);

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box data-testid="react-table">
      <TableContainer>
        <Table sx={{ minWidth: 650, width: "100%", overflow: "auto" }}>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <StyledTableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const { column } = header;
                  return (
                    <TableCell
                      style={{ ...getCommonPinningStyles(column) }}
                      sx={{ fontWeight: 700 }}
                      key={header.id}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableCell>
                  );
                })}
              </StyledTableRow>
            ))}
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? table
                  .getRowModel()
                  .rows.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
              : table.getRowModel().rows
            ).map((row) => (
              <>
                <StyledTableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      sx={{ border: "1px" }}
                      component="th"
                      scope="row"
                      style={{ ...getCommonPinningStyles(cell.column) }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </StyledTableRow>
              </>
            ))}
          </TableBody>
          <TableFooter>
            {table.getFooterGroups().map((footerGroup) => (
              <TableRow key={footerGroup.id}>
                {footerGroup.headers.map((header) => (
                  <TableCell variant="head" key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.footer,
                          header.getContext()
                        )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableFooter>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
        colSpan={3}
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        slotProps={{
          select: {
            inputProps: {
              "aria-label": "rows per page",
            },
            native: true,
          },
        }}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        ActionsComponent={TablePaginationActions}
      />
    </Box>
  );
};
