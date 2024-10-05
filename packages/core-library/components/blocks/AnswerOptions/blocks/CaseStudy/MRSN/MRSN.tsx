import React from "react";
import { Card } from "../../../../../Card/Card";
import { Box } from "@mui/material";
import { SATA } from "../../Regular/SATA/SATA";
import { GenericSelectField } from "../../../../../Textfield/GenericSelectField";
import { ControlledTextField } from "../../../../../Textfield/TextField";
import { maxAnswer } from "../../../../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/constants/constants";
import { useFormContext } from "react-hook-form";
import { ContainedCaseStudyQuestionType } from "../../../../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/content/simulator/types";

type MrsnPropsType = {
  questionIndex: number;
};

export const MRSN: React.FC<MrsnPropsType> = ({ questionIndex }) => {
  const deletionLimit = 0;

  return (
    <Card>
      <Box sx={{ display: "flex", justifyContent: "end", p: 2 }}>
        <GenericSelectField
          name={`questionnaires.${questionIndex}.maxAnswer`}
          label="Max selection"
          options={maxAnswer ?? []}
          width="50%"
        />
      </Box>
      <SATA deletionLimit={deletionLimit} questionIndex={questionIndex} />
    </Card>
  );
};
