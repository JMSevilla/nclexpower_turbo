import { SxProps, Theme } from "@mui/material/styles";
import { useScroll } from "core-library";
import { useRouter } from "next/router";

export const useWebHeaderStyles = () => {
  const { isScrolled } = useScroll();
  const router = useRouter();
  const isScrolledOrRoute = router.pathname === "/404" || isScrolled;

  const drawerHeader: SxProps<Theme> = {
    position: "fixed",
    bgcolor: isScrolledOrRoute ? "white" : "rgba(0, 0, 0, 0.5)",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  };

  const headerLinkSx: SxProps<Theme> = {
    color: !isScrolledOrRoute ? "white" : "black",
    fontFamily: "PT Sans, sans-serif",
    textTransform: "none",
    fontSize: "16px",
    ":disabled": {
      color: !isScrolledOrRoute ? "white" : "black",
      textDecoration: 'underline'
    }
  };

  const loginButtonSx = {
    bgcolor: isScrolledOrRoute ? "#0f2a71" : "#f3c402",
    color: isScrolledOrRoute ? "white" : "black",
    textTransform: "none",
    borderRadius: "15px",
    width: 100,
    paddingTop: 1,
    "&:hover": {
      backgroundColor: isScrolledOrRoute ? "#071c51" : "#cca406",
    },
    ":disabled": {
      color: !isScrolledOrRoute ? "#071c51" : "#cca406",
      textDecoration: 'underline'
    }
  };

  const ToTopButtonSx = {
    position: 'fixed',
    zIndex: 10000,
    bottom: '50px',
    right: '50px',
    height: "40px",
    width: "40px",
    minWidth: "40px",
    bgcolor: "#f3c402",
    borderRadius: "50%",
    display: isScrolled ? 'flex' : 'none',
    alignItems: "center",
    justifyContent: "center",
    "&:hover": {
      bgcolor: "#f3c402",
    },
  };

  return { drawerHeader, headerLinkSx, loginButtonSx, ToTopButtonSx };
};

export default useWebHeaderStyles;
