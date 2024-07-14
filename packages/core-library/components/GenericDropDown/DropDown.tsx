import { Button, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import { useState } from 'react';
import {
    AccountCircle as AccountCircleIcon,
} from "@mui/icons-material";
import { NavigationType } from '../../types/navigation';

interface Props {
    list: NavigationType[]
}

export const DropDown: React.FC<Props> = ({ list }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    return (
        <Box >
            <Button sx={{ gap: 2 }} aria-describedby={id} type="button" onClick={handleClick} variant="outlined"><AccountCircleIcon color="primary" fontSize="small" /> User </Button>
            <Popper sx={{ zIndex: 1500, width: '150px', textAlign: 'center' }} id={id} open={open} anchorEl={anchorEl}>
                <Box sx={{ boxShadow: 1, bgcolor: 'background.paper', zIndex: '1500', borderRadius: '5px', marginTop: 1 }}>
                    {list.length > 0 && list.map((item, index) => (
                        <Button fullWidth sx={{ display: 'flex', justifyContent: 'space-between' }} key={index}>
                            {item.icon} <Typography variant='button'> {item.label}</Typography>
                        </Button>
                    ))}
                </Box>
            </Popper >
        </Box >
    );
}