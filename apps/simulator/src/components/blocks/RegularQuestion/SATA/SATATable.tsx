import { Checkbox, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import NearMeIcon from '@mui/icons-material/NearMe';
import React from 'react'


interface Props {
    data: Array<{
        answerId: string
        answerInstruction: string
        columns: string[]
        rows: string[]
        note: string
    }>
}

export const SATATable: React.FC<Props> = ({ data }) => {

    return (
        <Grid item xs={12} sm={6} md={6}>
            <div className='h-full w-full font-sans'>
                <form>
                    {data &&
                        data.map((answerItem) => (
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
                                                        {answerItem.columns.map((columnName: string, index) => (
                                                            <TableCell key={index} align="center" className='text-sm bg-[#E6F2FF] font-semibold border border-[#D4D7DA]' sx={{ width: '80px' }}>{columnName}</TableCell>
                                                        ))}
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {answerItem.rows.map((row: any) => (
                                                        <TableRow key={row.id}>
                                                            <TableCell align="left" className='border border-[#D4D7DA] px-4 py-2 w-40'>{row.NRI}</TableCell>
                                                            <TableCell align="center" className=' border border-[#D4D7DA]'>
                                                                <Checkbox value={row.ID} />
                                                            </TableCell>
                                                            <TableCell align="center" className=' border border-[#D4D7DA]'>
                                                                <Checkbox value={row.NID} />
                                                            </TableCell>
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

export default SATATable
