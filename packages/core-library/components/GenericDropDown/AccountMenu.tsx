import { Button, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import { Logout as LogoutIcon } from "@mui/icons-material";
import { NavigationType } from '../../types/navigation';
import { useState } from 'react';

interface Props {
    label: string
    icon?: React.ReactNode
    accountItem: NavigationType[]
    anchorEl?: HTMLElement | null
    onClick?: (event: React.MouseEvent<HTMLElement>) => void
    onLogout?: () => void
}

export const AccountMenu: React.FC<Props> = ({ icon, label, accountItem, anchorEl, onClick, onLogout }) => {
    const openMenu = Boolean(anchorEl);
    const id = openMenu ? 'simple-popper' : undefined;
    const [expandedIndex, setExpandedIndex] = useState<null | number>(null);

    const handleParentClick = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <Box >
            <Button sx={{ gap: 2 }} aria-describedby={id} type="button" onClick={onClick} variant="outlined">
                {icon}
                {label}
            </Button>
            <Popper sx={{ zIndex: 1500, width: '150px', textAlign: 'center' }} id={id} open={openMenu} anchorEl={anchorEl}>
                <Box sx={{ boxShadow: 1, bgcolor: 'background.paper', zIndex: '1500', borderRadius: '5px', marginTop: 1 }}>
                    {accountItem.length > 0 && accountItem.map((item, index) => (
                        <div key={index}>
                            <Button
                                fullWidth
                                sx={{ display: 'flex', justifyContent: 'space-between' }}
                                onClick={() => handleParentClick(index)}
                            >
                                {item.icon} <Typography variant='button'> {item.label}</Typography>
                            </Button>
                            {expandedIndex === index && item.subItem && item.subItem.length > 0 && item.subItem.map((subMenu, subIndex) => (
                                <Button
                                    key={subIndex}
                                    fullWidth
                                    sx={{ display: 'flex', justifyContent: 'space-between', paddingLeft: 4 }}
                                >
                                    {subMenu.icon} <Typography variant='button'> {subMenu.label}</Typography>
                                </Button>
                            ))}
                        </div>
                    ))}
                    {onLogout &&
                        <Button
                            onClick={onLogout}
                            fullWidth sx={{ display: 'flex', justifyContent: 'space-between' }} >
                            <LogoutIcon fontSize="small" /> <Typography variant='button'> Logout</Typography>
                        </Button>
                    }
                </Box>
            </Popper >
        </Box >
    );
}