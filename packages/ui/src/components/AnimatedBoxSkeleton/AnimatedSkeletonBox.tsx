import { Box } from "@mui/material";
import { keyframes, styled } from "@mui/system";

const shineAnimation = keyframes`100% { transform: translateX(100%); }`;

interface StyledProps {
  light?: boolean;
}

export const AnimatedBoxSkeleton = styled(Box)<StyledProps>(({ light }) => ({
  width: "100%",
  position: "relative",
  overflow: "hidden",
  zIndex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: light ? "lightcyan" : "lightgray",

  "&::after": {
    content: '""',
    display: "block",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: "100%",
    backgroundRepeat: "no-repeat",
    backgroundImage: `
        linear-gradient(to right, transparent 10%, ${
          light ? "white" : "lightcyan"
        }, transparent)
        `,
    transform: "translateX(-100%)",
    animationName: `${shineAnimation}`,
    animationDirection: "normal",
    animationDuration: "1s",
    animationTimingFunction: "ease-in-out",
    animationIterationCount: "infinite",
  },
}));
