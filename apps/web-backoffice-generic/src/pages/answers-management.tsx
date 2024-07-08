import React, { useState } from "react";
import { ControlledTabs } from "core-library/components";
import { RegAnswers, CSAnswer } from "../components/blocks";
import { answertabname } from "@/core/constant/TabName";

export default function Questionnaire() {
  const [tabValue, setTabValue] = useState<number>(0);

  const handleTabValue = (event: React.SyntheticEvent, newValue: number) => {
    event.preventDefault();
    setTabValue(newValue);
  };

  const renderQuestionnaire = (value: number) => {
    switch (value) {
      case 0:
        return <RegAnswers />;
      case 1:
        return <CSAnswer />;
      default:
        return null;
    }
  };

  return (
      <ControlledTabs
        value={tabValue}
        tabsName={answertabname}
        handleChange={handleTabValue}
      >
        {renderQuestionnaire(tabValue)}
      </ControlledTabs>
  );
}
