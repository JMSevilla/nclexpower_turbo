import React from 'react';
import withAuth from "core-library/core/utils/withAuth";
import { Alert, InformationTitle, Tabs } from "core-library/components";
import { Box } from '@mui/material';

const questionTabs = [
  { id: 1, title: 'Regular', content: 'Regular Questions' },
  { id: 2, title: 'Case Study', content: 'Case Studies' },
];

const TabContent: React.FC = () => {
  return (
    <Box sx={{ mb: 5 }}>
      <InformationTitle
          text="Content Approval"
          lineWidth={6}
          lineHeight={35}
          lineColor="#6A5ACD"
          borderRadius={2}
          containerProps={{ mb: 10 }}
          textProps={{ color: "text.primary", fontWeight: "bold" }}
      />
      <Box 
        sx={{
          border: '1px solid #ddd',
          borderRadius: 2,
          p: 2,
          boxShadow: 3,
          backgroundColor: '#fff',
          display: 'flex',
          justifyContent: 'flex-start',
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Tabs tabsItem={questionTabs} />
        </Box>
      </Box>
    </Box>
  );
};

export default withAuth(TabContent);
