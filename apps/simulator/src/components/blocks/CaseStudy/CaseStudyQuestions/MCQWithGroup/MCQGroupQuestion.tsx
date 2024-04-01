
import { MCQAnswerGroupTable } from '@/components/blocks/CaseStudy/CaseStudyQuestions/MCQWithGroup/MCQAnswerGroupTable';
import { CaseStudyMCQ } from '@/core/types/ssrData';
import React, { useState } from 'react'


export const MCQGroupQuestion: React.FC<CaseStudyMCQ> = ({ questionaire }) => {
    const [activeTab, setActiveTab] = useState<number>(0);
    return (
        <>
            {questionaire && questionaire.map((questionItem: any, questionIndex: number) =>
                <div key={questionIndex} className='w-full h-full p-5 flex'>
                    <div className='w-1/2 h-full px-10 py-5'>
                        <div className='w-full text-sm mb-4 pr-5'>
                            <p> {questionItem.question}</p>
                        </div>
                        <div className='w-full h-full'>

                            <div className='flex gap-1'>
                                {questionItem.tabs.map((TabItem: any, tabIndex: number) => (
                                    <div key={tabIndex} className={`px-5 py-1 rounded-t-md text-sm font-semibold flex items-center cursor-pointer hover:bg-slate-100 ${activeTab === tabIndex ? ' underline bg-white ' : 'bg-slate-200' // Apply active styles
                                        }`}
                                        onClick={() => setActiveTab(tabIndex)}>
                                        <p>{TabItem.tabsTitle}</p>
                                    </div>
                                ))}
                            </div>

                            <div className='rounded-b-md rounded-r-md h-5/6 max-h-[500px] p-5 overflow-y-auto flex flex-col gap-5 shadow-lg bg-white'>

                                <div className='flex flex-col gap-y-4'>
                                    {questionItem.tabs.map((TabItem: any, tabIndex: number) => (
                                        <div key={TabItem.tabsId} style={{ display: activeTab === tabIndex ? 'block' : 'none' }}>

                                            <div className='flex w-full gap-2'>
                                                <p className='font-semibold min-w-[50px]'>{TabItem.tabsId} :</p>
                                                <div className='leading-6 text-sm'>{TabItem.content}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='h-full w-1/2 px-10 py-5 flex flex-col gap-5'>
                        <div className='w-full h-fit'>
                            <MCQAnswerGroupTable table={questionItem.answer} />
                        </div>
                    </div>
                </div>

            )}
        </>
    )
}

