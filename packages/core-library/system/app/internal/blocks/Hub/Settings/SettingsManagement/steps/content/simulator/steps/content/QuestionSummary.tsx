import React from "react";
import { ContainedRegularQuestionType } from "../../types";
import { Box, Grid, Typography, Accordion } from "@mui/material";
import { Button, SummaryAccordion } from "core-library/components";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import { useForm } from "react-hook-form";

interface Props {
  nextStep(values: Partial<ContainedRegularQuestionType>): void;
  previousStep(): void;
  values: Partial<ContainedRegularQuestionType>;
  next: () => void;
}

export const QuestionSummary: React.FC<Props> = ({
  nextStep,
  values,
  previousStep,
  next,
}) => {

// const questionnaire = [
//     {
//       answers: [
//         {
//           answer: "Answer 1",
//           answerKey: false
//         },
//         {
//           answer: "Answer 2",
//           answerKey: true
//         }
//       ],
//       question: "<p>Sample Question 1</p>",
//       contentArea: "Content Area 1",
//       clientNeeds: "Client Needs 1",
//       cognitiveLevel: "Cognitive Level 1"
//     },
//     {
//       answers: [
//         {
//           answer: "Answer 1",
//           answerKey: false
//         },
//         {
//           answer: "Answer 2",
//           answerKey: true
//         }
//       ],
//       question: "<p>Sample Question 1</p>",
//       contentArea: "Content Area 1",
//       clientNeeds: "Client Needs 1",
//       cognitiveLevel: "Cognitive Level 1"
//     },
//     {
//       answers: [
//         {
//           answer: "Answer 1",
//           answerKey: false
//         },
//         {
//           answer: "Answer 2",
//           answerKey: true
//         }
//       ],
//       question: "<p>Sample Question 1</p>",
//       contentArea: "Content Area 1",
//       clientNeeds: "Client Needs 1",
//       cognitiveLevel: "Cognitive Level 1"
//     },
//   ]

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
        marginBottom="25px"
        position="relative"
      >
        <Button onClick={previousStep} sx={{ zIndex: 2 }}>
          <TrendingFlatIcon sx={{ rotate: "180deg", color: "#37BEC7" }} />
          <Typography>Go Back</Typography>
        </Button>
        <Box 
          display="flex" 
          flexDirection="column" 
          justifyContent="center" 
          alignItems="center" 
          width="100%" 
          sx={{
            position: "absolute", 
            zIndex: 1
            }}
          >
          <Typography variant="h4">Question and Answer Summary</Typography>
          <Typography variant="h4">({values.type})</Typography>          
        </Box>
      </Box>
      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        marginX="25px"
        gap="8px"
      >
        {values.questionnaires &&
          values.questionnaires.map((item, index) => (
            <SummaryAccordion
              item={item}
              type={values.type}
              index={index}
            />
          ))}
      </Box>
      <Box display="flex" justifyContent="end" width="100%" marginTop="20px">
        <div></div>
          <Button
          >
            Continue
          </Button>        
      </Box>
    </Grid>
  );
};
