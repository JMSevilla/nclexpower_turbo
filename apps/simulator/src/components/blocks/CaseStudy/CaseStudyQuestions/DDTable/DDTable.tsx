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
    MenuItem,
    TextField
} from '@mui/material';

export const DDTable: React.FC<TableProps> = ({
    columns,
    selectFieldKeys,
    selectFieldOptions,
    selectedValues,
    handleSelectChange
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
                                    <TextField
                                        fullWidth
                                        select
                                        label="Select"
                                        variant='outlined'
                                        size="small"
                                        style={{ minWidth: '150px', height: '40px', padding: '4px', textAlign: "start" }}
                                        name={selectFieldKey}
                                        value={selectedValues[selectFieldKey] || ''}
                                        onChange={handleSelectChange}
                                    >
                                        {selectFieldOptions[selectFieldKey].map((option, index) => (
                                            <MenuItem key={index} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};
