import React from 'react';
import { Paper } from '@mui/material';
import { SsrData } from '@/core/types/ssrData';

export const MCQCSQuestionnaireBlock: React.FC<SsrData> = ({ questionaire }) => {
  return (
    questionaire.length > 0 && questionaire.map((questionItem: any) => (
      <div key={questionItem.qId} className='w-full'>
        <div className='w-full text-sm mb-4 pr-5 pt-4'>
          <p>{questionItem.question}</p>
        </div>
        <div className='w-full'>
          {questionItem.tabs &&
            questionItem.tabs.map((tab: any) => (
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
  )
}



