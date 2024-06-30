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

export interface IrtTableProps {
  title: string;
  rows: any[];
  columns: any[];
}
