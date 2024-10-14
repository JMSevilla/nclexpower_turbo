/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { Box } from "@mui/material";
import {
  Button,
  Card,
  GenericSelectField,
} from "../../../../../../../../../../components";
import { useFieldArray, useFormContext } from "react-hook-form";
import { RouteManagementSchema } from "../../../validation";
import {
  addMainMenuItem,
  addSubMenuItem,
  SystemRequirements,
} from "../constant/constant";
import { cardStyle, menuFieldStyle, menuOptionStyle } from "../style";
import { MenuSelector } from "./MenuSelector";

export const RouteCreationForm = () => {
  const { control: formControl, handleSubmit } =
    useFormContext<RouteManagementSchema>();

  const {
    append,
    fields,
    remove: MainMenuRemove,
  } = useFieldArray<RouteManagementSchema>({
    control: formControl,
    name: "MenuItems",
  });

  const handleOptionSelect = (type: string) => {
    type == "Main"
      ? append(addMainMenuItem)
      : type == "SubMenu"
        ? append(addSubMenuItem)
        : null;
  };

  const onSubmit = (values: RouteManagementSchema) => {
    console.log("values : ", values);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        gap: "10px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: "10px",
          width: "100%",
        }}
      >
        {SystemRequirements.length > 0 &&
          SystemRequirements.map((item, index) => (
            <Box key={index} sx={{ width: "33%" }}>
              <GenericSelectField
                name={item.value}
                label={item.label}
                options={item.options ?? []}
                sx={{ width: "100%" }}
              />
            </Box>
          ))}
      </Box>
      <Box sx={menuFieldStyle}>
        {fields.length > 0 &&
          fields.map((menuItem, index) => {
            const type = menuItem.type;
            return (
              <Box sx={{ width: "100%" }} key={index}>
                <MenuSelector
                  key={index}
                  index={index}
                  type={type}
                  MainMenuRemove={MainMenuRemove}
                />
              </Box>
            );
          })}
        <Box sx={menuOptionStyle}>
          <Card onClick={() => handleOptionSelect("Main")} sx={cardStyle}>
            Menu
          </Card>
          <Card onClick={() => handleOptionSelect("SubMenu")} sx={cardStyle}>
            Menu with Sub Menu
          </Card>
        </Box>
      </Box>

      <Button
        buttonActionType="submit"
        onClick={handleSubmit(onSubmit)}
        sx={{ borderRadius: "10px", width: "150px", alignSelf: "end" }}
      >
        Create Menu
      </Button>
    </Box>
  );
};
