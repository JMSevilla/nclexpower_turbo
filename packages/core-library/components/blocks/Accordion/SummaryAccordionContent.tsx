import { Box, Checkbox, Grid, Radio, Typography } from "@mui/material";

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
  type: string;
}

export const SummaryAccordionContent: React.FC<SummaryAccordionContentProps> = (
  props
) => {
  const { clientNeeds, cognitiveLevel, contentArea, answers, type, index } =
    props;
  const renderType = (type: string, answerKey: boolean) => {
    switch (type) {
      case "SATA":
        return <Checkbox disabled checked={answerKey} />;
      case "MCQ":
        return <Radio disabled checked={answerKey} />;
      default:
        return null;
    }
  };

  return (
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item xs={4}>
        <Box
          key={index}
          padding="4px"
          marginX="10px"
          minHeight="25vh"
          borderRight="2px solid #8E2ADD"
          justifyContent="center"
        >
          <Box
            display="flex"
            alignItems="start"
            justifyContent="center"
            flexDirection="column"
            marginBottom="4px"
          >
            <Typography color="#8E2ADD">Cognitive Level :</Typography>
            <Typography>{cognitiveLevel}</Typography>
          </Box>
          <Box
            display="flex"
            alignItems="start"
            flexDirection="column"
            marginBottom="4px"
          >
            <Typography color="#8E2ADD">Content Area :</Typography>
            <Typography fontSize="18px">{contentArea}</Typography>
          </Box>
          <Box
            display="flex"
            alignItems="start"
            flexDirection="column"
            marginBottom="4px"
          >
            <Typography color="#8E2ADD">Client Needs Category :</Typography>
            <Typography>{clientNeeds}</Typography>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={8}>
        <Typography color="#8E2ADD">Answer Option :</Typography>
        <Box
          height="160px"
          sx={{
            overflowY: "auto",
          }}
        >
          {answers.length > 0 &&
            answers.map(({ answer, answerKey }, idx) => (
              <Box key={idx} display="flex" alignItems="center" paddingX="10px">
                <>
                  {renderType(type, answerKey)}
                  <Typography>{answer}</Typography>
                </>
              </Box>
            ))}
        </Box>
      </Grid>
    </Grid>
  );
};
