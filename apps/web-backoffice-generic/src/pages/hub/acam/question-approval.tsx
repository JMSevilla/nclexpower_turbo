import React from 'react';
import withAuth from "core-library/core/utils/withAuth";
import { Alert, Tabs } from "core-library/components";

const questionTabs = [
  { id: 1, title: 'Regular', content: 'Regular Questions' },
  { id: 2, title: 'Case Study', content: 'Case Studies' },
];

const TabContent: React.FC = () => {
  return (
    <div>
      <Tabs tabsItem={questionTabs} />
      <Alert
        severity="info"
        title="contents" />
    </div>
  );
};

export default withAuth(TabContent);
