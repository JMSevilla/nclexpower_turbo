import * as React from 'react';
import Popover, { PopoverProps } from '@mui/material/Popover';
import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { Button } from '../Button/Button';

interface Props extends PopoverProps {
  icon?: React.ReactElement;
  sx?: SxProps<Theme>;
  label?: string;
}

export const CustomPopover: React.FC<React.PropsWithChildren<Props>> = ({ label, icon, sx, children }) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Button sx={sx} aria-describedby={id} variant="contained" onClick={handleClick} endIcon={icon}>
        {label}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        {children}
      </Popover>
    </div>
  );
}