import { GridMoreVertIcon } from "@mui/x-data-grid";
import { CustomPopover } from "../../../../../../../../../../components/Popover/Popover";
import { ListItemButton } from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Row, Table } from "@tanstack/react-table";
import { MenuItems } from "../../../../../../../../../../api/types";
import { SelectOption } from "../../../../../../../../../../components/Textfield/SelectMultipleField";

export const addMainMenuItem = {
  label: "",
  path: "",
  type: "Main",
  children: [],
};

export const addSubMenuItem = {
  label: "",
  type: "SubMenu",
  children: [{ label: "", path: "" }],
};

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

const SystemMenu: SelectOption[] = [
  {
    label: "Web Backoffice",
    value: 0,
    xvalue: 0,
  },
  {
    label: "Web Customer",
    value: 1,
    xvalue: 1,
  },
];

const AccountLevel = [
  {
    id: 1,
    label: "Developer",
    value: 0,
  },
  {
    id: 2,
    label: "Admin",
    value: 1,
  },
  {
    id: 3,
    label: "Encoder",
    value: 2,
  },
];

const MenuEnvironments = [
  {
    id: 1,
    label: "Dev",
    value: 0,
  },
  {
    id: 2,
    label: "Stage",
    value: 1,
  },
  {
    id: 3,
    label: "Preprod",
    value: 2,
  },
  {
    id: 4,
    label: "Prod",
    value: 3,
  },
];

export const SystemRequirements = [
  {
    id: 1,
    label: "System Menus",
    value: "systemMenus",
    options: SystemMenu,
  },
  {
    id: 2,
    label: "Account Level",
    value: "accountLevel",
    options: AccountLevel,
  },
  {
    id: 3,
    label: "Menu Environments",
    value: "menuEnvironments",
    options: MenuEnvironments,
  },
];
