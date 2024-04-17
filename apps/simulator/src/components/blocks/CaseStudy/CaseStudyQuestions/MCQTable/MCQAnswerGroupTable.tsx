import { Checkbox, Grid, Paper, Radio, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import NearMeIcon from '@mui/icons-material/NearMe';
import React, { useState } from 'react'
import { Row, MCQTable, AnswerProps, SsrData, QuestionaireProps } from '@/core/types/ssrData';

export const MCQAnswerGroupTable: React.FC<MCQTable> = ({ table }) => {

    const initialSelectedValues = table.map((rowItem: any) =>
        rowItem.answer.map((item: AnswerProps) =>
            item.rows.map(() => Array(3).fill(0))
        )
    );
    const flattenedInitialValues: number[][] = initialSelectedValues.flat(2);

    const [selectedValues, setSelectedValues] = useState<number[][]>(flattenedInitialValues);
    console.log("table : ", table)
    console.log("selectedValues : ", selectedValues)

    const handleCheckboxChange = (rowIndex: number, optionIndex: number) => {
        setSelectedValues(prevState => {
            const newSelectedValues = [...prevState];
            newSelectedValues[rowIndex][optionIndex] = newSelectedValues[rowIndex][optionIndex] === 1 ? 0 : 1;
            return newSelectedValues;
        });
    };
    const renderCheckboxes = (row: Row, rowIndex: number) => {
        const chKeys = Object.keys(row).filter(key => key.startsWith('ch'));
        return (
            <>
                {chKeys.slice(0, 3).map((chKey, chIndex) => (
                    <TableCell key={chIndex} align="center" className='border border-[#D4D7DA]'>
                        <Checkbox
                            checked={(selectedValues[rowIndex] && selectedValues[rowIndex][chIndex]) === 1}
                            onChange={() => handleCheckboxChange(rowIndex, chIndex)}
                        />
                    </TableCell>
                ))}
            </>
        );
    };

    const handleRadioChange = (rowIndex: number, optionIndex: number) => {
        const newSelectedValues = selectedValues.map((row, index) =>
            index === rowIndex ? row.map((value, i) => (i === optionIndex ? 1 : 0)) : row
        );
        setSelectedValues(newSelectedValues);
    };

    const renderRadioButtons = (row: Row, rowIndex: number) => {

        const chKeys = Object.keys(row).filter(key => key.startsWith('ch'));
        return (
            <>
                {chKeys.slice(0, 3).map((chKey, chIndex) => (
                    <TableCell key={chIndex} align="center" className='border border-[#D4D7DA]'>
                        <Radio
                            checked={selectedValues[rowIndex][chIndex] === 1}
                            onChange={() => handleRadioChange(rowIndex, chIndex)} />
                    </TableCell>
                ))}
            </>
        );
    };

    return (
        <Grid>
            <div className='h-full w-full font-sans'>
                {table.length > 0 &&
                    table.map((answerItem: SsrData, answerIndex: number) => (
                        <div key={answerIndex} className='w-full'>
                            <div className='w-full text-sm mb-4 pr-5'>
                                <div className='w-full text-sm mb-4 pr-5'>
                                    <p className="flex" key={answerIndex}>
                                        <NearMeIcon className="h-6 rotate-45 text-[#86BCEA] mr-2 pb-1" />
                                        {answerItem.answer ? answerItem.answer.length > 0 && answerItem.answer.map((answerItem: AnswerProps) => (
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html: answerItem.answerInstruction,
                                                }}
                                            />
                                        )) : null}
                                    </p>
                                </div>
                            </div>
                            <div className="w-full">
                                <Paper elevation={3}>
                                    <TableContainer>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    {answerItem.answer ? answerItem.answer.length > 0 && answerItem.answer.map((answerContainer: AnswerProps) =>
                                                        answerContainer.columns && answerContainer.columns.map((columnName: any, index: number) =>
                                                            <TableCell key={index} align="center" className='text-sm bg-[#E6F2FF] font-semibold border border-[#D4D7DA]' sx={{ width: '80px' }}>{columnName}</TableCell>
                                                        )
                                                    ) : null}
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {answerItem.answer ? answerItem.answer.length > 0 && answerItem.answer.map((answerContainer: AnswerProps) =>
                                                    answerContainer.rows.length > 0 && answerContainer.rows.map((row: Row, index: number) =>
                                                        <TableRow key={index}>
                                                            <TableCell align="left" className='border border-[#D4D7DA] px-4 py-2 w-40'>{row.rowTitle}</TableCell>
                                                            {table.length > 0 && table.map((tableItem: QuestionaireProps) => (
                                                                tableItem.QType === "MCQNoGroup" ?
                                                                    renderRadioButtons(row, index) :
                                                                    renderCheckboxes(row, index)
                                                            ))}
                                                        </TableRow>

                                                    )) : null}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Paper>
                                <div className='w-full text-sm mb-4 pr-5 pt-4 flex gap-1'>
                                    <p>Note:</p>
                                    <p>{answerItem.answer ? answerItem.answer.length > 0 && answerItem.answer.map((answerItem: AnswerProps) => (
                                        answerItem.note
                                    )) : null}</p>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </Grid>
    )
}

