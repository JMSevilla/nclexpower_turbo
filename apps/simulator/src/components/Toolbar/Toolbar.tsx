import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import { Button } from '@mui/material';
import { buttonStyle } from '../Header/Header';
import SettingsIcon from '@mui/icons-material/Settings';
import { CustomTooltip } from 'core-library/components';
import { ToolTipData } from '@/core/constant/toolTipData';

export const ToolbarSettings: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  return (
    <div>
      <CustomTooltip title="Settings">
        <Button sx={buttonStyle} aria-describedby={id} type="button" onClick={handleClick}>
          <SettingsIcon fontSize="large" sx={buttonStyle.IconStyle} />
        </Button>
      </CustomTooltip>
      <Popper id={id} open={open} anchorEl={anchorEl}>
        <Box sx={{ border: 1, p: 1, bgcolor: '#007AB7' }}>
          <ToolTipData/>
        </Box>
      </Popper>
    </div>
  );
};
