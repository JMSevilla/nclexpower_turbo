import React, { useEffect, useState } from "react";
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
import ConfirmationModal from "../../../../../../../../../../../../../../components/Dialog/DialogFormBlocks/RegularQuestion/ConfirmationDialog";
import { BackgroundInfoTab } from "./components/BackgroundInfoTab";

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
  const form = useForm<ContainedCaseStudyQuestionType>({
    mode: "all",
    resolver: yupResolver(containedCaseStudyQuestionSchema),
  });
  const [selectedIndex, setSelectedIndex] = useState<number>();

  const { getValues, control, reset: formReset } = form;

  const updateValues = () => {
    const updatedValues: any = {};

    formReset({
      ...getValues(),
      ...updatedValues,
    });
  };

  const handlePrevious = () => {
    previousStep();
    previous();
    reset();
  };

  const BGInfoTabs = [
    {
      id: 0,
      title: "Nurse Notes",
      content: (
        <Box sx={{ border: "black" }}>
          <BackgroundInfoTab type="nurseNotes" />
        </Box>
      ),
    },
    {
      id: 1,
      title: "HxPhy",
      content: (
        <Box sx={{ border: "black" }}>
          <BackgroundInfoTab type="hxPhy" />
        </Box>
      ),
    },
    {
      id: 2,
      title: "Labs",
      content: (
        <Box sx={{ border: "black" }}>
          <BackgroundInfoTab type="labs" />
        </Box>
      ),
    },
    {
      id: 3,
      title: "Orders",
      content: (
        <Box sx={{ border: "black" }}>
          <BackgroundInfoTab type="orders" />
        </Box>
      ),
    },
  ];

  const generateTabsItemQuestion = (count: number) => {
    return Array.from({ length: count }, (_, index) => ({
      id: index,
      title: `Item ${index + 1}`,
      content: <AnswerCaseStudy index={index} />,
    }));
  };

  useEffect(() => {
    updateValues();
  }, [selectedIndex, control]);

  const TabsItemQuestion = generateTabsItemQuestion(6);
  const watch = useWatch({ control: control });

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
            <Tabs
              width="fit-content"
              selectedTabIndex={(value) => setSelectedIndex(value)}
              tabsItem={BGInfoTabs}
            />
          </Card>
          <Card
            sx={{
              p: 5,
              textAlign: "center",
              width: "50%",
            }}
          >
            {/* Answer Part cc: Jacob */}
            {/* <Tabs width="fit-content" tabsItem={TabsItemQuestion} /> */}
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
