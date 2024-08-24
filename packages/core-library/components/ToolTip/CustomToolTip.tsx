
import React from 'react';
import { Tooltip} from '@mui/material';
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';

interface CustomTooltipProps  {
  title: string;
}

export const CustomTooltip: React.FC<CustomTooltipProps> = ({  title }) => {
  return (
    <Tooltip title={title} >
        <InfoTwoToneIcon style={{ marginRight: 4 }} />
    </Tooltip>
  );
};

