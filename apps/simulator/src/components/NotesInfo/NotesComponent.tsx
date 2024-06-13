import React from "react";
import { Paper, Box } from "@mui/material";
import { SsrQuestionaireContentProps, CaseStudyProps } from "@/core/types/ssrData";

interface NotesComponentProps {
  questionaire: CaseStudyProps["questionaire"];
  activeTab: number;
}

export const NotesComponent: React.FC<NotesComponentProps> = ({ questionaire, activeTab }) => {
  return (
    <Paper className="rounded-b-md rounded-r-md h-5/6 max-h-[500px] p-5 overflow-y-auto flex flex-col gap-5 shadow-lg bg-white">
      <Box className="flex flex-col gap-y-4">
        {questionaire?.length > 0 &&
          questionaire.map(
            (questionItem) =>
              questionItem?.tabs?.length > 0 &&
              questionItem.tabs.map((tab, tabIndex: number) => (
                <Box
                  key={tabIndex}
                  style={{ display: activeTab === tabIndex ? "block" : "none" }}>
                  <div className="flex w-full gap-2">
                    <p className="font-semibold min-w-[50px]">
                      {tab.tabsId} :
                    </p>
                    <div className="leading-6 text-sm">
                      {typeof tab.content === 'string' ? (
                        <>{tab.content}</>
                      ) : (
                        <>
                          {tab.content?.length > 0 &&
                            tab.content.map(
                              (
                                contentItem: SsrQuestionaireContentProps,
                                contentItemIdx
                              ) => (
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
                            )}
                        </>
                      )}
                    </div>
                  </div>
                </Box>
              ))
          )}
      </Box>
    </Paper>
  );
};


