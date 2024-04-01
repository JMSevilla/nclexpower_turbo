
import { CaseStudyMCQ } from '@/core/types/ssrData'
import NearMeIcon from '@mui/icons-material/NearMe';
import { Checkbox } from '@mui/material'
import React, { useState } from 'react'


export const SATAQuestion: React.FC<CaseStudyMCQ> = ({ questionaire }) => {
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

                                <div className='flex flex-col gap-y-4 '>
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
                    <div className='h-full w-1/2 px-10 py-5 '>
                        <ol className='w-full text-sm mb-4 pr-5 '>
                            <li>{questionItem.answer && questionItem.answer.map((answerItem: any, instructionIndex: number) => (
                                <p key={instructionIndex}><NearMeIcon className='h-6 rotate-45 text-[#86BCEA] mr-2 pb-1' />{answerItem.answerInstruction}</p>
                            ))}</li>
                        </ol>
                        <div className='w-full h-fit shadow-lg p-10 flex flex-col gap-5 rounded-md bg-white'>
                            <form>
                                {questionItem.answer && questionItem.answer.map((choiceMap: any) =>
                                    choiceMap.rows && choiceMap.rows.map((answerItem: any, answerIndex: number) => (
                                        <div className='flex items-center my-2' key={answerIndex}>
                                            <span>{answerIndex + 1} . </span>
                                            <span><Checkbox value={answerItem.value} checked={checkedValues.includes(answerItem.value)} onChange={() => handleCheckBoxValues(answerItem.value)} sx={{ height: "20px" }} /></span>
                                            <p>{answerItem.label}</p>
                                        </div>
                                    ))
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            )}

        </>
    )
}


