import React, { useEffect, useState } from "react";
import { ContainedRegularQuestionType } from "../../types";
import { Box, Grid, Typography } from "@mui/material";
import {
  Button,
  SummaryAccordion,
  Alert,
} from "../../../../../../../../../../../../components";
import ConfirmationModal from "../../../../../../../../../../../../components/Dialog/DialogFormBlocks/RegularQuestion/ConfirmationDialog";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import { useAtom } from "jotai";
import { CreateRegularAtom } from "../../useAtomic";
import { useBusinessQueryContext } from "../../../../../../../../../../../../contexts";
import { MainContentCollectionsDtos } from "../../../../../../../../../../../../api/types";
import { CreateQuestionLoader } from "./loader";

interface Props {
  nextStep(values: Partial<ContainedRegularQuestionType>): void;
  previousStep(): void;
  next: () => void;
}

export const QuestionSummary: React.FC<Props> = ({
  nextStep,
  previousStep,
  next,
}) => {
  const [loading, setLoading] = useState(true);
  const [questionnaireAtom] = useAtom(CreateRegularAtom);

  const { businessQueryCreateRegularQuestion } = useBusinessQueryContext();
  const { mutateAsync, isLoading } = businessQueryCreateRegularQuestion();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // 3000 milliseconds = 3 seconds

    // Cleanup the timeout if the component is unmounted before the timeout is completed
    return () => clearTimeout(timer);
  }, []);

  const convertToCreateRegularType = (
    containedRegularQuestion: ContainedRegularQuestionType
  ) => {
    const mainContentCollectionsDtos: MainContentCollectionsDtos[] = (
      containedRegularQuestion.questionnaires || []
    ).map((item) => ({
      cognitiveLevel: item.cognitiveLevel,
      clientNeeds: item.clientNeeds,
      contentArea: item.contentArea,
      question: item.question,
      mainContentAnswerCollectionDtos: (item.answers || []).map(
        (answerItem) => ({
          answer: answerItem.answer,
          answerKey: answerItem.answerKey as boolean,
        })
      ),
    }));

    return {
      email: "test@testaccount.com",
      contentDto: {
        type: containedRegularQuestion.type,
        mainType: containedRegularQuestion.main_type,
        mainContentCollectionsDtos: mainContentCollectionsDtos,
      },
    };
  };

  async function onSubmit() {
    if (questionnaireAtom) {
      const res = await mutateAsync(
        convertToCreateRegularType(questionnaireAtom)
      );
      if (res.data === 200) {
        nextStep({});
        next();
      }
    }
  }

  if (loading) {
    return <CreateQuestionLoader />;
  }

  return (
    <Grid
      sx={{ mt: 3, p: 4 }}
      container
      rowSpacing={1}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
    >
      <Box display="flex" width="100%" marginBottom="25px" position="relative">
        <Button onClick={previousStep} sx={{ zIndex: 1 }}>
          <TrendingFlatIcon sx={{ rotate: "180deg", color: "#37BEC7" }} />
          <Typography>Go Back</Typography>
        </Button>
        <Box
          marginTop="30px"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          width="100%"
          height="100%"
          sx={{
            position: "absolute",
            zIndex: 0,
          }}
        >
          <Typography variant="h5">
            <b>Question and Answer Summary</b>
          </Typography>
          <Typography variant="h5" data-testid={`questionType`}>
            <b>({questionnaireAtom?.type})</b>
          </Typography>
          <Alert
            severity="info"
            title="By clicking the Continue button, you will send the information you have entered."
          />
        </Box>
      </Box>
      <Box
        marginTop="45px"
        width="100%"
        minHeight="350px"
        display="flex"
        flexDirection="column"
        marginX="25px"
        gap="8px"
        sx={{
          backgroundColor: "#F3F3F3",
          borderRadius: "10px",
        }}
      >
        {questionnaireAtom?.questionnaires &&
          questionnaireAtom?.questionnaires.map((item, index) => (
            <SummaryAccordion
              item={item}
              type={questionnaireAtom.type || ""}
              index={index}
            />
          ))}
      </Box>
      <Box display="flex" justifyContent="end" width="100%" marginTop="20px">
        <ConfirmationModal
          dialogContent="Are you sure you want to continue?"
          customButton={<Button>Continue</Button>}
          handleSubmit={onSubmit}
          isLoading={isLoading}
        />
      </Box>
    </Grid>
  );
};
