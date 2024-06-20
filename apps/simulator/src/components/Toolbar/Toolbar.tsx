import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import { Button } from '@mui/material';
import { buttonStyle } from '../Header/Header';
import { useToolbarSettings } from '@repo/core-library/contexts/ToolbarSettingsContext';
import SettingsIcon from '@mui/icons-material/Settings';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

export const ToolbarSettings: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { handleZoomInText, handleZoomOutText, handleResetTextZoom } = useToolbarSettings();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  const iconStyle = {
    border: '1px solid #f3f3f3',
    margin: 1,
    backgroundColor: '#007AB7',
    color: '#030303',
    '&:hover': {
      color: '#f3f3f3',
    },
  };

  return (
    <div>
      <Button sx={buttonStyle} style={{ fontFamily: 'Arial, sans-serif' }} aria-describedby={id} type="button" onClick={handleClick}>
        <SettingsIcon fontSize="large" sx={buttonStyle.IconStyle} />
      </Button>
      <Popper id={id} open={open} anchorEl={anchorEl}>
        <Box sx={{ border: 1, p: 1, bgcolor: '#007AB7' }}>
          <div className="flex items-center justify-center">
            <Button sx={iconStyle} style={{ fontFamily: 'Arial, sans-serif' }} onClick={handleZoomOutText}>
              <ZoomOutIcon fontSize="medium" />
            </Button>
            <Button sx={iconStyle} style={{ fontFamily: 'Arial, sans-serif' }} onClick={handleResetTextZoom}>
              <RestartAltIcon fontSize="medium" />
            </Button>
            <Button sx={iconStyle} style={{ fontFamily: 'Arial, sans-serif' }} onClick={handleZoomInText}>
              <ZoomInIcon fontSize="medium" />
            </Button>
          </div>
        </Box>
      </Popper>
    </div>
  );
};
