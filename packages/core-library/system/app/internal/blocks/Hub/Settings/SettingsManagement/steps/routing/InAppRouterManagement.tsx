/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { Box, ListItemButton } from "@mui/material";
import { SettingsSelectionType } from "../../types";
import {
  Button,
  Card,
  ConfirmationModal,
  EvaIcon,
  ReactTable,
} from "../../../../../../../../../components";
import { useMenu } from "../../../../../../../../../components/GenericDrawerLayout/hooks/useMenu";
import { prepareMenus } from "../../../../../../../../../components/GenericDrawerLayout/MockMenus";
import {
  useAuthContext,
  useBusinessQueryContext,
} from "../../../../../../../../../contexts";
import { useValidateToken } from "../../../../../../../../../hooks";
import React, { useState } from "react";
import { RouteCreationForm } from "./components/RouteCreationForm";
import { RouteCreationSidebar } from "./components/RouteCreationSidebar";
import { FormProvider, useForm } from "react-hook-form";
import { RouteManagementSchema, RouteMenuCreation } from "../../validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { CustomPopover } from "../../../../../../../../../components/Popover/Popover";
// import { GridMoreVertIcon } from "@mui/x-data-grid";
import { MenuItems } from "../../../../../../../../../api/types";
import { ColumnDef, Row, Table } from "@tanstack/react-table";

interface Props {
  nextStep(values: Partial<SettingsSelectionType>): void;
  previousStep(): void;
  values: Partial<SettingsSelectionType>;
  previous: () => void;
  reset: () => void;
}

export const InAppRouterManagement: React.FC<Props> = ({
  previousStep,
  previous,
  reset,
}) => {
  const { businessQueryDeleteRoute } = useBusinessQueryContext();
  const { mutateAsync } = businessQueryDeleteRoute();
  const [view, setView] = useState<boolean>(false);
  const [IsNewMenuCreated, setIsNewMenuCreated] = useState<boolean>(false);
  const { isAuthenticated } = useAuthContext();
  const { tokenValidated } = useValidateToken();

  const columns: ColumnDef<MenuItems>[] = [
    {
      accessorKey: "label",
      header: ({ table }: { table: Table<MenuItems> }) => (
        <>
          <button
            onClick={table.getToggleAllRowsExpandedHandler()}
            style={{ cursor: "pointer" }}
          >
            <Box
              sx={{
                transform: table.getIsAllRowsExpanded()
                  ? "rotate(90deg)"
                  : "rotate(0deg)",
                transition: "transform 0.3s ease",
                display: "inline-block",
              }}
            >
              <EvaIcon
                name="chevron-right-outline"
                width={22}
                height={22}
                aria-hidden
              />
            </Box>
          </button>
          Label
        </>
      ),
      cell: ({ row }: { row: Row<MenuItems> }) => (
        <div style={{ paddingLeft: `${row.depth * 2}rem` }}>
          <div>
            {row.getCanExpand() ? (
              <button
                onClick={row.getToggleExpandedHandler()}
                style={{ cursor: "pointer" }}
              >
                <Box
                  sx={{
                    transform: row.getIsExpanded()
                      ? "rotate(0deg)"
                      : "rotate(-90deg)",
                    transition: "transform 0.3s ease",
                  }}
                >
                  <EvaIcon
                    name="chevron-down-outline"
                    width={22}
                    height={22}
                    aria-hidden
                  />
                </Box>
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
          iconButton={
            <EvaIcon
              name="more-horizontal-outline"
              width={22}
              height={22}
              aria-hidden
            />
          }
        >
          <ListItemButton>Add</ListItemButton>
          <ListItemButton>Edit</ListItemButton>
          {row.original.children.length == 0 && (
            <ConfirmationModal
              customButton="Delete"
              dialogContent={
                <>
                  Are you sure you want to delete{" "}
                  <b> "{row.original.label}" Menu</b>?
                </>
              }
              confirmButtonText="Delete"
              isLoading={false}
              handleSubmit={() => deleteCategory(row.original.menuId)}
            />
          )}
        </CustomPopover>
      ),
    },
  ];

  const form = useForm<RouteManagementSchema>({
    mode: "all",
    resolver: yupResolver(RouteMenuCreation),
  });

  const { menus, loading: menuLoading } = useMenu();
  const mockMenu = prepareMenus({
    isAuthenticated: isAuthenticated && tokenValidated,
    loading: menuLoading,
    menus: menus,
  });

  return (
    <FormProvider {...form}>
      <Box
        sx={{
          width: "100%",
          height: "100dvh",
          padding: "10px",
          display: "flex",
          flexDirection: "column",
          gap: 5,
        }}
      >
        <Box display="flex" gap="10px">
          {IsNewMenuCreated ? (
            <Button
              sx={{ borderRadius: "10px", marginBottom: "10px" }}
              onClick={() => setIsNewMenuCreated(false)}
            >
              Back
            </Button>
          ) : (
            <>
              <Button
                sx={{ borderRadius: "10px" }}
                onClick={() => setView(!view)}
              >
                View
              </Button>
              <Button
                sx={{ borderRadius: "10px" }}
                onClick={() => setIsNewMenuCreated(true)}
              >
                Add New Menus
              </Button>
            </>
          )}
        </Box>
        {IsNewMenuCreated ? (
          <Box
            sx={{
              width: "100%",
              gap: "10px",
            }}
          >
            <RouteCreationForm />
          </Box>
        ) : view ? (
          <Box sx={{ display: "flex", gap: "10px" }}>
            <Card
              elevation={5}
              sx={{
                width: "30%",
                height: "100%",
                borderRadius: "10px",
              }}
            >
              {menuLoading ? "Loading" : <RouteCreationSidebar menus={menus} />}
            </Card>
          </Box>
        ) : (
          <Card>
            <ReactTable expandable columns={columns} data={mockMenu} />
          </Card>
        )}
      </Box>
    </FormProvider>
  );

  async function deleteCategory(MenuId: string) {
    await mutateAsync(MenuId);
  }
};
