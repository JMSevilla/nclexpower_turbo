

import { Checkbox, Grid } from '@mui/material'
import NearMeIcon from '@mui/icons-material/NearMe';
import React, { useState } from 'react'
import { AnswerProps, QuestionaireWithAnswerProps, RegularSATA } from '@/core/types/ssrData';

export const SATAQuestionaire: React.FC<RegularSATA> = ({ questionaire }) => {

    const [activeTab, setActiveTab] = useState<number>(0);
    const [checkedValues, setCheckedValues] = useState<number[]>([]);
    const handleCheckBoxValues = (value: number) => {
        const isChecked = checkedValues.includes(value);
        if (isChecked) {
            setCheckedValues(checkedValues.filter((val) => val !== value));
        } else {
            setCheckedValues([...checkedValues, value]);
        }
    };


    return (
        <div className=' h-full '>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={12} sm={6} md={6}>
                    <div className='w-full h-full p-5'>
                        <div className='w-full text-sm mb-4 pr-5'>
                            {questionaire?.length > 0 && questionaire.map((questionItem: QuestionaireWithAnswerProps, questionIndex: number) => (
                                <div key={questionIndex} className='w-full text-sm mb-4 pr-5'>
                                    <p className="flex" >
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: questionItem.question,
                                            }}
                                        />
                                    </p>
                                </div>
                            ))}
                        </div>
                        <div className='w-full h-full '>
                            <div className='flex gap-1'>
                                {questionaire?.length > 0 && questionaire.map((questionItem: QuestionaireWithAnswerProps) =>
                                    questionItem?.tabs?.length > 0 && questionItem.tabs.map((tab: any, tabIndex) => (
                                        <div key={tab.tabId} className={` px-5 py-1 rounded-t-md text-sm font-semibold flex items-center cursor-pointer hover:bg-slate-100 ${activeTab === tabIndex ? ' underline bg-white ' : 'bg-slate-200'
                                            }`}
                                            onClick={() => setActiveTab(tabIndex)}>
                                            <p>{tab.tabsTitle}</p>
                                        </div>
                                    ))
                                )}

                            </div>
                            <div className='rounded-b-md rounded-r-md h-5/6 max-h-[500px] p-5 overflow-y-auto flex flex-col gap-5 shadow-lg bg-white'>
                                <div className='flex flex-col gap-y-4'>
                                    {questionaire?.length > 0 && questionaire.map((questionItem: QuestionaireWithAnswerProps) =>
                                        questionItem?.tabs?.length > 0 && questionItem.tabs.map((tab, tabIndex) => (
                                            <div key={tab.tabsId} style={{ display: activeTab === tabIndex ? 'block' : 'none' }}>
                                                {tab.contentUI === "Table" ?
                                                    <p>TABLE DISPLAY</p>
                                                    :
                                                    <div className='flex w-full gap-2'>
                                                        <p className='font-semibold min-w-[50px]'>{tab.tabsId} :</p>
                                                        <div className='leading-6 text-sm'>{tab.content}</div>
                                                    </div>
                                                }
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <div className="h-full w-full p-4 font-sans tracking-tight">
                        {questionaire?.length > 0 && questionaire.map((questionItem: QuestionaireWithAnswerProps, questionIndex: number) =>
                            <div key={questionIndex} >
                                <ol className='w-full text-sm mb-4 pr-5 '>
                                    <li>{questionItem.answer && questionItem.answer.map((answerItem, answerIndex: number) => (
                                        <div className='w-full text-sm mb-4 pr-5'>
                                            <p className="flex" key={answerIndex}>
                                                <NearMeIcon className="h-6 rotate-45 text-[#86BCEA] mr-2 pb-1" />
                                                <div
                                                    dangerouslySetInnerHTML={{
                                                        __html: answerItem.answerInstruction,
                                                    }}
                                                />
                                            </p>
                                        </div>
                                    ))}</li>
                                </ol>
                                <div className='w-full h-fit shadow-lg p-10 flex flex-col gap-5 rounded-md bg-white'>
                                    {questionItem.answer && questionItem.answer.map((choiceMap: AnswerProps) =>
                                        choiceMap.rows && choiceMap.rows.map((answerItem: any, answerIndex: number) => (
                                            <div className='flex items-center my-2' key={answerIndex}>
                                                <span>{answerIndex + 1} . </span>
                                                <span><Checkbox value={answerItem.value} checked={checkedValues.includes(answerItem.value)} onChange={() => handleCheckBoxValues(answerItem.value)} sx={{ height: "20px" }} /></span>
                                                <p>{answerItem.label}</p>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

