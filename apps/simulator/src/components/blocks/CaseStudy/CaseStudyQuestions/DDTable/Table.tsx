import React from 'react';
import { TableProps } from '@/core/types/ssrData';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';

export const TableComponent: React.FC<TableProps> = ({
    columns,
    selectFieldKeys,
    selectFieldOptions,
    selectFieldComponent
}) => {
    return (
        <Paper elevation={3} className='p-5 overflow-auto flex flex-col gap-5'>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            {columns.map((columnName, index) => (
                                <TableCell
                                    key={index}
                                    align="center"
                                    className="text-sm bg-[#E6F2FF] font-semibold border border-[#D4D7DA]"
                                    sx={{ width: "80px" }}
                                >
                                    {columnName}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {selectFieldKeys.map((selectFieldKey, index) => (
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
                                    {selectFieldComponent(selectFieldKey, selectFieldOptions)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};
