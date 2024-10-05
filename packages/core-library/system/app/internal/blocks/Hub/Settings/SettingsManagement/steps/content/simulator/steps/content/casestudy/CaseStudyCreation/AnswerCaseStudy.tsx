import { Box, Typography } from "@mui/material";
import {
  AnswerOptions,
  Card,
  ControlledRichTextEditor,
  ControlledTextField,
} from "../../../../../../../../../../../../../../components";
import { GenericSelectField } from "../../../../../../../../../../../../../../components";
import {
  initAnswerValues,
  maxPoints,
  questionType as questionTypeOptions,
  tabsSequence,
} from "../../../../../../../constants/constants";
import { useFormContext, useWatch } from "react-hook-form";
import { ContainedCaseStudyQuestionType } from "../../../../types";
import { useEffect, useState } from "react";

interface Props {
  index: number;
}

export const AnswerCaseStudy: React.FC<Props> = ({ index }) => {
  const { getValues, setValue, resetField } =
    useFormContext<ContainedCaseStudyQuestionType>();
  const { questionnaires } = useWatch<ContainedCaseStudyQuestionType>();
  if (!questionnaires) return;
  const questionType = questionnaires[index].questionType;

  useEffect(() => {
    setValue(`questionnaires.${index}`, getValues(`questionnaires.${index}`));
    setValue(`questionnaires.${index}.itemNum`, index + 1);
  }, [index, getValues, questionType]);

  const handleReset = () => {
    resetField(`questionnaires.${index}.answers`);
  };

  useEffect(() => {
    if (questionType === "SATA" && !questionnaires[index].answers?.length) {
      setValue(`questionnaires.${index}.answers`, [
        ...Array(5).fill(initAnswerValues),
      ]);
    }
  }, [questionType]);

  return (
    <Box
      sx={{
        position: "relative",
        maxHeight: "800px",
        overflowY: "auto",
        p: 3,
      }}
    >
      <Box sx={{ display: "flex", width: "100%" }}>
        <Box sx={{ width: 1 }}>
          <Box display="flex" alignItems="start" justifyContent="space-between">
            <GenericSelectField
              name={`questionnaires.${index}.questionType`}
              label="Question Type:"
              labelProps={{ sx: { fontSize: "16px", fontWeight: 600 } }}
              onChange={handleReset}
              options={questionTypeOptions ?? []}
              width="60%"
            />
            <GenericSelectField
              labelProps={{ sx: { fontSize: "16px", fontWeight: 600 } }}
              name={`questionnaires.${index}.seqNum`}
              label="Sequence No. :"
              options={tabsSequence ?? []}
              width="35%"
            />
          </Box>
          <Box mt={3}>
            <GenericSelectField
              name={`questionnaires.${index}.maxPoints`}
              label="Max Point:"
              labelProps={{ sx: { fontSize: "16px", fontWeight: 600 } }}
              sx={{ borderRadius: "10px" }}
              options={maxPoints ?? []}
              width="60%"
            />
          </Box>
        </Box>
      </Box>
      <Box sx={{ width: "100%" }} mt={3}>
        {index !== 0 && (
          <Box mt={3}>
            <ControlledTextField
              label="Transition Header : "
              labelProps={{ sx: { fontSize: "16px", fontWeight: 600 } }}
              fullWidth
              name={`questionnaires.${index}.transitionHeader`}
            />
          </Box>
        )}
      </Box>
      <Box width={1} sx={{ textAlign: "start", mt: 3 }}>
        <Box width={1}>
          <Typography color="#525252" fontSize="16px" fontWeight={600}>
            Item Stem :
          </Typography>
          <Box
            width={1}
            borderRadius={"5px"}
            border={1}
            borderColor="#8E2ADD"
            p={4}
            overflow={"hidden"}
          >
            <ControlledRichTextEditor
              editorFor="casestudy"
              placeholder="Add question..."
              name={`questionnaires.${index}.itemStem`}
            />
          </Box>
        </Box>

        {questionType && (
          <Box sx={{ textAlign: "start", mt: 3 }}>
            <Typography color="#525252" fontSize="16px" fontWeight={600}>
              Answer Options :
            </Typography>
            <Box
              sx={{
                borderRadius: "5px",
                border: 1,
                overflow: "hidden",
                borderColor: "#8E2ADD",
              }}
            >
              <AnswerOptions
                questionIndex={index}
                questionType="caseStudy"
                questionnaireType={questionType}
              />
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};
