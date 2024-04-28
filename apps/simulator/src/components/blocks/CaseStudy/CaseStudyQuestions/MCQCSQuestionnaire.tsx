import { Paper, Grid } from '@mui/material';
import React from 'react';
import { SsrData } from "@/core/types/ssrData";
import { MCQAnswerGroupTable } from '@/components/blocks/CaseStudy/CaseStudyQuestions/MCQTable/MCQAnswerGroupTable';

export const MCQCSQuestionnaire: React.FC<SsrData> = ({ questionaire }) => {
    return (
        <div className="p-2 py-2 min-h-[100dvh] w-full">
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={12} sm={6} md={6}>
                    <div className='h-full w-full p-4'>
                        {questionaire ? questionaire.length > 0 &&
                            questionaire.map((questionItem) => (
                                <div key={questionItem.qId} className='w-full'>
                                    <div className='w-full text-sm mb-4 pr-5 pt-4'>
                                        <p>{questionItem.question}</p>
                                    </div>
                                    <div className='w-full'>
                                        {questionItem.tabs &&
                                            questionItem.tabs.map((tab) => (
                                                <>
                                                    <div className='flex gap-1'>
                                                        <div
                                                            key={tab.tabsId}
                                                            className='bg-white w-fit px-5 py-1 rounded-t-md text-sm font-semibold flex items-center mb-[-3px]'
                                                        >
                                                            <p>{tab.tabsTitle}</p>
                                                        </div>
                                                    </div>
                                                    <Paper elevation={3} className='p-5 overflow-auto flex flex-col gap-5' style={{ maxHeight: '70vh' }}>
                                                        <div key={tab.tabsId} className=' h-[45vh] flex w-full gap-2'>
                                                            <p className='font-semibold min-w-[50px]'>{tab.tabsId} :</p>
                                                            <div className='leading-6 text-sm'>{typeof tab.content === "string" && tab.content}</div>
                                                        </div>
                                                    </Paper>
                                                </>
                                            ))}
                                    </div>
                                </div>
                            ))
                            :
                            null}
                    </div>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                    <MCQAnswerGroupTable table={questionaire} />
                </Grid>

            </Grid>
        </div>
    );
};
