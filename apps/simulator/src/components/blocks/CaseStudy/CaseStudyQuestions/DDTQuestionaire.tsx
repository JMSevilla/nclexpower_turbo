import { SsrData, QuestionaireProps, AnswerProps } from "@/core/types/ssrData";
import React, { useState } from 'react';
import NearMeIcon from '@mui/icons-material/NearMe';
import {
    Paper,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    MenuItem,
    TextField
 } from '@mui/material';

 interface SelectedValuesType {
    [key: string]: string; 
}

export const DDTQuestion: React.FC<SsrData> = ({ questionaire, answer }) => {
    const [selectedValues, setSelectedValues] = useState<SelectedValuesType>({});
    const handleSelectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValues({
            ...selectedValues,
            [event.target.name]: event.target.value
        });
    };

    
  return (
        <div className="p-2 py-2 min-h-[100dvh]">
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={12} sm={6} md={6}>
                        <div className='h-full w-full p-4'>
                            {questionaire &&
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
                    <Grid item xs={12} sm={6} md={6}>
                        <div className='h-full w-full p-5'>
                        {answer &&
                            answer.map((answerItem: AnswerProps) => (
                                <>
                                    <div key={answerItem.answerId} className='w-full text-sm mb-4 pr-5 pt-4'>
                                        <p className="flex"><NearMeIcon className='h-6 rotate-45 text-[#86BCEA] mr-2 pb-1'/><div dangerouslySetInnerHTML={{ __html: answerItem.answerInstruction }} /></p>
                                    </div>
                                    <Paper elevation={3} className='p-5 overflow-auto flex flex-col gap-5'>
                                    <TableContainer>
                                        <Table>
                                            <TableHead>
                                            <TableRow>
                                                {answerItem.columns.map(
                                                (columnName: string, index) => (
                                                    <TableCell
                                                    key={index}
                                                    align="center"
                                                    className="text-sm bg-[#E6F2FF] font-semibold border border-[#D4D7DA]"
                                                    sx={{ width: "80px" }}
                                                    >
                                                    {columnName}
                                                    </TableCell>
                                                )
                                                )}
                                            </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {answerItem.selectFieldKey.map((selectFieldKey: any, index: number) => (
                                                    <TableRow key={index}>
                                                        <TableCell
                                                            align="center"
                                                            className="border border-[#D4D7DA] w-28"
                                                        >
                                                            {selectFieldKey}
                                                        </TableCell>
                                                        <TableCell
                                                            align="center"
                                                            className="border border-[#D4D7DA]"
                                                            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                                                        >
                                                            <TextField
                                                                fullWidth
                                                                select
                                                                label="select"
                                                                variant='outlined'
                                                                size="small"
                                                                style={{ minWidth: '150px', height: '40px', padding: '4px', textAlign: "start" }}
                                                                name={selectFieldKey}
                                                                value={selectedValues[selectFieldKey] || ''}
                                                                onChange={handleSelectChange} 
                                                            >
                                                                {answerItem.selectField[selectFieldKey].map((option: any, index: number) => (
                                                                    <MenuItem key={index} value={option.value}>{option.label}</MenuItem>
                                                                ))}
                                                            </TextField>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>                  
                                    </Paper>
                                    <div className='w-full text-sm mb-4 pr-5 pt-4 flex gap-1'> 
                                        <p>{answerItem.note === ""? "" : "Note:"}</p>
                                        <p>{answerItem.note}</p>
                                    </div>                      
                                </>
                            ))}
                        </div>
                    </Grid>
            </Grid>
        </div>
  );  
};