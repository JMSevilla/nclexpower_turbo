import React, { useState } from "react";
import { ControlledTabs } from "core-library/components";
import { CSQuestionnaire, RegQuestionnaire } from "../components/blocks";

export default function Questionnaire() {
  const [tabValue, setTabValue] = useState<number>(0);

  const tabname = [
    {
      label: "Regular Questions",
    },
    {
      label: "CaseStudy Questions",
    },
  ];

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
    <>
      <ControlledTabs
        value={tabValue}
        tabsName={tabname}
        handleChange={handleTabValue}
      >
        {renderQuestionnaire(tabValue)}
      </ControlledTabs>
    </>
  );
}
