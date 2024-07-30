import React from "react";
import { useColumns } from "../../../../../hooks";
import { DataGrid } from "../../../../DataGrid/DataGrid";
import { ExcelRowRegularQuestion } from "../../../../../core";

interface Props {
  csvData: ExcelRowRegularQuestion[];
}

export const AutomationDBComparisonForm: React.FC<Props> = ({ csvData }) => {
  const { columns } = useColumns({
    columns: [
      {
        field: "QID",
        headerName: "QID",
        sortable: true,
        width: 100,
      },
      {
        field: "qLNum",
        headerName: "Question LNum",
        sortable: true,
        width: 150,
      },
      {
        field: "question",
        headerName: "Question",
        sortable: true,
        width: 300,
      },
      {
        field: "choice_1",
        headerName: "Choice 1",
        sortable: true,
        width: 150,
      },
      {
        field: "choice_2",
        headerName: "Choice 2",
        sortable: true,
        width: 150,
      },
      {
        field: "choice_3",
        headerName: "Choice 3",
        sortable: true,
        width: 150,
      },
      {
        field: "choice_4",
        headerName: "Choice 4",
        sortable: true,
        width: 150,
      },
      {
        field: "choice_5",
        headerName: "Choice 5",
        sortable: true,
        width: 150,
      },
      {
        field: "choice_6",
        headerName: "Choice 6",
        sortable: true,
        width: 150,
      },
      {
        field: "correct",
        headerName: "Correct Answer",
        sortable: true,
        width: 150,
      },
      {
        field: "rationale",
        headerName: "Rationale",
        sortable: true,
        width: 300,
      },
      {
        field: "cogLNum",
        headerName: "Cognitive LNum",
        sortable: true,
        width: 150,
      },
      {
        field: "CNCateg",
        headerName: "CN Category",
        sortable: true,
        width: 150,
      },
      {
        field: "integPLNum",
        headerName: "Integration PLNum",
        sortable: true,
        width: 150,
      },
      {
        field: "contentLNum",
        headerName: "Content LNum",
        sortable: true,
        width: 150,
      },
    ],
  });

  const dataWithId = csvData.map((row) => ({
    ...row,
    id: row.QID,
  }));
  return (
    <DataGrid
      columns={columns}
      rows={dataWithId}
      initPageSize={10}
      isLoading={false}
    />
  );
};
