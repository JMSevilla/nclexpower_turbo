/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { Box } from "@mui/material";
import { SettingsSelectionType } from "../../types";
import {
  Button,
  Card,
  ReactTable,
} from "../../../../../../../../../components";
import { useMenu } from "../../../../../../../../../components/GenericDrawerLayout/hooks/useMenu";
import { prepareMenus } from "../../../../../../../../../components/GenericDrawerLayout/MockMenus";
import { useAuthContext, useBusinessQueryContext, useExecuteToast } from "../../../../../../../../../contexts";
import { useValidateToken } from "../../../../../../../../../hooks";
import React, { useState } from "react";
import { RouteCreationForm } from "./components/RouteCreationForm";
import { RouteCreationSidebar } from "./components/RouteCreationSidebar";
import { columns } from "./constant/constant";
import { FormProvider, useForm } from "react-hook-form";
import { RouteManagementSchema, RouteMenuCreation } from "../../validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateAuthorizedMenusParams } from '../../../../../../../../../api/types';

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
  const [view, setView] = useState<boolean>(false);
  const [IsNewMenuCreated, setIsNewMenuCreated] = useState<boolean>(false);
  const { isAuthenticated } = useAuthContext();
  const { tokenValidated } = useValidateToken();
  const { businessQueryCreateAuthorizedMenus } = useBusinessQueryContext()
  const { mutateAsync } = businessQueryCreateAuthorizedMenus()
  const { executeToast } = useExecuteToast()
  const form = useForm<RouteManagementSchema>({
    mode: "all",
    resolver: yupResolver(RouteMenuCreation),
  });
  const { reset: resetForm } = form

  const { menus, loading: menuLoading } = useMenu();
  const mockMenu = prepareMenus({
    isAuthenticated: isAuthenticated && tokenValidated,
    loading: menuLoading,
    menus: menus,
  });

  async function onSubmit(values: RouteManagementSchema) {
    try {
      await mutateAsync(values as CreateAuthorizedMenusParams)
      resetForm({ MenuItems: [] })
    } catch {
      executeToast(
        "Sorry! Please try again later",
        "top-right",
        false,
        { type: "error" }
      );
    }

  };

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
            <RouteCreationForm onSubmit={onSubmit} />
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
};
