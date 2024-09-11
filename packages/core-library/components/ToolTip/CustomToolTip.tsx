import React from 'react';
import { Tooltip, TooltipProps} from '@mui/material';

interface CustomTooltipProps extends TooltipProps {
  title: string;
}

export const CustomTooltip: React.FC<React.PropsWithChildren<CustomTooltipProps>> = ({  title, children,...props}) => {
  return (
    <Tooltip title={title}{...props}>
      {children}
    </Tooltip>
  );
};

