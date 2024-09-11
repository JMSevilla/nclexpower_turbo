import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import { Button } from '@mui/material';
import { buttonStyle } from '../Header/Header';
import SettingsIcon from '@mui/icons-material/Settings';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { useToolbarSettings } from '../../core/context/ToolbarSettingsContext';
import { CustomTooltip } from 'core-library/components';

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

  const toolTipData = [
    {icon: <ZoomOutIcon fontSize="medium" onClick={handleZoomOutText}/>, title: "Zoom Out"},
    {icon: <RestartAltIcon fontSize="medium" onClick={handleResetTextZoom}/>, title: "Reset"},
    {icon: <ZoomInIcon fontSize="medium" onClick={handleZoomInText}/>, title: "Zoom In"}
  ]

  return (
    <div>
      <CustomTooltip title="Settings">
        <Button sx={buttonStyle} aria-describedby={id} type="button" onClick={handleClick}>
          <SettingsIcon fontSize="large" sx={buttonStyle.IconStyle} />
        </Button>
      </CustomTooltip>
      <Popper id={id} open={open} anchorEl={anchorEl}>
        <Box sx={{ border: 1, p: 1, bgcolor: '#007AB7' }}>
          <div className="flex items-center justify-center">
            {toolTipData.map((item,index)=>(
              <CustomTooltip title={item.title}>
                <Button sx={iconStyle}>
                  {item.icon} 
                </Button>
            </CustomTooltip>
            ))}
            
          </div>
        </Box>
      </Popper>
    </div>
  );
};
