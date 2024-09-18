import { Box, Typography } from "@mui/material";
import {
  AnswerOptions,
  Card,
  ControlledRichTextEditor,
} from "../../../../../../../../../../../../../../components";
import { GenericSelectField } from "../../../../../../../../../../../../../../components";
import {
  maxPoints,
  questionType,
  tabsSequence,
} from "../../../../../../../constants/constants";

interface Props {
  index: number;
}

export const AnswerCaseStudy = ({ index }: Props) => {
  return (
    <Box>
      <Box>
        <Box sx={{ display: "flex", width: "100%" }}>
          <Box sx={{ width: "50%" }}>
            <GenericSelectField
              // control={control} Commented for now
              name={`answer[${index}].quesType`}
              label="Question Types:"
              options={questionType ?? []}
              width="90%"
            />
            <GenericSelectField
              // control={control} Commented for now
              name={`caseStudyFields[${index}].maxPoints`}
              label="Max Points:"
              options={maxPoints ?? []}
              width="90%"
            />
          </Box>
          <Box sx={{ width: "50%" }}>
            <GenericSelectField
              name={`caseStudyFields[${index}].seqNum`}
              label="Sequence Number:"
              options={tabsSequence ?? []}
              width="40%"
            />
          </Box>
        </Box>
        <Box width={1}>
          <Typography sx={{ textAlign: "left", marginTop: 5 }}>
            Item Stem:
          </Typography>
          <Card>
            <ControlledRichTextEditor
              editorClassName="max-h-[200px] overflow-auto"
              editorFor="casestudy"
              name={`caseStudyFields[${index}].name`}
            />
          </Card>
        </Box>
        <Card>{/* Answer Type Display Here cc: Jacob */}</Card>
      </Box>
    </Box>
  );
};
