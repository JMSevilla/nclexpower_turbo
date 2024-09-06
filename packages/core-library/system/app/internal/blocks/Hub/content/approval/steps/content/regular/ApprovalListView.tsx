import React from "react";
import { Card } from "../../../../../../../../../../components";

interface Props {
  nextStep(values: {}): void;
  previousStep(): void;
  values: {};
}

// datagrid list.
export const ApprovalListView: React.FC<Props> = ({ nextStep }) => {
  return <Card sx={{ mt: 5, p: 5 }}>test</Card>;
};
