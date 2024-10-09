import { Box, FormControl, MenuItem, Select, Typography } from "@mui/material";
import React, { useCallback } from "react";
import { useSanitizedInputs } from "../../../../../../../../../../../../../../../../hooks/useSanitizeInputs";
import { DDCAnswerOptionType } from "../../../../../../types";

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

      return (
        <FormControl
          variant="standard"
          key={optionName}
          sx={{ marginTop: "-4px", minWidth: "150px" }}
        >
          <Select
            defaultValue={defaultSelectedOption || ""}
            displayEmpty
            style={{ marginLeft: "10px" }}
          >
            {answer.options?.map((option, idx) => (
              <MenuItem key={idx} value={option.answer} disabled>
                {option.answer}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );
    },
    []
  );

  const renderContentWithDropdowns = useCallback(
    (itemStem: string, answers: DDCAnswerOptionType[]) => {
      const parts = itemStem.split(/\[\[(.*?)\]\]/);

      return parts.map((part, index) => {
        if (answers.some((ans) => ans.optionName === part)) {
          return renderDropdown(part, answers);
        }
        const sanitizedContent = purifyInputs(part) as TrustedHTML;

        return (
          <Typography
            key={index}
            sx={{
              "& *": {
                margin: 0,
                padding: 0,
                wordWrap: "break-word",
                overflowWrap: "break-word",
                whiteSpace: "normal",
                wordBreak: "break-word",
              },
            }}
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
