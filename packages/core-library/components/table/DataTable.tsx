import ChevronLeftIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightIcon from "@mui/icons-material/ChevronRightRounded";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  IconButton,
  Table as MUITable,
  Stack,
  SxProps,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Theme,
  Typography,
} from "@mui/material";
import { TableCellProps, tableCellClasses } from "@mui/material/TableCell";
import { Fragment, ReactElement, useRef } from "react";
import { AnimatedBoxSkeleton } from "../AnimatedBoxSkeleton/AnimatedSkeletonBox";
import { PaginationData } from "../../types/types";

export interface DataTableHeader extends TableCellProps {
  name: string;
  sort?: {
    sorted: boolean;
    ascending: boolean;
    onClick: () => void;
  };
}

export interface DataTableSx {
  tableHead?: SxProps<Theme>;
  headerCell?: {
    cell?: SxProps<Theme>;
    typography?: SxProps<Theme>;
  };
  bodyCell?: {
    cell?: SxProps<Theme>;
  };
}

interface Props<T> {
  "data-testid"?: string;
  id?: string;
  data: T[];
  sx?: DataTableSx;
  loading?: boolean;
  tableHeaders: DataTableHeader[];
  pagination?: Partial<PaginationData>;
  onNextPage?(): void;
  onPreviousPage?(): void;
  bodyRowComponent(data: T, key: number, sx?: SxProps<Theme>): ReactElement;
}

export const DataTable = <T extends unknown>({
  id,
  sx,
  data,
  loading,
  pagination,
  tableHeaders,
  onNextPage,
  onPreviousPage,
  bodyRowComponent,
  ...props
}: Props<T>) => {
  const lastDataItemsCount = useRef(data.length || pagination?.pageSize);

  if (data.length) {
    lastDataItemsCount.current = data.length;
  }

  return (
    <TableContainer id={id}>
      <MUITable
        data-testid={props["data-testid"]}
        aria-label="data table"
        sx={{
          [`& .${tableCellClasses.root}`]: { borderBottomColor: "divider" },
        }}
      >
        <TableHead sx={sx?.tableHead}>
          <TableRow>
            {tableHeaders.map((header, idx) => (
              <TableCell key={idx} {...header} sx={sx?.headerCell?.cell}>
                <Stack
                  direction="row"
                  alignItems="center"
                  gap={4}
                  justifyContent={header.align}
                >
                  <Stack
                    direction="row"
                    alignItems="center"
                    gap={1}
                    justifyContent={header.align}
                    onClick={header.sort?.onClick}
                    sx={header.sort ? { cursor: "pointer" } : undefined}
                  >
                    {header.sort?.sorted && (
                      <KeyboardArrowDownIcon
                        data-testid={`data-table-sort-by-${header.name}`}
                        sx={{
                          transition: "transform 0.2s ease-in-out",
                          ...(!header.sort.ascending && {
                            transform: "rotate(180deg)",
                          }),
                        }}
                      />
                    )}
                    <Typography
                      sx={{
                        typography: { xs: "body2", md: "body1" },
                        ...sx?.headerCell?.typography,
                      }}
                    >
                      {header.name}
                    </Typography>
                  </Stack>

                  {idx === tableHeaders.length - 1 &&
                    !!pagination?.totalPages && (
                      <Stack
                        flex={1}
                        direction="row"
                        alignItems="center"
                        justifyContent="flex-end"
                        gap={1}
                        data-testid="data-table-pagination"
                      >
                        <Typography
                          justifySelf="flex-end"
                          variant="body1"
                          noWrap
                          mr={2}
                        >
                          {[
                            pagination.pageNumber,
                            "of",
                            pagination.totalPages,
                          ].join(" ")}
                        </Typography>
                        <IconButton
                          size="small"
                          color="primary"
                          disabled={!pagination.hasPreviousPage}
                          onClick={onPreviousPage}
                        >
                          <ChevronLeftIcon color="inherit" />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="primary"
                          disabled={!pagination.hasNextPage}
                          onClick={onNextPage}
                        >
                          <ChevronRightIcon color="inherit" />
                        </IconButton>
                      </Stack>
                    )}
                </Stack>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {loading
            ? Array.from(Array(lastDataItemsCount.current).keys()).map(
                (key, idx) => (
                  <TableRow
                    key={key}
                    sx={sx?.bodyCell?.cell}
                    data-testid={`data-table-loader-row-${idx + 1}`}
                  >
                    <TableCell colSpan={tableHeaders.length}>
                      <AnimatedBoxSkeleton height={26} light={idx % 2 === 1} />
                    </TableCell>
                  </TableRow>
                )
              )
            : data.map((row, index) => (
                <Fragment key={index}>
                  {bodyRowComponent(row, index, sx?.bodyCell?.cell)}
                </Fragment>
              ))}
        </TableBody>
      </MUITable>
    </TableContainer>
  );
};
