import { DataGridProps, GridColDef, DataGrid as MUIDataGrid } from "@mui/x-data-grid";

interface RowType {
    [key: string]: any;
}
type TypeColumn = GridColDef<RowType>;

interface Props extends DataGridProps {
    rows: RowType[];
    columns: TypeColumn[];
    isLoading: boolean;
    initPageSize: number;
}

export const DataGrid: React.FC<Props> = ({
    rows,
    columns,
    isLoading,
    initPageSize,
    ...rest
}) => {
    return (
        <MUIDataGrid
            {...rest}
            rows={rows}
            columns={columns}
            pageSizeOptions={[10, 20, 35]}
            autoHeight
            rowHeight={100}
            disableColumnMenu
            loading={isLoading}
            rowSelection={false}
            checkboxSelection={true}
            initialState={{
                pagination: {
                    paginationModel: {
                        pageSize: initPageSize,
                    },
                },
            }}
        />
    );
};
