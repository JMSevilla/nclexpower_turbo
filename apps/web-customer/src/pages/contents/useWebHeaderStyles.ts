import { SxProps, Theme } from '@mui/material/styles';
import { useScroll } from 'core-library';

export const useWebHeaderStyles = () => {
    const { isScrolled } = useScroll();

    const drawerHeader: SxProps<Theme> = {
        position: 'fixed',
        bgcolor: isScrolled ? 'white' : 'rgba(0, 0, 0, 0.5)',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    };

    const headerLinkSx: SxProps<Theme> = {
        color: !isScrolled ? 'white' : 'default',
        fontFamily: 'Poppins, sans-serif',
    };

    return { drawerHeader, headerLinkSx };
};

export default useWebHeaderStyles