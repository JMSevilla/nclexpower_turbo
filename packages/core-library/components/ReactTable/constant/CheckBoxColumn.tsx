import { Checkbox } from '@mui/material';
import { ColumnDef } from '@tanstack/react-table';

export const CheckBoxColumn = <T,>(): ColumnDef<T>[] => [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                {
                ...{
                    checked: table.getIsAllRowsSelected(),
                    indeterminate: table.getIsSomeRowsSelected(),
                    onChange: table.getToggleAllRowsSelectedHandler(),
                }
                }
            />
        ),
        cell: ({ row }) => (
            <div className="px-1" >
                <Checkbox
                    {...{
                        disabled: !row.getCanSelect(),
                        indeterminate: row.getIsSomeSelected(),
                        onChange: row.getToggleSelectedHandler(),
                    }}
                />
            </div>
        )
    },
]