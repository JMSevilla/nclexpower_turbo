

import SATATable from '@/components/blocks/RegularQuestion/SATA/SATATable'
import { Checkbox } from '@mui/material'
import NearMeIcon from '@mui/icons-material/NearMe';
import React, { useState } from 'react'


interface QuestionData {
    question: string
    qId: string
    tabs: Array<{
        tabsId: string
        displayType: string
        content: string
        table?: Array<{}>
    }>
    answer: Array<{
        answerInstruction: string
        choices: string[]
        answerUI: string
        answerId: string
        columns: string[]
        rows: string[]
        note: string
    }>
}

interface Props {
    question: QuestionData
    type: string
}

export const SATAQuestion: React.FC<Props> = ({ question }) => {
    const { answer } = question

    const [activeTab, setActiveTab] = useState<number>(0);
    return (
        <div className='w-full h-full flex'>
            <div className='w-1/2 h-full p-5'>
                <div className='w-full text-sm mb-4 pr-5'>
                    <p>{question.question}</p>
                </div>
                <div className='w-full h-full '>
                    <div key={question?.qId} className='flex gap-1'>
                        {question.tabs && question.tabs.map((tab: any, tabIndex) => (
                            <div key={tab.tabId} className={` px-5 py-1 rounded-t-md text-sm font-semibold flex items-center cursor-pointer hover:bg-slate-100 ${activeTab === tabIndex ? ' underline bg-white ' : 'bg-slate-200' // Apply active styles
                                }`}
                                onClick={() => setActiveTab(tabIndex)}>
                                <p>{tab.tabsTitle}</p>
                            </div>
                        ))}
                    </div>

                    <div className='rounded-b-md rounded-r-md h-5/6 max-h-[500px] p-5 overflow-y-auto flex flex-col gap-5 shadow-lg bg-white'>

                        <div key={question?.qId} className='flex flex-col gap-y-4'>
                            {question.tabs && question.tabs.map((tab, tabIndex) => (
                                <div key={tab.tabsId} style={{ display: activeTab === tabIndex ? 'block' : 'none' }}>
                                    {tab.displayType === "Table" ?
                                        <p>TABLE DISPLAY</p>
                                        :
                                        <div className='flex w-full gap-2'>
                                            <p className='font-semibold min-w-[50px]'>{tab.tabsId} :</p>
                                            <div className='leading-6 text-sm'>{tab.content}</div>
                                        </div>
                                    }
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className='h-full w-1/2 p-5'>
                {answer && answer.map((answerItem) => (
                    answerItem.answerUI === "Table" ?
                        <SATATable data={answer} />
                        :
                        <>
                            <ol className='w-full text-sm mb-4 pr-5 '>
                                <li>{answer && answer.map((answerItem) => (
                                    <p><NearMeIcon className='h-6 rotate-45 text-[#86BCEA] mr-2 pb-1' />{answerItem.answerInstruction}</p>
                                ))}</li>
                            </ol>
                            <div className='w-full h-fit shadow-lg p-10 flex flex-col gap-5 rounded-md bg-white'>
                                {answer && answer.map((choiceMap) =>
                                    choiceMap?.choices && choiceMap?.choices.map((choiceItem, choiceIndex) => (
                                        <div className='flex items-center' key={choiceIndex}>
                                            <span>{choiceIndex + 1} . </span>
                                            <span><Checkbox sx={{ height: "20px" }} /></span>
                                            <p>{choiceItem}</p>
                                        </div>
                                    )))}
                            </div>
                        </>
                ))}

            </div>
        </div>
    )
}

export default SATAQuestion
