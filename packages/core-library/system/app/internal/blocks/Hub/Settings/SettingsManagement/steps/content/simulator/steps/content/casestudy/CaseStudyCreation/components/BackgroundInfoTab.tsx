import { Box, Typography } from "@mui/material";
import {
  Button,
  Card,
  ControlledRichTextEditor,
} from "../../../../../../../../../../../../../../../components";
import { useFieldArray, useFormContext } from "react-hook-form";
import {
  initBgValues,
  tabsSequence,
} from "../../../../../../../../constants/constants";
import { GenericSelectField } from "../../../../../../../../../../../../../../../components/Textfield/GenericSelectField";

interface Props {
  type: string;
}

export const BackgroundInfoTab = ({ type }: Props) => {
  type bgInfoType = Record<string, { seqNum: number; seqContent: string }[]>;
  const { control, getValues, setValue, reset } = useFormContext<bgInfoType>();
  const { append } = useFieldArray({
    control,
    name: type,
  });
  const valueArray = getValues(`${type}`);

  return (
    <Box
      sx={{
        position: "relative",
        maxHeight: "800px",
        overflowY: "auto",
        p: 3,
      }}
    >
      {valueArray && valueArray.length > 0 ? (
        valueArray.map((tab, index) => (
          <Box
            key={index}
            sx={{
              my: 2,
              justifyContent: "center",
              border: 1,
              borderColor: "ButtonShadow",
              display: "flex",
              flexDirection: "column",
              p: 3,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                mb: 3,
              }}
            >
              <Typography
                sx={{
                  fontWeight: "600",
                  fontSize: "16px",
                  color: "#525252",
                  mr: 5,
                }}
              >
                Sequence No. :
              </Typography>
              <GenericSelectField
                name={`${type}.${index}.seqNum`}
                options={tabsSequence ?? []}
                width="20%"
                defaultValue={`${type}.seqNum`}
              />
            </Box>
            <Box sx={{ textAlign: "start" }}>
              <ControlledRichTextEditor
                customDependency={type}
                editorFor="casestudy"
                placeholder="Add study..."
                name={`${type}.${index}.seqContent`}
              />
            </Box>
          </Box>
        ))
      ) : (
        <></>
      )}
      <Box
        sx={{
          height: "100%",
          width: "100%",
        }}
      >
        <Button
          sx={{
            height: "45px",
            borderRadius: "10px",
            marginTop: "10px",
            width: "100%",
            textTransform: "none",
          }}
          onClick={() => append(initBgValues)}
        >
          + Add More Info
        </Button>
      </Box>
    </Box>
  );
};
