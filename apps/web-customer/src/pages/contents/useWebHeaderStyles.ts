import { SxProps, Theme } from "@mui/material/styles";
import { useScroll } from "core-library";
import { useRouter } from "next/router";

export const useWebHeaderStyles = () => {
  const { isScrolled } = useScroll();

  const router = useRouter();

  const isScrolledOrRoute = router.pathname === "/404" ? true : isScrolled;

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
  };

  return { drawerHeader, headerLinkSx, loginButtonSx };
};

export default useWebHeaderStyles;
