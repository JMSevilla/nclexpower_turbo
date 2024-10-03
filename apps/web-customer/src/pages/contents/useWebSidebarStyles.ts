import { SxProps, Theme } from "@mui/material/styles";
import { useScroll } from "core-library";
import { useRouter } from "next/router";

export const useSidebarStyles = (open: boolean) => {
    // const { isScrolled } = useScroll();
    // const router = useRouter();
    // const isScrolledOrRoute = router.pathname === "/404" || isScrolled;

    const sidebarSx: SxProps<Theme> = {
        backgroundImage: "linear-gradient(90deg, #0F2A71 0%, #181E2F 100%)",
        margin: "10px",
        color: "white",
        borderRadius: "8px"

    };

    const arrowSx: SxProps<Theme> = {
        opacity: 1,
        transform: open ? "rotate(-180deg)" : "rotate(-90deg)",
        transition: "0.2s",
    };

    const dividerSx: SxProps<Theme> = {
        borderBottomWidth: "none",
        borderColor: "none",
    };

    const listItemIconSx: SxProps<Theme> = {
        minWidth: "30px !important",
        display: "flex",
        justifyContent: "center",
    };

    const paddingSx: SxProps<Theme> = {
        padding: "0 !important",
    }

    const activeSx: SxProps<Theme> = {
        color: "#F4C501",
        fontWeight: 'bold',
    };

    const hoverSx: SxProps<Theme> = {
        '&:hover': {
            color: "#F4C501 !important",
        },
    };

    const opacitySx: SxProps<Theme> = {
        opacity: "1 !important",
    };

    return { sidebarSx, arrowSx, dividerSx, listItemIconSx, paddingSx, activeSx, hoverSx, opacitySx };
};

export default useSidebarStyles;
