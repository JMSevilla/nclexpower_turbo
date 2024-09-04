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
import { SummaryAccordionLoader } from "./loader";
import { useSensitiveInformation } from "../../../../../../../../../../../../hooks";
import { convertToCreateRegularType } from "../../utils/convertToCreateRegularType";

interface Props {
  nextStep(values: Partial<ContainedRegularQuestionType>): void;
  previousStep(): void;
  next: () => void;
  previous: () => void;
}

export const QuestionSummary: React.FC<Props> = ({
  nextStep,
  previousStep,
  next,
  previous,
}) => {
  const [loading, setLoading] = useState(true);
  const [questionnaireAtom] = useAtom(CreateRegularAtom);

  const { businessQueryCreateRegularQuestion } = useBusinessQueryContext();
  const { mutateAsync, isLoading } = businessQueryCreateRegularQuestion();
  const { internal } = useSensitiveInformation();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  async function onSubmit() {
    if (questionnaireAtom) {
      const res = await mutateAsync(
        convertToCreateRegularType(questionnaireAtom, internal)
      );
      if (res.data === 200) {
        nextStep({});
        next();
      }
    }
  }

  if (loading) {
    return <SummaryAccordionLoader />;
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
            title="Please ensure all information is accurate before proceeding."
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
