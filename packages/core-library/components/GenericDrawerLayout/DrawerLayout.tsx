import React, { useEffect, useState } from "react";
import { Box, Button, styled } from '@mui/material';
import { Header } from '../GenericHeader/Header';
import { NavigationType } from '../../types/navigation';
import { Sidebar } from '@repo/core-library/components';
import { mockMenus } from './MockMenus';
import { useResolution } from '../../hooks';
import { Main } from './content/Main';
import MenuIcon from '@mui/icons-material/Menu';


type DrawerLayoutType = {
    isAuthenticated: boolean
    menu: NavigationType[]
}

export const DrawerLayout: React.FC<React.PropsWithChildren<DrawerLayoutType>> = ({ menu, children, isAuthenticated }) => {
    const [open, setOpen] = useState(true)
    const { isMobile } = useResolution()
    const mockmenu = mockMenus(isAuthenticated)


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
