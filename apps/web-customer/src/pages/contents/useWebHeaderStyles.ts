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
        color: !isScrolled ? 'white' : 'black',
        fontFamily: 'PT Sans, sans-serif',
        textTransform: 'none',
        fontSize: '16px'
    };

    const loginButtonSx = {
        bgcolor: isScrolled ? '#0f2a71' : '#f3c402',
        color: isScrolled ? 'white' : 'black',
        textTransform: 'none',
        borderRadius: '15px',
        width: 100,
        paddingTop: 1,
        '&:hover': {
            backgroundColor: isScrolled ? '#071c51' : '#cca406',
        },
    };

    return { drawerHeader, headerLinkSx, loginButtonSx };
};

export default useWebHeaderStyles