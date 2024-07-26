import { TableRow, TableCell } from '@mui/material';
import { ThetaCalcScratchResponse } from 'core-library/api/types';

interface IrtThetaCalcScratchProps {
  data: ThetaCalcScratchResponse[];
  accountId?: string;
  isloading?: boolean;
}

export const IrtThetaCalcScratch: React.FC<IrtThetaCalcScratchProps> = ({ data, accountId, isloading }) => {
  return (
    <>
      {data.map((row, index) => (
        <TableRow key={index}>
          <TableCell>{row.seqNum}</TableCell>
          <TableCell>{row.qlNum}</TableCell>
          <TableCell>{row.aDisc}</TableCell>
          <TableCell>{row.bDiff}</TableCell>
          <TableCell>{row.cGuess}</TableCell>
          <TableCell>{row.response}</TableCell>
          <TableCell>{row.inclusion}</TableCell>
          <TableCell>{row.eventLNum}</TableCell>
        </TableRow>
      ))}
    </>
  );
};
