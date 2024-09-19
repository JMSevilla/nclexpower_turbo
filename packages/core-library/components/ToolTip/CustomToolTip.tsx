import React from 'react';
import { Tooltip, TooltipProps} from '@mui/material';

interface CustomTooltipProps extends TooltipProps {
  title: string;
}

export const CustomTooltip: React.FC<React.PropsWithChildren<CustomTooltipProps>> = ({  title, children}) => {
  return (
    <Tooltip title={title}>
      {children}
    </Tooltip>
  );
};

