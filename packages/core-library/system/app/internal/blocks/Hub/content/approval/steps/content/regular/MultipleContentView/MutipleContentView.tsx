import React from "react";
import { Box } from "@mui/material";
import { Button } from "../../../../../../../../../../../components";
import { mockData } from "./MockData";
import { MultipleAccordion } from "./MultipleAccordion";

interface Props {
  nextStep(values: {}): void;
  previousStep(): void;
  values: {};
}

export const MultipleContentView: React.FC<Props> = ({
  nextStep,
  previousStep,
}) => {
  const handlePreviousStep = () => {
    previousStep();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        maxHeight: "80vh",
        overflowY: "auto",
        rowGap: 6,
      }}
    >
      <Button onClick={handlePreviousStep}>Go back</Button>
      {mockData.contentApprovers.map((item, index) => (
        <MultipleAccordion data={item} index={index} />
      ))}
    </Box>
  );
};
