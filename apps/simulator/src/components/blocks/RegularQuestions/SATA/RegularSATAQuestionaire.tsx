
import { Checkbox, Grid } from '@mui/material'
import React, { useState } from 'react'
import { RegularSATA } from '@/core/types/ssrData';
import { datatypes } from '@repo/utils';

export const RegularSATAQuestionaire: React.FC<RegularSATA> = ({ contents, itemselection }) => {

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
                        {itemselection?.length > 0 && itemselection.map((item: datatypes.CalcItemSelectValues, itemIndex) =>
                            <div key={itemIndex} >
                                <ol className='w-full text-sm mb-4 pr-5 '>
                                    <li>
                                        <div className='w-full text-sm mb-4 pr-5'>
                                            <p className="flex" key={itemIndex}>
                                                {item.question}
                                            </p>
                                        </div>
                                    </li>
                                </ol>
                                <div className='w-full h-fit shadow-lg px-10 py-5 text-sm flex flex-col gap-5 rounded-md bg-white'>
                                    {contents.choices?.length > 0 && contents.choices.map((choiceMap, choiceIdx) => {
                                        const parsedChoices: datatypes.ParsedChoices[] = JSON.parse(choiceMap.choices);
                                        return (
                                            <React.Fragment key={choiceIdx}>
                                                {parsedChoices?.length > 0 && parsedChoices.map((parseChoices, parseChoicesIdx) => (
                                                    <div className='flex items-center ' key={parseChoicesIdx}>
                                                        <span>
                                                            <Checkbox value={parseChoices.Value} checked={checkedValues.includes(parseChoices.Value)} onChange={() => handleCheckBoxValues(parseChoices.Value)} sx={{ height: "20px" }} />
                                                        </span>
                                                        <p>{parseChoices.Label}</p>
                                                    </div>
                                                ))}
                                            </React.Fragment>
                                        )
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}