/**
* Property of the NCLEX Power.
* Reuse as a whole or in part is prohibited without permission.
* Created by the Software Strategy & Development Division
*/
import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import { EvaIcon } from '../EvaIcon';

interface Props {
  id?: string;
  name: string;
  width?: number;
  height?: number;
  size?: 'small' | 'medium' | 'large';
  ariaLabel?: string;
  ariaHidden?: boolean;
  className?: string;
  onClick: () => void;
}
export const EvaIconButton: React.FC<Props> = ({ id, name, width, height, size, ariaLabel, ariaHidden, className, onClick }) => {
  return (
      <IconButton aria-label={ariaLabel} size={size} onClick={onClick}>
        <EvaIcon
          id={id}
          name={name}
          width={width}
          height={height}
          ariaHidden={ariaHidden}
          className={className}
        />
      </IconButton>
  );
}
