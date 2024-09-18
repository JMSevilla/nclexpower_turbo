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
    <>
      {valueArray && valueArray.length > 0
        ? valueArray.map((tab, index) => (
            <Box
              // key={tab.id}
              sx={{
                justifyContent: "center",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  gap: 5,
                }}
              >
                <Typography>Sequence No.</Typography>
                <GenericSelectField
                  name={`${type}.${index}.seqNum`}
                  options={tabsSequence ?? []}
                  width="20%"
                  defaultValue={`${type}.seqNum`}
                />
              </Box>
              <Card>
                <ControlledRichTextEditor
                  editorClassName="max-h-[200px] overflow-auto"
                  editorFor="questions"
                  name={`${type}.${index}.seqContent`}
                />
              </Card>
            </Box>
          ))
        : "Add a sequence"}
      <Button sx={{ marginTop: 5 }} onClick={() => append(initBgValues)}>
        + Add More Info
      </Button>
    </>
  );
};
