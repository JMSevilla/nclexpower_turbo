import { Box, Typography } from "@mui/material";
import { ContainedCaseStudyQuestionType } from "../../../../../types";
import {
  Button,
  Card,
  ControlledRichTextEditor,
  SelectOption,
} from "../../../../../../../../../../../../../../../components";
import { tabsSequence } from "../../../../../../../../constants/constants";
import { GenericSelectField } from "../../../../../../../../../../../../../../../components/Textfield/GenericSelectField";
import { useFieldArray } from "react-hook-form";

export const NurseNotesTab = () => {
  const { append, fields } = useFieldArray<ContainedCaseStudyQuestionType>({
    name: "nurseNotes",
  });

  return (
    <>
      {fields.length > 0
        ? fields.map((tab, index) => (
            <Box
              key={tab.id}
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
                  name={`nurseNotes.${index}.seqNum`}
                  options={tabsSequence ?? []}
                  width="20%"
                />
              </Box>
              <Card>
                <ControlledRichTextEditor
                  editorClassName="max-h-[200px] overflow-auto"
                  editorFor="questions"
                  name={`nurseNotes.${index}.seqContent`}
                />
              </Card>
            </Box>
          ))
        : "Add a sequence"}
      <Button
        sx={{ marginTop: 5 }}
        onClick={() => {
          append({});
        }}
      >
        + Add More Info
      </Button>
    </>
  );
};
