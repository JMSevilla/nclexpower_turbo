import React, { useState } from "react";
import { ControlledTabs } from "core-library/components";
import { CSQuestionnaire, RegQuestionnaire } from "../components/blocks";
import { questionTabName } from "@/core/constant/TabName";

export default function Questionnaire() {
  const [tabValue, setTabValue] = useState<number>(0);

  const handleTabValue = (event: React.SyntheticEvent, newValue: number) => {
    event.preventDefault();
    setTabValue(newValue);
  };

  const renderQuestionnaire = (value: number) => {
    switch (value) {
      case 0:
        return <RegQuestionnaire />;
      case 1:
        return <CSQuestionnaire />;
      default:
        return null;
    }
  };

  return (
      <ControlledTabs
        value={tabValue}
        tabsName={questionTabName}
        handleChange={handleTabValue}
      >
        {renderQuestionnaire(tabValue)}
      </ControlledTabs>
  );
}
