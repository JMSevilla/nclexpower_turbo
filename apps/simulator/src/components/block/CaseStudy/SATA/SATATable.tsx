import React from 'react'

interface TableData {
    headers: [],
    data: [],
    value: string


}

interface Props {
    table?: TableData[]
}

export const SATATable: React.FC<Props> = ({ table }) => {
    return (
        <div className='w-full flex flex-col gap-5 text-sm leading-4'>
            {table && table.map((tableItem, tableIndex) => (
                <table key={tableIndex} className="w-full">
                    <thead className=' bg-[#e6f2ff]'>
                        <tr>
                            {tableItem.headers.map(header => (
                                <th className='border bg-gray-200 text-left px-10' key={header}>{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className=''>
                        {tableItem.data.map((row, index) => (
                            <tr key={index} className=''>
                                {Object.values(row).map((value, index) => (
                                    <td className='border px-4 py-2' key={index} data-label={tableItem.headers[index]}>{value}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            ))}

        </div>
    )
}

export default SATATable
