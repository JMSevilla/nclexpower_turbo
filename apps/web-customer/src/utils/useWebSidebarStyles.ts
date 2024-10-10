// hooks/useWebSidebarStyles.ts
import { Opacity } from '@mui/icons-material';
import { SxProps, Theme } from '@mui/material/styles';
import { WebSidebarStylesType } from 'core-library/types/web-sidebar-styles';

export const useWebSidebarStyles = (): WebSidebarStylesType => {
    const listStyles: WebSidebarStylesType['listStyles'] = {
        sidebarSx: {
            backgroundImage: "linear-gradient(90deg, #0F2A71 0%, #181E2F 100%)",
            margin: "10px",
            color: "white",
            borderRadius: "8px",
        },

        arrowSx: {
            opacity: 1,
        },

        dividerSx: {
            borderBottomWidth: "none !important",
            borderColor: "none !important",
        },

        listItemIconSx: {
            minWidth: "30px",
            display: "flex",
            justifyContent: "center",

        },

        paddingSx: {
            padding: "0 !important",
        },

        activeSx: {
            color: "#F4C501 !important",
            fontWeight: 'bold !important',
            opacity: "1 !important",
            '.MuiSvgIcon-root': {
                color: '#F4C501 !important',
            },
        },

        hovericonSx: {
            '&:hover': {
                color: "#F4C501 !important",
            },

            '&:hover .MuiSvgIcon-root': {
                color: '#F4C501 !important',
            },
        },

        opacitySx: {
            opacity: "1 !important",
        }
    };

    return { listStyles };
};
