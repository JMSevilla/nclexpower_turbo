import { CaseStudyProps } from "@/core/types/ssrData";
import { Grid, Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { NotesComponent } from './NotesComponent';
import { useToolbarSettings } from "@repo/core-library/contexts/ToolbarSettingsContext";

const fontStyle = {
  fontFamily: 'Arial, sans-serif',
  fontSize: '0.85rem',
}

export const NotesInfo: React.FC<CaseStudyProps> = ({ questionaire }) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const { textZoomStyle } = useToolbarSettings();
  if (!questionaire || questionaire.length === 0) return null;

  const tabs = questionaire.flatMap((questionItem) => questionItem.tabs);

  return (
    <Grid item xs={12} sm={6} md={6}>
      <Box sx={{ width: '100%', height: '100%', padding: 3 }}>
        {questionaire.map((questionItem) => (
          <Box key={questionItem.qId} className="w-full">
            <div className="w-full text-sm mb-4 pr-5 pt-4">
              <Typography sx={fontStyle} style={textZoomStyle}>{questionItem.question}</Typography>
            </div>
          </Box>
        ))}
        <Box className="flex gap-1">
          {tabs.map((tab, tabIndex: number) => (
            <div
              key={tabIndex}
              className={`px-5 py-1 rounded-t-md text-sm font-semibold flex items-center  ${activeTab === tabIndex ? "underline bg-white cursor-default" : "bg-slate-200 hover:bg-slate-100 cursor-pointer"
                }`}
              onClick={() => setActiveTab(tabIndex)}
            >
              <Typography sx={fontStyle} style={textZoomStyle}>{tab.tabsTitle}</Typography>
            </div>
          ))}
        </Box>
        <NotesComponent tabs={tabs} activeTab={activeTab} />
      </Box>
    </Grid>
  );
};