import { GridMoreVertIcon } from "@mui/x-data-grid";
import { CustomPopover } from "../../../../../../../../../../components/Popover/Popover";
import { ListItemButton } from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Row, Table } from "@tanstack/react-table";
import { MenuItems } from "../../../../../../../../../../api/types";

export const columns = [
  {
    accessorKey: "firstName",
    header: ({ table }: { table: Table<MenuItems> }) => (
      <>
        <button {...{ onClick: table.getToggleAllRowsExpandedHandler() }}>
          {table.getIsAllRowsExpanded() ? (
            <ArrowDropDownIcon />
          ) : (
            <ArrowRightIcon />
          )}
        </button>
        Label
      </>
    ),
    cell: ({ row }: { row: Row<MenuItems> }) => (
      <div style={{ paddingLeft: `${row.depth * 2}rem` }}>
        <div>
          {row.getCanExpand() ? (
            <button
              {...{
                onClick: row.getToggleExpandedHandler(),
                style: { cursor: "pointer" },
              }}
            >
              {row.getIsExpanded() ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
            </button>
          ) : (
            " "
          )}
          {row.original.label}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "path",
    header: "Path",
  },
  {
    header: "Actions",
    cell: ({ row }: { row: Row<MenuItems> }) => (
      <CustomPopover
        open={true}
        label="Actions"
        withIcon
        iconButton={<GridMoreVertIcon fontSize="small" />}
      >
        <ListItemButton>Add</ListItemButton>
        <ListItemButton>Edit</ListItemButton>
        <ListItemButton>Delete</ListItemButton>
      </CustomPopover>
    ),
  },
];
