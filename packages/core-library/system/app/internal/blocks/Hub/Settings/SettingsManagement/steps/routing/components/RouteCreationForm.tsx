import { Box, ListItemIcon } from "@mui/material";
import {
  Button,
  Card,
  MultipleSelectField,
  TextField,
} from "../../../../../../../../../../components";
import { useFieldArray, useFormContext } from "react-hook-form";
import { RouteManagementSchema } from "../../../validation";
import { addMainMenuItem, addSubMenuItem, SysReq } from "../constant/constant";
import { SubMenu } from "../../ImageManagement/components/SubMenu";
import { IconComponent } from "../../../../../../../../../../components/GenericDrawerLayout/utils/icon-component";
import {
  cardStyle,
  deleteIconStyle,
  menuFieldStyle,
  menuOptionStyle,
} from "../style";

export const RouteCreationForm = () => {
  const { control: formControl, handleSubmit } =
    useFormContext<RouteManagementSchema>();

  const { append, fields, remove } = useFieldArray<RouteManagementSchema>({
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
        {SysReq.length > 0 &&
          SysReq.map((item) => (
            <Box sx={{ width: "33%" }}>
              <MultipleSelectField
                control={formControl}
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
            return (
              <Box sx={{ width: "100%" }} key={menuItem.id}>
                {menuItem.type === "Main" ? (
                  <Box display="flex" gap={5} width="100%">
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
                      onClick={() => remove(index)}
                    >
                      {IconComponent("DeleteIcon")}
                    </ListItemIcon>
                  </Box>
                ) : menuItem.type === "SubMenu" ? (
                  <Box display="flex" gap={5} width="100%">
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
                      <TextField
                        name={`MenuItems.${index}.label`}
                        control={formControl}
                        label="Menu with Sub Menu Label"
                      />
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
                      onClick={() => remove(index)}
                    >
                      {IconComponent("DeleteIcon")}
                    </ListItemIcon>
                  </Box>
                ) : null}
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
