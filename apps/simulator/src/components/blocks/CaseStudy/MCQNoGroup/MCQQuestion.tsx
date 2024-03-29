

import MCQAnswerTable from '@/components/blocks/CaseStudy/MCQNoGroup/MCQAnswerTable'
import { Checkbox, Paper } from '@mui/material'
import React, { useState } from 'react'

interface QuestionData {
    contentTitle: string
    id: string
    qId: string
    question: string
    tabs: []
    displayType: string

}

interface AnswerData {
    answerInstruction: string
    choices: []
}

interface Props {
    question?: QuestionData[]
    answer?: AnswerData[]
}

export const MCQQuestion: React.FC<Props> = ({ question, answer }) => {


    const [activeTab, setActiveTab] = useState<number>(0);
    return (
        <div className='w-full h-full p-5 flex'>
            <div className='w-1/2 h-full px-10 py-5'>
                <div className='w-full text-sm mb-4 pr-5'>
                    <p> {question.question}</p>
                </div>
                <div className='w-full h-full'>

                    <div key={question?.qId} className='flex gap-1'>
                        {question.tabs && question.tabs.map((tab: any, tabIndex) => (
                            <div key={tab.tabId} className={`px-5 py-1 rounded-t-md text-sm font-semibold flex items-center cursor-pointer hover:bg-slate-100 ${activeTab === tabIndex ? ' underline bg-white ' : 'bg-slate-200' // Apply active styles
                                }`}
                                onClick={() => setActiveTab(tabIndex)}>
                                <p>{tab.tabsTitle}</p>
                            </div>
                        ))}
                    </div>

                    <Paper variant='elevation' className='rounded-b-md rounded-r-md h-5/6 max-h-[500px] p-5 overflow-y-auto flex flex-col gap-5'>

                        <div key={question?.qId} className='flex flex-col gap-y-4'>
                            {question.tabs && question.tabs.map((tab, tabIndex) => (
                                <div key={tab.tabsId} style={{ display: activeTab === tabIndex ? 'block' : 'none' }}>

                                    <div className='flex w-full gap-2'>
                                        <p className='font-semibold min-w-[50px]'>{tab.tabsId} :</p>
                                        <div className='leading-6 text-sm'>{tab.content}</div>
                                    </div>

                                </div>
                            ))}
                        </div>

                    </Paper>
                </div>
            </div>
            <div className='h-full w-1/2 px-10 py-5 flex flex-col gap-5'>
                <ol className='w-full text-sm mb-4 pr-5 list-disc'>
                    <li>{answer && answer.map((ans) => (
                        ans.answerInstruction
                    ))}</li>
                </ol>
                <div className='w-full h-fit'>
                    <MCQAnswerTable table={answer[0].table} />
                </div>
                <p>{answer[0].note}</p>
            </div>
        </div>
    )
}

export default MCQQuestion
