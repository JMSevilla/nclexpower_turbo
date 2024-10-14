import { Box, ListItemIcon } from "@mui/material";
import React from "react";
import {
  Card,
  GenericSelectField,
  TextField,
} from "../../../../../../../../../../components";
import { deleteIconStyle } from "../style";
import {
  IconComponent,
  IconList,
} from "../../../../../../../../../../components/GenericDrawerLayout/utils/icon-component";
import { RouteManagementSchema } from "../../../validation";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { SubMenu } from "../../ImageManagement/components/SubMenu";

export const MenuSelector = ({
  menuItem,
  index,
  type,
  MainMenuRemove,
}: {
  menuItem: RouteManagementSchema;
  index: number;
  type: string;
  MainMenuRemove: (index: number) => void;
}) => {
  const { control: formControl, setValue } =
    useFormContext<RouteManagementSchema>();

  const { fields, remove } = useFieldArray<RouteManagementSchema>({
    control: formControl,
    name: "MenuItems",
  });

  const watchedIcons = useWatch<any>({
    control: formControl,
    name: fields.map((_, index: number) => `MenuItems.${index}.icon`),
  });

  const renderMenuItem = (
    menuItem: RouteManagementSchema,
    index: number,
    type: string
  ) => {
    const selectedIcon = watchedIcons[index];
    switch (type) {
      case "Main":
        return (
          <Box
            display="flex"
            gap={5}
            width="100%"
            alignItems="start"
            key={index}
          >
            <Card
              sx={{
                bgcolor: "white",
                height: "fit-content",
                borderRadius: "10px",
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: "10px",
                  width: "100%",
                  bgcolor: "#fefefe",
                  marginTop: "15px",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "15px",
                }}
              >
                <ListItemIcon sx={deleteIconStyle}>
                  {IconComponent(selectedIcon)}
                </ListItemIcon>
                <GenericSelectField
                  control={formControl}
                  name={`MenuItems.${index}.icon`}
                  label="Icon"
                  options={IconList ?? []}
                  onChange={(event) => {
                    setValue(`MenuItems.${index}.icon`, event);
                  }}
                  sx={{ width: "100%" }}
                />
                <TextField
                  name={`MenuItems.${index}.label`}
                  control={formControl}
                  label="Label"
                />
                <TextField
                  name={`MenuItems.${index}.path`}
                  control={formControl}
                  label="Path"
                />
              </Box>
            </Card>
            <ListItemIcon
              sx={deleteIconStyle}
              onClick={() => MainMenuRemove(index)}
            >
              {IconComponent("DeleteIcon")}
            </ListItemIcon>
          </Box>
        );

      case "SubMenu":
        return (
          <Box display="flex" gap={5} width="100%" key={index}>
            <Card
              sx={{
                bgcolor: "white",
                height: "fit-content",
                borderRadius: "10px",
                padding: "10px",
                width: "100%",
                marginBottom: "10px",
              }}
            >
              <Box display="flex" gap={10} alignItems="end">
                <ListItemIcon sx={deleteIconStyle}>
                  {IconComponent(selectedIcon)}
                </ListItemIcon>
                <GenericSelectField
                  control={formControl}
                  name={`MenuItems.${index}.icon`}
                  label="Icon"
                  options={IconList ?? []}
                  onChange={(event) => {
                    setValue(`MenuItems.${index}.icon`, event);
                  }}
                  sx={{ width: "100%" }}
                />
                <TextField
                  name={`MenuItems.${index}.label`}
                  control={formControl}
                  label="Menu with Sub Menu Label"
                />
              </Box>
              <Card
                sx={{
                  marginTop: "10px",
                  width: "100%",
                  borderRadius: "10px",
                }}
              >
                <SubMenu nestIndex={index} />
              </Card>
            </Card>
            <ListItemIcon
              sx={deleteIconStyle}
              onClick={() => MainMenuRemove(index)}
            >
              {IconComponent("DeleteIcon")}
            </ListItemIcon>
          </Box>
        );

      default:
        return null;
    }
  };

  return renderMenuItem(menuItem, index, type);
};
