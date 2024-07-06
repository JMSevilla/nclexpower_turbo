import { CircularProgress, TableCell, TableRow, Theme } from "@mui/material";
import { SxProps } from "@mui/system";
import { CategoryListResponse } from "../../../../types/category-response";

interface Props {
  item: CategoryListResponse;
  index: number;
  sx?: SxProps<Theme>;
  isLoading: boolean;
}

const tableCellSx: SxProps<Theme> = {
  typography: { xs: "body2", md: "body1" },
  overflow: "hidden",
};

export const CategoryOptionsTableRow: React.FC<Props> = ({
  item,
  index,
  sx,
  isLoading,
}) => {
  const cellSx: SxProps<Theme> = { ...tableCellSx, ...sx };

  return isLoading ? (
    <TableRow>
      <TableCell sx={cellSx} align="left">
        <CircularProgress size={24} />
      </TableCell>
      <TableCell sx={cellSx} align="right">
        <CircularProgress size={24} />
      </TableCell>
      <TableCell sx={cellSx} align="right">
        <CircularProgress size={24} />
      </TableCell>
      <TableCell sx={cellSx} align="right">
        <CircularProgress size={24} />
      </TableCell>
      <TableCell sx={cellSx} align="right">
        <CircularProgress size={24} />
      </TableCell>
      <TableCell sx={cellSx} align="right">
        <CircularProgress size={24} />
      </TableCell>
    </TableRow>
  ) : !isLoading ? (
    <TableRow>
      <TableCell sx={cellSx} align="left">
        {item.id}
      </TableCell>
      <TableCell sx={cellSx} align="right">
        {item.categoryName}
      </TableCell>
      <TableCell sx={cellSx} align="right">
        {item.categoryDescription}
      </TableCell>
      <TableCell sx={cellSx} align="right">
        {item.categoryType}
      </TableCell>
      <TableCell sx={cellSx} align="right">
        {item.createdAt}
      </TableCell>
      <TableCell sx={cellSx} align="right">
        {item.updatedAt}
      </TableCell>
    </TableRow>
  ) : null;
};
