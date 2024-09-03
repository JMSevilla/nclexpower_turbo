import React, { useEffect, useState } from "react";
import { Card } from "../../../../../../../../../../../../components";
import { Box, Grid, Divider, Typography } from "@mui/material";
import { ContainedRegularQuestionType } from "../../types";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegularQuestionSelectionOptions } from "../../../../../types";
import { QuestionTypeSelectionLoader } from "./loader";

interface Props {
  nextStep(values: Partial<ContainedRegularQuestionType>): void;
  previousStep(): void;
  values: Partial<ContainedRegularQuestionType>;
  next: () => void;
}

const chooseQuestionTypeSchema = yup.object({
  type: yup
    .mixed<RegularQuestionSelectionOptions>()
    .oneOf(["MCQ", "SATA"])
    .required(),
});

type ChooseQuestionTypeStepFormType = yup.InferType<
  typeof chooseQuestionTypeSchema
>;

export const QuestionTypeSelection: React.FC<Props> = ({
  nextStep,
  values,
  next,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const { reset, setValue } = useForm<ChooseQuestionTypeStepFormType>({
    resolver: yupResolver(chooseQuestionTypeSchema),
    mode: "all",
    criteriaMode: "all",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3000 milliseconds = 3 seconds

    // Cleanup the timeout if the component is unmounted before the timeout is completed
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    reset({
      type: values.type,
    });
  }, [values.type]);

  const handleSelection = (values: ChooseQuestionTypeStepFormType) => {
    setValue("type", values.type);
    nextStep({ type: values.type });
    next();
  };

  if (isLoading) {
    return <QuestionTypeSelectionLoader />;
  }

  return (
    <Grid
      sx={{ mt: 3 }}
      container
      rowSpacing={1}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
    >
      <Grid item xs={6}>
        <Card hoverEffect onClick={() => handleSelection({ type: "MCQ" })}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100px"
          >
            <Typography>(MCQ)</Typography>
            <Typography>Multiple Choice Question</Typography>
          </Box>
        </Card>
      </Grid>
      <Grid item xs={6}>
        <Card hoverEffect onClick={() => handleSelection({ type: "SATA" })}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100px"
          >
            <Typography>(SATA)</Typography>
            <Typography>Select All That Apply</Typography>
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
};
