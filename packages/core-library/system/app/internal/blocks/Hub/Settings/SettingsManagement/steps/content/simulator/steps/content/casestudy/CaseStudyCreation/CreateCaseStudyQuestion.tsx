import React from "react";
import { ContainedCaseStudyQuestionType } from "../../../../types";
import {
  Button,
  Card,
  Tabs,
} from "../../../../../../../../../../../../../../components";
import { Box, Typography } from "@mui/material";
import { AnswerCaseStudy } from "./AnswerCaseStudy";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { containedCaseStudyQuestionSchema } from "../../../../validation";
import { tabs } from "../../../../../../../constants/constants";
import ConfirmationModal from "../../../../../../../../../../../../../../components/Dialog/DialogFormBlocks/RegularQuestion/ConfirmationDialog";

interface Props {
  nextStep(values: Partial<ContainedCaseStudyQuestionType>): void;
  previousStep(): void;
  values: Partial<ContainedCaseStudyQuestionType>;
  next: () => void;
  previous: () => void;
  reset: () => void;
}

export const CreateCaseStudyQuestion: React.FC<Props> = ({
  nextStep,
  previousStep,
  values,
  next,
  previous,
  reset,
}) => {
  const form = useForm({
    mode: "all",
    resolver: yupResolver(containedCaseStudyQuestionSchema),
  });

  const handlePrevious = () => {
    previousStep();
    previous();
    reset();
  };

  const TabsItemInfo = tabs.map(({ id, title, component: Component }) => ({
    id,
    title,
    content: (
      <Box sx={{ border: "black" }}>
        <Component />
      </Box>
    ),
  }));

  const generateTabsItemQuestion = (count: number) => {
    return Array.from({ length: count }, (_, index) => ({
      id: index,
      title: `Item ${index + 1}`,
      content: <AnswerCaseStudy index={index} />,
    }));
  };

  const TabsItemQuestion = generateTabsItemQuestion(6);

  const watch = useWatch({ control: form.control });

  console.log("watch : ", watch);

  return (
    <Box>
      <FormProvider {...form}>
        <Typography
          sx={{
            textAlign: "center",
            fontWeight: 700,
            textTransform: "uppercase",
            paddingY: 10,
          }}
        >
          Question and Answer Creation
        </Typography>
        <Typography
          sx={{
            textAlign: "center",
            fontWeight: 700,
            textTransform: "uppercase",
            paddingY: 10,
          }}
        >
          Background Info
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "start",
            mt: 5,
            gap: 5,
          }}
        >
          <Card
            sx={{
              p: 5,
              textAlign: "center",
              width: "50%",
              overflowY: "auto",
              maxHeight: "750px",
            }}
          >
            <Tabs width="fit-content" tabsItem={TabsItemInfo} />
          </Card>
          <Card
            sx={{
              p: 5,
              textAlign: "center",
              width: "50%",
            }}
          >
            {/* Answer Part cc: Jacob */}
            <Tabs width="fit-content" tabsItem={TabsItemQuestion} />
          </Card>
        </Box>
      </FormProvider>
      <Box
        sx={{
          width: "100%",
          justifyContent: "space-between",
          paddingX: 5,
          display: "flex",
          marginTop: 5,
        }}
      >
        <ConfirmationModal
          dialogContent="This action will reset all forms."
          confirmButtonText="Confirm"
          isLoading={false}
          customButton="Confirm"
          handleSubmit={handlePrevious}
        />
        <Button>Continue</Button>
      </Box>
    </Box>
  );
};
