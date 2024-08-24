import React from 'react';
import { Badge, BadgeProps } from '@mui/material';

export const CustomBadge: React.FC<React.PropsWithChildren<BadgeProps>> = ({ children, ...rest }) => {
    return (
      <Badge {...rest}>
        {children}
      </Badge>
    );
  };
