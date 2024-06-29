import { DataGrid } from '@repo/core-library/components';
import { MockdataExam, ColumnIRTExam } from '@/core/constant/IRTsMockData';
import { Typography, Card, CardContent } from '@mui/material';

type Props = {
  title?: string;
};

export const TableIRTExamLogs: React.FC<Props> = ({ title }) => {
  return (
    <Card elevation={5} sx={{ my: 2 }}>
      <CardContent>
        <Typography fontStyle={'italic'} sx={{ fontWeight: 'bold', pb: 2 }}>
          {title}
        </Typography>
        <DataGrid rows={MockdataExam} columns={ColumnIRTExam} isLoading={false} initPageSize={10} />
      </CardContent>
    </Card>
  );
};
