import { Checkbox, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import NearMeIcon from '@mui/icons-material/NearMe';
import React, { useState } from 'react'
import { Row, MCQTable } from '@/core/types/ssrData';




export const MCQAnswerGroupTable: React.FC<MCQTable> = ({ table }) => {

    const initialSelectedValues = table?.[0].rows.map(() => Array(3).fill(0)); // Assuming there are 3 checkboxes in each row
    const [selectedValues, setSelectedValues] = useState<number[][]>(initialSelectedValues);

    const handleCheckboxChange = (rowIndex: number, optionIndex: number) => {
        setSelectedValues(prevState => {
            const newSelectedValues = [...prevState];
            newSelectedValues[rowIndex][optionIndex] = newSelectedValues[rowIndex][optionIndex] === 1 ? 0 : 1; // Toggle between 0 and 1
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
                            checked={selectedValues[rowIndex][chIndex] === 1}
                            onChange={() => handleCheckboxChange(rowIndex, chIndex)}
                        />
                    </TableCell>
                ))}
            </>
        );
    };

    return (
        <Grid item xs={12} sm={6} md={6}>
            <div className='h-full w-full font-sans'>
                <form>
                    {table &&
                        table.map((answerItem: any) => (
                            <div key={answerItem.answerId} className='w-full'>
                                <div className='w-full text-sm mb-4 pr-5'>
                                    <p><NearMeIcon className='h-6 rotate-45 text-[#86BCEA] mr-2 pb-1' />{answerItem.answerInstruction}</p>
                                </div>
                                <div className="w-full">
                                    <Paper elevation={3}>
                                        <TableContainer>
                                            <Table>
                                                <TableHead>
                                                    <TableRow>
                                                        {answerItem.columns.map((columnName: any, index: number) => (
                                                            <TableCell key={index} align="center" className='text-sm bg-[#E6F2FF] font-semibold border border-[#D4D7DA]' sx={{ width: '80px' }}>{columnName}</TableCell>
                                                        ))}
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {answerItem.rows.map((row: Row, index: number) => (
                                                        <TableRow key={index}>
                                                            <TableCell align="left" className='border border-[#D4D7DA] px-4 py-2 w-40'>{row.rowTitle}</TableCell>
                                                            {renderCheckboxes(row, index)}
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Paper>
                                    <div className='w-full text-sm mb-4 pr-5 pt-4 flex gap-1'>
                                        <p>Note:</p>
                                        <p>{answerItem.note}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                </form>
            </div>
        </Grid>
    )
}

