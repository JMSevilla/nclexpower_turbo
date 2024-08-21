import React, { useState } from "react";
import { Paper, Box, Grid, Typography } from "@mui/material";
import { SsrQuestionaireContentProps, CaseStudyProps } from "@/core/types/ssrData";
import { useToolbarSettings } from '@/core/context/ToolbarSettingsContext';
interface NotesComponentProps {
  tabs: CaseStudyProps["questionaire"][number]["tabs"];
  activeTab: number;
}

export const NotesComponent: React.FC<NotesComponentProps> = ({ tabs, activeTab }) => {
  const activeTabContent = tabs?.[activeTab];
  const { textZoomStyle } = useToolbarSettings();
  return (
    <Paper className="rounded-b-md rounded-r-md h-5/6 max-h-[500px] p-5 overflow-y-auto flex flex-col gap-5 shadow-lg bg-white">
      <Box className="flex flex-col gap-y-4">
        {activeTabContent && (
          <div className="flex w-full gap-2" >
            <p className="font-semibold min-w-[50px]">{activeTabContent.tabsId}:</p>
            <div className="leading-6 text-sm " style={textZoomStyle}>
              {typeof activeTabContent.content === "string" ? (
                <>{activeTabContent.content}</>
              ) : (
                activeTabContent.content?.map(
                  (contentItem: SsrQuestionaireContentProps, contentItemIdx) => (
                    <React.Fragment key={contentItemIdx}>
                      <p className="min-w-[50px] inline-block">
                        <span>
                          <strong>{contentItem.contentId}</strong>
                        </span>
                        : {contentItem.content}
                      </p>
                      <br />
                    </React.Fragment>
                  )
                )
              )}
            </div>
          </div>
        )}
      </Box>
    </Paper>
  );
};