export interface IRTExamtype {
  id: number;
  EventLNum: number;
  LineNum: number;
  ItemID: number;
  Response: number;
  LineTheta: string;
  LineSEM: string;
  ADisc: string;
  BDiff: string;
  CNCateg: number;
}

export interface ThetaCompType {
  id: number;
  seqNum: number;
  qlNum: number;
  ADisc: number;
  BDiff: number;
  CGuess: number;
  response: string;
  inclusion: string;
  EventLNum: number;
}

export interface ThetaZeroCumType {
  id: number;
  seqNum: number;
  lastSumNum: number;
  lastSumDenom: boolean;
  lastCumulativeTheta: number;
  accoundid: number;
}

export const MockdataExam: IRTExamtype[] = [
  {
    id: 0,
    EventLNum: 0,
    LineNum: 0,
    ItemID: 0,
    Response: 0,
    LineTheta: 'ExamSampleData',
    LineSEM: 'ExamSampleData',
    ADisc: 'ExamSampleData',
    BDiff: 'ExamSampleData',
    CNCateg: 0,
  },
];

export const MockdataThetaComp: ThetaCompType[] = [
  {
    id: 0,
    seqNum: 0,
    qlNum: 0,
    ADisc: 0,
    BDiff: 0,
    CGuess: 0,
    response: 'SampleThetaCompData',
    inclusion: 'SampleThetaCompData',
    EventLNum: 0,
  },
];

export const MockdataThetaZeroCum: ThetaZeroCumType[] = [
  {
    id: 0,
    seqNum: 0,
    lastSumNum: 0,
    lastSumDenom: true,
    lastCumulativeTheta: 0,
    accoundid: 0,
  },
];

export const ColumnIRTExam = [
  {
    field: 'id',
    headerName: 'ID',
    width: 0,
    sortable: true,
  },
  {
    field: 'EventLNum',
    headerName: 'EventLNum',
    width: 120,
    sortable: true,
  },
  {
    field: 'LineNum',
    headerName: 'LineNum',
    width: 120,
    sortable: true,
  },
  {
    field: 'ItemID',
    headerName: 'ItemID',
    width: 120,
    sortable: true,
  },
  {
    field: 'Response',
    headerName: 'Response',
    width: 120,
    sortable: true,
  },
  {
    field: 'LineTheta',
    headerName: 'LineTheta',
    width: 120,
    sortable: true,
  },
  {
    field: 'LineSEM',
    headerName: 'LineSEM',
    width: 120,
    sortable: true,
  },
  {
    field: 'ADisc',
    headerName: 'ADisc',
    width: 120,
    sortable: true,
  },
  {
    field: 'BDiff',
    headerName: 'BDiff',
    width: 120,
    sortable: true,
  },
  {
    field: 'CNCateg',
    headerName: 'CNCateg',
    width: 120,
    sortable: true,
  },
];

export const ColumntheTaCompScratch = [
  {
    field: 'id',
    headerName: 'ID',
    width: 0,
    sortable: true,
  },
  {
    field: 'seqNum',
    headerName: 'seqNum',
    width: 0,
    sortable: true,
  },
  {
    field: 'qlNum',
    headerName: 'qlNum',
    width: 120,
    sortable: true,
  },
  {
    field: 'ADisc',
    headerName: 'ADisc',
    width: 120,
    sortable: true,
  },
  {
    field: 'BDiff',
    headerName: 'BDiff',
    width: 120,
    sortable: true,
  },
  {
    field: 'CGuess',
    headerName: 'CGuess',
    width: 120,
    sortable: true,
  },
  {
    field: 'response',
    headerName: 'response',
    width: 120,
    sortable: true,
  },
  {
    field: 'inclusion',
    headerName: 'inclusion',
    width: 120,
    sortable: true,
  },
  {
    field: 'EventLNum',
    headerName: 'EventLNum',
    width: 120,
    sortable: true,
  },
];

export const ColumntheTaZeroCum = [
  {
    field: 'id',
    headerName: 'ID',
    width: 150,
    sortable: true,
  },
  {
    field: 'seqNum',
    headerName: 'seqNum',
    width: 150,
    sortable: true,
  },
  {
    field: 'lastSumNum',
    headerName: 'lastSumNum',
    width: 150,
    sortable: true,
  },
  {
    field: 'lastSumDenom',
    headerName: 'lastSumDenom',
    width: 150,
    sortable: true,
  },
  {
    field: 'lastCumulativeTheta',
    headerName: 'lastCumulativeTheta',
    width: 150,
    sortable: true,
  },
  {
    field: 'accoundid',
    headerName: 'accoundID',
    width: 150,
    sortable: true,
  },
];
