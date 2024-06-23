import React, { useEffect, useState } from "react";
import { useResolution } from '../../hooks';
import { Header } from '../GenericHeader/Header';
import { NavigationType, Sidebar } from '../GenericSidebar/Sidebar';

import { Box, Button, styled } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { mockmenus } from './MockMenus';



type DrawerLayoutType = {
    isAuthenticated: boolean
    menu: NavigationType[]
}

const Main = styled('main', {
    shouldForwardProp: (prop) => {
        return !['isMobile', 'open'].includes(prop as string)
    }
})<{
    open?: boolean;
    isMobile?: boolean;
}>(({ theme, open, isMobile }) => ({
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-240px`,
    ...(isMobile && {
        marginLeft: 0,
    }),
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}));

export const DrawerLayout: React.FC<React.PropsWithChildren<DrawerLayoutType>> = ({ menu, children, isAuthenticated }) => {
    const [open, setOpen] = useState(true)
    const { isMobile } = useResolution()
    const mockmenu = mockmenus(isAuthenticated)


    const handleDrawer = () => {
        setOpen(prev => !prev)
    }

    useEffect(() => {
        setOpen(!isMobile)
    }, [isMobile])

    return (
        <Box display="flex">
            {(isAuthenticated || isMobile) &&
                <Sidebar
                    isMobile={isMobile}
                    menu={mockmenu}
                    open={open}
                    setOpen={handleDrawer}
                />
            }
            <Main open={open} isMobile={isMobile}>
                <Box
                    display="flex"
                    minHeight="100vh"
                    flexDirection="column">
                    <Box>
                        <Header
                            drawerButton={(!open && isAuthenticated || isMobile) && <Button onClick={handleDrawer}><MenuIcon /></Button>}
                            onLogout={() => { }}
                            menu={mockmenu}
                            isAuthenticated={isAuthenticated} />
                    </Box>
                    {children}
                </Box>
            </Main>
        </Box>
    );
};
