import { Box, ListItemIcon } from "@mui/material";
import { Button, TextField } from "../../../../../../../../../../components";
import { useFieldArray, useFormContext } from "react-hook-form";
import { RouteManagementSchema } from "../../../validation";
import { IconComponent } from "../../../../../../../../../../components/GenericDrawerLayout/utils/icon-component";

export const SubMenu = ({ nestIndex }: { nestIndex: number }) => {
  const { control: formControl } = useFormContext<RouteManagementSchema>();

  const { fields, remove, append } = useFieldArray({
    control: formControl,
    name: `MenuItems.${nestIndex}.children`,
  });

  return (
    <Box>
      {fields.map((item, index) => (
        <Box
          key={item.id}
          sx={{
            marginTop: "10px",
            display: "flex",
            width: "100%",
            gap: "25px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TextField
            control={formControl}
            name={`MenuItems.${nestIndex}.children.${index}.label`}
            label="Sub menu Label"
          />
          <TextField
            control={formControl}
            name={`MenuItems.${nestIndex}.children.${index}.path`}
            label="Sub menu Path"
          />
          {fields.length > 1 && (
            <ListItemIcon
              sx={{
                marginTop: "25px",
                cursor: "pointer",
                width: "50px",
                height: "50px",
                borderRadius: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: 2,
              }}
              onClick={() => remove(index)}
            >
              {IconComponent("DeleteIcon")}
            </ListItemIcon>
          )}
        </Box>
      ))}
      <Button
        sx={{ borderRadius: "10px", marginTop: "10px" }}
        onClick={() => append({ label: "", path: "" })}
      >
        Add Sub Menu
      </Button>
    </Box>
  );
};
