import { Box, Checkbox, Typography } from "@mui/material";
import NearMeIcon from "@mui/icons-material/NearMe";
import { DDCquestion } from "./DDCQuestion";
import {
  DDCAnswerOption,
  QuestionnaireItem,
} from "../../../../../../../../../../../../../types";
import { useSanitizedInputs } from "../../../../../../../../../../../../../../../../hooks/useSanitizeInputs";

export const Items: React.FC<{ content: QuestionnaireItem[] }> = ({
  content,
}) => {
  const { purifyInputs } = useSanitizedInputs({
    config: { RETURN_TRUSTED_TYPE: true },
  });
  return (
    <Box
      display="flex"
      flexDirection="column"
      padding="24px"
      border="1px solid #8E2ADD"
      marginTop="-48px"
      height="512px"
      overflow="auto"
      borderRadius="5px"
    >
      {content.length > 0 ? (
        content.map((data, index) => (
          <Box paddingBottom="14px" key={index}>
            <Box
              display="flex"
              flexDirection="column"
              gap="4px"
              sx={{
                wordWrap: "break-word",
                overflowWrap: "break-word",
                whiteSpace: "normal",
              }}
            >
              {data.transitionHeader && (
                <Typography
                  sx={{
                    "& *": {
                      margin: 0,
                      padding: 0,
                      lineHeight: 1.5,
                      wordBreak: "break-word",
                    },
                  }}
                  dangerouslySetInnerHTML={{
                    __html: purifyInputs(data.transitionHeader) as TrustedHTML,
                  }}
                />
              )}
              <Box display="flex" gap="10px">
                <NearMeIcon sx={{ color: "#D4AEF2", rotate: "45deg" }} />
                {data.questionType === "DDC" ? (
                  <DDCquestion
                    ddcData={{
                      answers: data.answers as DDCAnswerOption[],
                      itemStem: data.itemStem,
                    }}
                  />
                ) : (
                  <Typography
                    sx={{
                      "& *": {
                        margin: 0,
                        padding: 0,
                        lineHeight: 1.5,
                        wordBreak: "break-word",
                      },
                    }}
                    dangerouslySetInnerHTML={{
                      __html: purifyInputs(data.itemStem) as TrustedHTML,
                    }}
                  ></Typography>
                )}
              </Box>
            </Box>
            <Typography
              marginTop="14px"
              fontSize="16px"
              color="#999999"
              fontWeight="700"
            >
              {data.questionType === "SATA" && "Select All That Apply"}
              {data.questionType === "MRSN" &&
                `Select ${data.maxAnswer} correct answers`}
            </Typography>
            {data.questionType !== "DDC" && (
              <Box marginTop="10px">
                {data.answers.map((answer, index) => (
                  <Box
                    display="flex"
                    alignItems="center"
                    paddingX="10px"
                    key={index}
                  >
                    <Checkbox disabled checked={answer.answerKey} />
                    <Typography fontSize="16px">{answer.answer}</Typography>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        ))
      ) : (
        <Typography>No data available</Typography>
      )}
    </Box>
  );
};
