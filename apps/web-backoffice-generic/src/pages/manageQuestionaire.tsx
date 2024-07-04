import React, { useState } from "react";
import { ControlledTabs } from "core-library/components";
import { CaseStudyQustionaire, RegQuestionaire } from "../components/blocks";

export default function Questionaire() {
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
    setTabValue(newValue);
  };

  return (
    <>
      <ControlledTabs
        value={tabValue}
        tabsName={tabname}
        handleChange={handleTabValue}
      >
        {tabValue === 0 ? (
          <RegQuestionaire />
        ) : (
          tabValue === 1 && <CaseStudyQustionaire />
        )}
      </ControlledTabs>
    </>
  );
}
