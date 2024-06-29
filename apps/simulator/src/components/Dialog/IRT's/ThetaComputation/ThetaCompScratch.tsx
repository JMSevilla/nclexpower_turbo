import { DataGrid } from '@repo/core-library/components';
import { Typography, Card, CardContent } from '@mui/material';
import { MockdataThetaComp, ColumntheTaCompScratch } from '@/core/constant/IRTsMockData';

type Props = {
  title?: string;
};

export const ThetaCompScratch: React.FC<Props> = ({ title }) => {
  return (
    <Card elevation={5} sx={{ my: 2 }}>
      <CardContent>
        <Typography fontStyle={'italic'} sx={{ fontWeight: 'bold', pb: 2 }}>
          {title}
        </Typography>
        <DataGrid rows={MockdataThetaComp} columns={ColumntheTaCompScratch} isLoading={false} initPageSize={10} />
      </CardContent>
    </Card>
  );
};
