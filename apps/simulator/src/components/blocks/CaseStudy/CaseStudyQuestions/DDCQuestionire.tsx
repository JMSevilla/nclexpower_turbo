import { Paper, Grid, TextField, MenuItem } from '@mui/material';
import React, { useState, useEffect } from 'react';
import NearMeIcon from '@mui/icons-material/NearMe';
import { SsrData, QuestionaireProps, AnswerProps, OptionType } from "@/core/types/ssrData";

interface SelectedValuesType {
    [key: string]: string; 
}

export const DDCQuestion: React.FC<SsrData> = ({ questionaire, answer }) => {

    const [selectedValues, setSelectedValues] = useState<SelectedValuesType>({});
    
    const handleSelectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValues({
            ...selectedValues,
            [event.target.name]: event.target.value
        });
    };

    const renderDropdown = (options: OptionType[], selectFieldKey: string) => {
        return (
            <TextField
                select
                label="select"
                variant='standard'
                size='small'
                name={selectFieldKey}
                value={selectedValues[selectFieldKey] || ''}
                onChange={handleSelectChange} 
                style={{ minWidth: '200px', height: '70px', color: "gray", margin: "-20px 10px 0 10px", textAlign: "center" }}
            >
                {options.map((option: any) => (
                    <MenuItem value={option.value}>{option.label}</MenuItem>
                ))}
            </TextField>
        );
    };

    return (
        <div className="p-2 py-2 min-h-[100dvh]">
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12} sm={6} md={6}>
                    <div className='h-full w-full p-4'>
                        {questionaire.length > 0 &&
                            questionaire.map((questionItem: QuestionaireProps) => (
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
                            ))}
                    </div>
                </Grid>

                {answer.length > 0 && answer.map((answerItem: AnswerProps) => (
                    <Grid item xs={12} sm={6} md={6} key={answerItem.answerId}>
                        <div className='h-full w-full p-5'>
                            <div className="w-full text-sm mb-4 pr-5 pt-4">
                                <p className="flex items-center">
                                    <NearMeIcon className="h-6 rotate-45 text-[#86BCEA] mr-2 pb-1" />
                                    <div dangerouslySetInnerHTML={{ __html: answerItem.answerInstruction }} />
                                </p>
                            </div>
                            <Paper elevation={3} className="p-5 overflow-auto flex flex-col gap-5">
                                <div className="w-full h-fit text-sm p-1">
                                    {answerItem.DDCAnswer.split(/\[\[selectFieldKey:(\w+)\]\]/g).map((part, index) => {
                                        if (index % 2 === 0) {
                                            return <span key={index} dangerouslySetInnerHTML={{ __html: part }} />;
                                        } else {
                                            const key = part.trim();
                                            const options = answerItem.selectField[key] || [];
                                            return (
                                                <React.Fragment key={index}>
                                                    {renderDropdown(options, key)}
                                                </React.Fragment>
                                            );
                                        }
                                    })}
                                </div>
                            </Paper>
                            <div className="w-full text-sm mb-4 pr-5 pt-4 flex gap-1">
                                <p>{answerItem.note === "" ? "" : "Note:"}</p>
                                <p>{answerItem.note}</p>
                            </div>
                        </div>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};
