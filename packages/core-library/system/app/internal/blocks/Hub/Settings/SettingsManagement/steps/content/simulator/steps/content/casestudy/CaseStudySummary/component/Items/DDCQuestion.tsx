import { Box, FormControl, MenuItem, Select, Typography } from "@mui/material";
import React, { useCallback } from "react";
import { useSanitizedInputs } from "../../../../../../../../../../../../../../../../hooks/useSanitizeInputs";
import { DDCAnswerOptionType } from "../../../../../../types";
import { wordWrapStyles } from "./items";
import { PlainSelectField } from "../../../../../../../../../../../../../../../../components/Textfield/SelectField/PlainSelectField";

export interface DDCQuestionProps {
  ddcData: {
    itemStem: string;
    answers: DDCAnswerOptionType[];
  };
}

export const DDCquestion: React.FC<DDCQuestionProps> = ({ ddcData }) => {
  const { purifyInputs } = useSanitizedInputs({
    config: { RETURN_TRUSTED_TYPE: true },
  });

  const renderDropdown = useCallback(
    (optionName: string, answers: DDCAnswerOptionType[]) => {
      const answer = answers.find(
        (ans: DDCAnswerOptionType) => ans.optionName === optionName
      );
      if (!answer) return optionName;

      const defaultSelectedOption = answer.options?.find(
        (option) => option.answerKey === true
      )?.answer;

      const mappedOptions = answer.options?.map((option) => ({
        value: option.answer,
        label: option.answer,
      }));

      return (
        <FormControl
          variant="standard"
          key={optionName}
          sx={{ marginTop: "-10px", marginLeft: "10px", minWidth: "100px" }}
        >
          <PlainSelectField
            options={mappedOptions || []}
            defaultValue={defaultSelectedOption || ""}
            displayEmpty
            disabledOptions
          />
        </FormControl>
      );
    },
    []
  );

  const renderContentWithDropdowns = useCallback(
    (itemStem: string, answers: DDCAnswerOptionType[]) => {
      if (!itemStem) {
        return <Typography>No content available</Typography>;
      }
      const parts = itemStem.split(/\[\[(.*?)\]\]/);

      return parts.map((part, index) => {
        if (answers.some((ans) => ans.optionName === part)) {
          return renderDropdown(part, answers);
        }
        const sanitizedContent = purifyInputs(part) as TrustedHTML;

        return (
          <Typography
            key={index}
            sx={wordWrapStyles}
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          />
        );
      });
    },
    [renderDropdown]
  );

  return (
    <Box display="flex" flexWrap="wrap">
      {renderContentWithDropdowns(ddcData.itemStem, ddcData.answers)}
    </Box>
  );
};
