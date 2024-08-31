import { Box, Checkbox, Grid, Radio, styled, Typography } from "@mui/material";
import { useCallback } from "react";

type AnswerProps = {
  answer: string;
  answerKey: boolean;
};

export interface ContentProps {
  clientNeeds: string;
  cognitiveLevel: string;
  contentArea: string;
  answers: AnswerProps[];
  index?: number;
}

interface SummaryAccordionContentProps extends ContentProps {
  type: "SATA" | "MCQ";
}

const MainBox = styled(Box)(({ theme }) => ({
  padding: "4px",
  marginX: "10px",
  minHeight: "25vh",
  borderRight: `2px solid ${theme.palette.primary.main}`,
  justifyContent: "center",
}));

const ContentBox = styled(Box)({
  display: "flex",
  alignItems: "start",
  justifyContent: "center",
  flexDirection: "column",
  marginBottom: "4px",
});

const AnswersBox = styled(Box)({
  height: "160px",
  overflowY: "auto",
});

export const SummaryAccordionContent: React.FC<SummaryAccordionContentProps> = (
  props
) => {
  const { clientNeeds, cognitiveLevel, contentArea, answers, type, index } =
    props;
  const renderType = useCallback(
    (type: string, answerKey: boolean) => {
      switch (type) {
        case "SATA":
          return <Checkbox disabled checked={answerKey} />;
        case "MCQ":
          return <Radio disabled checked={answerKey} />;
        default:
          return null;
      }
    },
    [type]
  );

  return (
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item xs={4}>
        <MainBox>
          <ContentBox>
            <Typography color="#8E2ADD">Cognitive Level :</Typography>
            <Typography>{cognitiveLevel}</Typography>
          </ContentBox>
          <ContentBox>
            <Typography color="#8E2ADD">Content Area :</Typography>
            <Typography fontSize="18px">{contentArea}</Typography>
          </ContentBox>
          <ContentBox>
            <Typography color="#8E2ADD">Client Needs Category :</Typography>
            <Typography>{clientNeeds}</Typography>
          </ContentBox>
        </MainBox>
      </Grid>
      <Grid item xs={8}>
        <Typography color="#8E2ADD">Answer Option :</Typography>
        <AnswersBox>
          {answers.length > 0 &&
            answers.map(({ answer, answerKey }, idx) => (
              <Box key={idx} display="flex" alignItems="center" paddingX="10px">
                <>
                  {renderType(type, answerKey)}
                  <Typography>{answer}</Typography>
                </>
              </Box>
            ))}
        </AnswersBox>
      </Grid>
    </Grid>
  );
};
