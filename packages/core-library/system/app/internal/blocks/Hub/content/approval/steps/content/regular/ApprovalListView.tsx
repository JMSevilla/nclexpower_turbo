import React from "react";
import { Button, Card } from "../../../../../../../../../../components";

export interface ApprovalProps {
  nextStep({}): void;
  previousStep(): void;
  values: {};
}

export const ApprovalListView: React.FC<ApprovalProps> = ({ nextStep }) => {
  const handleSelection = () => {
    nextStep({});
  };

  return (
    <>
      <Button onClick={() => handleSelection()}>
        Select multiple approval
      </Button>

      <Card sx={{ mt: 5, p: 5 }}>test</Card>
    </>
  );
};
