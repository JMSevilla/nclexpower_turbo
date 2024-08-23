import React from "react";
import { ContainedRegularQuestionType } from "../../types";
import { Box, Grid, Typography, Accordion } from "@mui/material";
import { RegularQAccordion } from "../../../../../../../../../../../../components";
import { useForm } from "react-hook-form";
import { Height } from "@mui/icons-material";

interface Props {
  nextStep(values: Partial<ContainedRegularQuestionType>): void;
  previousStep(): void;
  values: Partial<ContainedRegularQuestionType>;
  next: () => void;
}

const accordionItems = [
  { title: "Accordion 1", content: "Content for accordion 1" },
  { title: "Accordion 2", content: "Content for accordion 2" },
  { title: "Accordion 3", content: "Content for accordion 3" },
];

export const QuestionSummary: React.FC<Props> = ({
  nextStep,
  values,
  next,
}) => {
  const form = useForm({
    mode: "all",
  });

  return (
    <Grid
      sx={{ mt: 3, p: 4 }}
      container
      rowSpacing={1}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
    >
      <Box
        display="flex"
        width="100%"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        marginBottom="25px"
      >
        <Typography variant="h4">Question and Answer Summary</Typography>
        <Typography variant="h4">({values.type})</Typography>
      </Box>
      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        gap="8px"
        height="50vh"
        style={{
          overflowY: "auto",
        }}
      >
        {values.questionnaires &&
          values.questionnaires.map((item, index) => (
            <RegularQAccordion
              clientNeeds={item.clientNeeds}
              cognitivelevel={item.cognitiveLevel}
              contentArea={item.contentArea}
              question={item.question}
              answers={item.answers}
              index={index}
            />
          ))}
      </Box>
    </Grid>
  );
};
