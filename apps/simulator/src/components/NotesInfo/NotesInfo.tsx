import { CaseStudyProps } from "@/core/types/ssrData";
import { Grid, Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { NotesComponent } from './NotesComponent';

const fontStyle = {
  fontFamily: 'Arial, sans-serif',
  fontSize: '0.85rem',
}

export const NotesInfo: React.FC<CaseStudyProps> = ({ questionaire }) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <Grid item xs={12} sm={6} md={6}>
      <Box sx={{ width: '100%', height: '100%', padding: 3 }}>
        {questionaire ? questionaire.length > 0 &&
          questionaire.map((questionItem) => (
            <Box key={questionItem.qId} className='w-full'>
              <div className='w-full text-sm mb-4 pr-5 pt-4'>
                <Typography sx={fontStyle}>{questionItem.question}</Typography>
              </div>
            </Box>
          ))
          :
          null}
        <Box className="flex gap-1">
          {questionaire?.length > 0 &&
            questionaire.map(
              (questionItem) =>
                questionItem?.tabs?.length > 0 &&
                questionItem.tabs.map((tab, tabIndex: number) => (
                  <div
                    key={tabIndex}
                    className={`px-5 py-1 rounded-t-md text-sm font-semibold flex items-center cursor-pointer
                                                    ${activeTab === tabIndex ? " underline bg-white cursor-default " : "bg-slate-200 hover:bg-slate-100"}`}
                    onClick={() => setActiveTab(tabIndex)}
                  >
                    <Typography sx={fontStyle}>{tab.tabsTitle}</Typography>
                  </div>
                ))
            )}
        </Box>
        <NotesComponent questionaire={questionaire} activeTab={activeTab} />
      </Box>
    </Grid>
  )
}
