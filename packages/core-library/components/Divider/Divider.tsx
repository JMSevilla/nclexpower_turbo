import React from "react";
import {Divider as MUIDivider, DividerProps as MUIDividerProps} from '@mui/material'

type DividerProps = MUIDividerProps & {
    thickness?: number;
    color?: string;
}

const Divider: React.FC<DividerProps> = ({ 
    thickness, 
    color, 
    ...rest 
}) => {
    return (
      <MUIDivider
        sx={{
          borderBottomWidth: thickness,
          borderColor: color,
        }}
        {...rest}
      />
    );
  };
  
  export default Divider;