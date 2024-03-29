import { Radio } from '@mui/material'
import React from 'react'

interface TableData {
    columns: [],
    data: [],
    value: string


}

interface Props {
    table?: TableData[]
}

export const MCQAnswerTable: React.FC<Props> = ({ table }) => {
    console.log("TABLE : ", table)
    return (
        <div className='w-full flex flex-col gap-5 text-sm leading-4'>
            {table && table.map((tableItem, tableIndex) => (
                <table key={tableIndex} className="w-full">
                    <thead className='bg-[#e6f2ff]'>
                        <tr>
                            {tableItem.columns.map((header, columnIndex) => (
                                <th className='border bg-gray-200 text-left px-5' key={columnIndex}>{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody >
                        {tableItem.rows.map((row, rowIndex) => (
                            <tr className='odd:bg-slate-200' key={rowIndex}>
                                <td className='border px-4 py-2 ' key={'ColOne'}>{row.ColOne}</td>
                                <td className='border w-fit py-2 text-center  ' key={'ColTwo'}> <Radio value={row.ColTwo} /></td>
                                <td className='border w-fit py-2 text-center' key={'ColThree'}><Radio value={row.ColThree} /></td>
                                <td className='border w-fit py-2 text-center' key={'ColFour'}><Radio value={row.ColFour} /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ))}


        </div>
    )
}

export default MCQAnswerTable
