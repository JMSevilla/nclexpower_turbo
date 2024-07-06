import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button as MuiButton } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SettingsIcon from '@mui/icons-material/Settings';
import PauseIcon from '@mui/icons-material/Pause';
import { useCustomAction } from 'core-library/hooks';
import { Button } from 'core-library/components';
import { useProgress } from '../../core/context/ProgressContext';

interface Props {
  actionKey: string;
}

export const Footer: React.FC<Props> = ({ actionKey }) => {
  const { isLoading } = useProgress();
  const action = useCustomAction({
    actionKey: actionKey,
  });

  return (
    <div className="h-fit w-full bg-[#007ab7] text-white footer-step-9">
      <Toolbar disableGutters>
        <Box sx={{ height: '100%', width: '100%' }}>
          <MuiButton
            disabled
            color="inherit"
            sx={{
              width: '32%',
              padding: '1rem',
              borderRight: '2px solid #F8FAF8',
              fontFamily: 'Arial, sans-serif',
              gap: 1,
              display: 'none',
            }}
          >
            <PauseIcon style={{ fontSize: '20px' }} />
            Suspend
          </MuiButton>
        </Box>
        <Box
          sx={{
            height: '100%',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <div className="footer-step-10">
            <Typography variant="h6" component="div" sx={{ textAlign: 'center', fontSize: '16px' }}>
              Acme Medical Prep School
            </Typography>
            <Typography variant="h6" component="p" sx={{ textAlign: 'center', fontSize: '14px' }}>
              Patricia Freeman
            </Typography>
          </div>
        </Box>
        <Box
          sx={{
            height: '100%',
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <MuiButton
            color="inherit"
            className="footer-step-11"
            sx={{
              width: '32%',
              padding: '1rem',
              borderLeft: '2px solid #F8FAF8',
              fontFamily: 'Arial, sans-serif',
              color: '#FFFFFF',
              gap: 1,
            }}
          >
            <SettingsIcon style={{ fontSize: '18px' }} />
            Navigator
          </MuiButton>
          <div className="footer-step-12">
            <Button
              sx={{
                width: '32%',
                padding: '1rem',
                borderLeft: '2px solid #F8FAF8',
                fontFamily: 'Arial, sans-serif',
                color: '#FFFFFF',
                gap: 1,
              }}
              disabled={isLoading}
              onClick={action?.execute}
            >
              Next <ArrowForwardIcon style={{ fontSize: '20px', marginTop: '2px' }} />
            </Button>
          </div>
        </Box>
      </Toolbar>
    </div>
  );
};
