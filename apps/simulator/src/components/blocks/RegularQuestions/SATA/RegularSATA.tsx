

import { Checkbox, Grid } from '@mui/material'
import NearMeIcon from '@mui/icons-material/NearMe';
import React, { useState } from 'react'
import { AnswerProps, SsrData } from '@/core/types/ssrData';

export const RegularSATA: React.FC<SsrData> = ({ questionaire }) => {
    //This is an array of values of each item
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
        <div className=' h-full'>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={12} sm={6} md={6}>
                    <div className="h-full w-full p-4 font-sans tracking-tight">
                        {questionaire?.length > 0 && questionaire.map((questionItem, questionIndex: number) =>
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
                                <div className='w-full h-fit shadow-lg px-10 py-5 text-sm flex flex-col gap-5 rounded-md bg-white'>
                                    {questionItem.answer && questionItem.answer.map((choiceMap: AnswerProps) =>
                                        choiceMap.rows && choiceMap.rows.map((answerItem: any, answerIndex: number) => (
                                            <div className='flex items-center ' key={answerIndex}>
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

