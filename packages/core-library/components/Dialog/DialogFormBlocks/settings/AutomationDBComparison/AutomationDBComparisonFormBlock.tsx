import React from "react";
import { AutomationDBComparisonForm } from "./AutomationDBComparisonForm";
import { ExcelRowRegularQuestion } from "../../../../../core";

interface Props {
  csvData: ExcelRowRegularQuestion[];
}

export function AutomationDBComparisonFormBlock(props: Props) {
  return <AutomationDBComparisonForm {...props} />;
}
