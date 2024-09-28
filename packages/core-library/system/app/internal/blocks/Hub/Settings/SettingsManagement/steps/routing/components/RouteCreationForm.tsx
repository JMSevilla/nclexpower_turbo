import { Box } from "@mui/material";
import {
  Button,
  Card,
  ControlledTextField,
} from "../../../../../../../../../../components";
import { useFieldArray, useFormContext } from "react-hook-form";
import { RouteManagementSchema } from "../../../validation";

interface Props {
  type: string;
}

export const RouteCreationForm = ({ type }: Props) => {
  const { control: formControl, handleSubmit } = useFormContext();
  const { append, fields } = useFieldArray<RouteManagementSchema>({
    name: "submenu",
  });

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
      {type == "Main" ? (
        <Card
          sx={{
            bgcolor: "white",
            height: "fit-content",
            borderRadius: "10px",
          }}
        >
          <ControlledTextField
            name="label"
            control={formControl}
            label="Label"
          />
          <ControlledTextField name="path" control={formControl} label="Path" />
        </Card>
      ) : (
        <Card
          sx={{
            bgcolor: "white",
            height: "fit-content",
            borderRadius: "10px",
          }}
        >
          <ControlledTextField
            name="label"
            control={formControl}
            label="Label"
          />
          <Card sx={{ marginTop: "10px", width: "100%", borderRadius: "10px" }}>
            {fields.map((menuItem, index) => (
              <Box
                key={menuItem.id}
                sx={{
                  marginTop: "10px",
                  display: "flex",
                  width: "100%",
                  gap: "25px",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ControlledTextField
                  control={formControl}
                  name={`submenu[${index}].label`}
                  label="Sub menu Label"
                />
                <ControlledTextField
                  control={formControl}
                  name={`submenu[${index}].path`}
                  label="Sub menu Path"
                />
              </Box>
            ))}
            <Button
              sx={{ borderRadius: "10px", marginTop: "10px" }}
              onClick={() => append({ label: "", path: "" })}
            >
              Add Sub Menu
            </Button>
          </Card>
        </Card>
      )}
      <Button
        buttonActionType="submit"
        onClick={handleSubmit(() => onSubmit)}
        sx={{ borderRadius: "10px", width: "150px", alignSelf: "end" }}
      >
        Create Menu
      </Button>
    </Box>
  );
};
