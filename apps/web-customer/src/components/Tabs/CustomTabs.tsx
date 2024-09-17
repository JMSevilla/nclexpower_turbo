import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

interface CustomTabsProps {
  tabs: { label: string; content: React.ReactNode }[];
  tabStyles?: {
    selectedColor?: string;
    defaultColor?: string;
    borderBottom?: string;
    tabGap?: string;
  };
}

const CustomTab = styled(Tab)<{
  selectedColor: string;
  defaultColor: string;
  borderBottom: string;
  tabGap?: string,
}>(({ selectedColor, defaultColor, borderBottom, tabGap }) => ({
  "&.Mui-selected": {
    color: selectedColor || "#F4C501",
    fontWeight: "bold",
    borderBottom: borderBottom || "2px solid #F4C501",
    "&::after": {
      content: '""',
      display: "block",
      width: "100%",
      transform: "scaleX(1)",
      transition: "transform 0.3s ease",
    },
  },
  "&:not(.Mui-selected)": {
    color: defaultColor || "white",
    borderBottom: borderBottom || "2px solid transparent",
  },
  marginRight: tabGap || '10px',
  textAlign: 'center',
  '@media (max-width:600px)': {
    borderBottom: 'none !important',
    color: defaultColor || "white",
  }
}));

const CustomTabsRoot = styled(Tabs)(({ theme }) => ({
  overflowX: 'auto',
  position: 'relative',
  '& .MuiTabs-flexContainer': {
    flexWrap: 'wrap',
    [theme.breakpoints.up('sm')]: {
      flexWrap: 'nowrap',
    },
  },
  [theme.breakpoints.down('sm')]: {
    '& .MuiTabIndicator-root': {
      display: 'none !important',
    },
    '& .Mui-selected': {
      borderBottom: 'none !important',
    },
    '& .MuiTabs-flexContainer': {
      justifyContent: 'center',
    },
  },
}));

export default function CustomTabs({
  tabs,
  tabStyles = {},
}: CustomTabsProps) {
  const { selectedColor, defaultColor, borderBottom, tabGap } = tabStyles;
  
  const [tabIndex, setTabIndex] = React.useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <Box sx={{ width: 'auto' }} className="flex flex-col items-center justify-center">
      <Box sx={{ borderBottom: 0 }}>
        <CustomTabsRoot
          value={tabIndex}
          onChange={handleTabChange}
          aria-label="dynamic tabs"
          sx={{ gap: tabGap || '16px' }}
          TabIndicatorProps={{
            style: isMobile ? { display: 'none' } : { display: 'block' }
          }}
        >
          {tabs.map((tab, index) => (
            <CustomTab
              key={index}
              label={tab.label}
              id={`simple-tab-${index}`}
              aria-controls={`simple-tabpanel-${index}`}
              selectedColor={selectedColor || "#F4C501"}
              defaultColor={defaultColor || "white"}
              borderBottom={borderBottom || "2px solid white"}
            />
          ))}
        </CustomTabsRoot>
      </Box>
      {tabs.map((tab, index) => (
        <div
          key={index}
          role="tabpanel"
          hidden={tabIndex !== index}
          id={`simple-tabpanel-${index}`}
          aria-labelledby={`simple-tab-${index}`}
        >
          {tabIndex === index && <Box sx={{ p: 3 }}>{tab.content}</Box>}
        </div>
      ))}
    </Box>
  );
}
